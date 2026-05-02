import { useState, useEffect, useRef, useCallback } from 'react'
import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'
import { fetchVocabulary, startLesson, sendMessage, requestSummary, transcribeAudio } from '../services/groqService'
import { speak, stopSpeaking, startRecording, startWebRecognition, requestMicPermission } from '../services/speechService'
import VocabBlock from '../components/VocabBlock'
import ChatMessage from '../components/ChatMessage'
import VoiceButton from '../components/VoiceButton'
import '../styles/Lesson.css'

const STOP_PHRASES = ['stop', 'finish', 'end lesson', 'end', "that's all"]
const isSessionEnd = (t) => t.includes('🎉') || t.toLowerCase().includes('great session')
const isNative = Capacitor.isNativePlatform()
const GRACE_MS = 2000

export default function Lesson({ topic, onEnd, onBack }) {
  const [phase, setPhase] = useState('vocab')
  const [vocabText, setVocabText] = useState('')
  const [vocabLoading, setVocabLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [history, setHistory] = useState([])
  const [recording, setRecording] = useState(false)
  const [grace, setGrace] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const [interimText, setInterimText] = useState('')
  const [aiThinking, setAiThinking] = useState(false)
  const [aiSpeaking, setAiSpeaking] = useState(false)
  const [micGranted, setMicGranted] = useState(true)
  const [lastAiText, setLastAiText] = useState('')
  const [error, setError] = useState(null)

  const chatEndRef    = useRef(null)
  const recControlRef = useRef(null)
  const graceTimerRef = useRef(null)

  // Refs mirror the flags that event-handler closures need to read synchronously.
  // React state updates are batched/async, so closures can see stale values;
  // refs are always current because they're mutated in-place.
  const recordingRef    = useRef(false)
  const graceRef        = useRef(false)
  const transcribingRef = useRef(false)
  const aiThinkingRef   = useRef(false)

  useEffect(() => { recordingRef.current    = recording    }, [recording])
  useEffect(() => { graceRef.current        = grace        }, [grace])
  useEffect(() => { transcribingRef.current = transcribing }, [transcribing])
  useEffect(() => { aiThinkingRef.current   = aiThinking   }, [aiThinking])

  useEffect(() => {
    fetchVocabulary(topic.label)
      .then(t => { setVocabText(t); setVocabLoading(false) })
      .catch(() => { setError('Failed to load vocabulary.'); setVocabLoading(false) })
  }, [topic])

  useEffect(() => {
    // Request permission on mount; don't block the button on failure —
    // startRecording() will surface any real error when the user presses.
    requestMicPermission().then(ok => setMicGranted(ok))
  }, [])

  useEffect(() => {
    if (!isNative) return
    const sub = App.addListener('backButton', () => {
      clearGraceTimer()
      recControlRef.current?.stop().catch(() => {})
      void stopSpeaking()
      onBack()
    })
    return () => { sub.then(s => s.remove()) }
  }, [onBack])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, interimText, aiThinking, transcribing])

  useEffect(() => {
    return () => {
      clearGraceTimer()
      recControlRef.current?.stop().catch(() => {})
      void stopSpeaking()
    }
  }, [])

  function clearGraceTimer() {
    if (graceTimerRef.current) {
      clearTimeout(graceTimerRef.current)
      graceTimerRef.current = null
    }
  }

  const addMessage = useCallback((role, content) => {
    setMessages(p => [...p, { role, content, id: Date.now() + Math.random() }])
    setHistory(p => [...p, { role, content }])
  }, [])

  const speakAndUnlock = useCallback((text) => {
    setLastAiText(text)
    setAiSpeaking(true)
    speak(text, () => setAiSpeaking(false))
  }, [])

  const handleRepeat = useCallback(() => {
    if (!lastAiText || aiSpeaking || aiThinking || recording || grace || transcribing) return
    setAiSpeaking(true)
    speak(lastAiText, () => setAiSpeaking(false))
  }, [lastAiText, aiSpeaking, aiThinking, recording, grace, transcribing])

  const handleAiReply = useCallback(async (userText) => {
    const isStop = STOP_PHRASES.some(p => userText.toLowerCase().trim().includes(p))
    setAiThinking(true)
    aiThinkingRef.current = true
    try {
      const reply = isStop
        ? await requestSummary(history, topic.label)
        : await sendMessage(history, userText, topic.label)
      addMessage('assistant', reply)
      speakAndUnlock(reply)
      if (isStop || isSessionEnd(reply)) {
        setTimeout(() => onEnd({ topic, history, summary: reply }), 600)
      }
    } catch {
      setError('Network error. Try again.')
    } finally {
      setAiThinking(false)
      aiThinkingRef.current = false
    }
  }, [history, topic, addMessage, speakAndUnlock, onEnd])

  // Finalise the recording: stop VoiceRecorder → Whisper → AI reply.
  // Stored in a ref so the grace-period timeout always calls the latest version.
  const stopAndTranscribe = useCallback(async () => {
    clearGraceTimer()
    graceRef.current = false
    recordingRef.current = false
    setGrace(false)
    setRecording(false)

    if (isNative) {
      transcribingRef.current = true
      setTranscribing(true)
      try {
        const audio = await recControlRef.current?.stop()
        recControlRef.current = null
        if (audio?.base64) {
          const text = await transcribeAudio(audio.base64, audio.mimeType)
          if (text) { addMessage('user', text); handleAiReply(text) }
        }
      } catch {
        setError('Could not transcribe. Try again.')
      } finally {
        transcribingRef.current = false
        setTranscribing(false)
      }
    } else {
      // Web Speech API: stop() flushes buffered audio and fires onFinal.
      recControlRef.current?.stop()
      recControlRef.current = null
      setInterimText('')
    }
  }, [addMessage, handleAiReply])

  const stopAndTranscribeRef = useRef(stopAndTranscribe)
  useEffect(() => { stopAndTranscribeRef.current = stopAndTranscribe }, [stopAndTranscribe])

  // ── PRESS START (hold mic down) ───────────────────────────────────────────
  const handlePressStart = useCallback(async () => {
    // Block only during active API/transcription calls.
    if (aiThinkingRef.current || transcribingRef.current) return
    // Ignore repeated down events (already recording or in grace).
    if (recordingRef.current || graceRef.current) return

    // Interrupt AI speech so user can speak immediately.
    void stopSpeaking()
    setAiSpeaking(false)
    clearGraceTimer()

    // Set ref synchronously BEFORE the async startRecording() call so that
    // handlePressEnd — which may fire before the await returns — sees true.
    recordingRef.current = true
    setRecording(true)
    graceRef.current = false
    setGrace(false)
    setInterimText('')

    if (isNative) {
      try {
        recControlRef.current = await startRecording()
      } catch {
        setError('Could not start recording. Check microphone permission.')
        recordingRef.current = false
        setRecording(false)
      }
    } else {
      recControlRef.current = startWebRecognition({
        onInterim: (t) => setInterimText(t),
        onFinal: (t) => {
          clearGraceTimer()
          graceRef.current = false
          recordingRef.current = false
          setInterimText('')
          setRecording(false)
          setGrace(false)
          recControlRef.current = null
          if (t) { addMessage('user', t); handleAiReply(t) }
        },
        onError: () => {
          clearGraceTimer()
          graceRef.current = false
          recordingRef.current = false
          setRecording(false)
          setGrace(false)
          setInterimText('')
          recControlRef.current = null
        },
      })
    }
  }, [addMessage, handleAiReply])

  // ── PRESS END (release mic) ───────────────────────────────────────────────
  const handlePressEnd = useCallback(() => {
    // Read ref, not state — state may be the previous render's value here.
    if (!recordingRef.current) return

    recordingRef.current = false
    graceRef.current = true
    setRecording(false)
    setGrace(true)

    // After GRACE_MS the latest stopAndTranscribe is called via ref.
    graceTimerRef.current = setTimeout(() => {
      stopAndTranscribeRef.current()
    }, GRACE_MS)
  }, [])

  const handleFinish = useCallback(async () => {
    clearGraceTimer()
    recControlRef.current?.stop().catch(() => {})
    void stopSpeaking()
    recordingRef.current = false
    graceRef.current = false
    setAiSpeaking(false)
    setRecording(false)
    setGrace(false)
    setTranscribing(false)
    setAiThinking(true)
    aiThinkingRef.current = true
    try {
      const summary = await requestSummary(history, topic.label)
      addMessage('assistant', summary)
      setTimeout(() => onEnd({ topic, history, summary }), 400)
    } catch {
      setError('Failed to get summary.')
      setAiThinking(false)
      aiThinkingRef.current = false
    }
  }, [history, topic, addMessage, onEnd])

  const startChat = useCallback(async () => {
    setPhase('chat')
    setAiThinking(true)
    aiThinkingRef.current = true
    try {
      const firstQ = await startLesson(topic.label)
      setMessages([{ role: 'assistant', content: firstQ, id: Date.now() }])
      setHistory([{ role: 'assistant', content: firstQ }])
      speakAndUnlock(firstQ)
    } catch {
      setError('Failed to start lesson.')
    } finally {
      setAiThinking(false)
      aiThinkingRef.current = false
    }
  }, [topic, speakAndUnlock])

  // ── Vocab phase ───────────────────────────────────────────────────────────
  if (phase === 'vocab') {
    return (
      <div className="lesson-vocab-screen">
        <div className="lesson-top-bar">
          <button className="back-btn" onClick={onBack}>←</button>
          <span className="topic-badge">{topic.emoji} {topic.label}</span>
        </div>
        <VocabBlock loading={vocabLoading} text={vocabText} error={error} onStart={startChat} />
      </div>
    )
  }

  // ── Chat phase ────────────────────────────────────────────────────────────
  // Disabled only while API call is running or audio is being transcribed.
  // aiSpeaking is intentionally excluded: pressing mic interrupts AI.
  const micDisabled = aiThinking || transcribing

  let statusMode = 'ready'
  if (transcribing)    statusMode = 'transcribing'
  else if (recording)  statusMode = 'recording'
  else if (grace)      statusMode = 'grace'
  else if (aiSpeaking) statusMode = 'speaking'
  else if (aiThinking) statusMode = 'thinking'

  const statusLabel = {
    ready:        'Hold mic to speak',
    recording:    'Recording… release when done',
    grace:        'Finishing…',
    transcribing: 'Processing speech…',
    speaking:     'AI speaking — hold mic to interrupt',
    thinking:     'Thinking…',
  }[statusMode]

  return (
    <div className="lesson-chat-screen">
      <div className="lesson-top-bar">
        <span className="topic-badge">{topic.emoji} {topic.label}</span>
        <button className="end-btn" onClick={handleFinish} disabled={aiThinking}>
          Finish
        </button>
      </div>

      <div className="chat-area">
        {messages.map(msg => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
        {interimText && (
          <div className="interim-bubble">
            <span className="interim-dot" />
            {interimText}
          </div>
        )}
        {transcribing && (
          <div className="thinking-bubble">
            <span className="dot" /><span className="dot" /><span className="dot" />
          </div>
        )}
        {aiThinking && (
          <div className="thinking-bubble">
            <span className="dot" /><span className="dot" /><span className="dot" />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {error && (
        <div className="error-bar" onClick={() => setError(null)}>
          {error} (tap to dismiss)
        </div>
      )}

      <div className="chat-footer">
        <div className={`status-bar status-bar--${statusMode}`}>
          <span className="status-dot" />
          <span className="status-label">{statusLabel}</span>
        </div>

        <div className="footer-controls">
          <button
            className="repeat-btn"
            onClick={handleRepeat}
            disabled={!lastAiText || aiSpeaking || aiThinking || recording || grace || transcribing}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-4"/>
            </svg>
            <span>Repeat</span>
          </button>

          <VoiceButton
            recording={recording}
            grace={grace}
            disabled={micDisabled}
            onPressStart={handlePressStart}
            onPressEnd={handlePressEnd}
          />

          <div className="footer-spacer" />
        </div>

        <p className="stop-hint">Hold to speak · Say "stop" or tap Finish to end</p>
      </div>
    </div>
  )
}
