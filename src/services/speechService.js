import { Capacitor } from '@capacitor/core'
import { TextToSpeech } from '@capacitor-community/text-to-speech'

const isNative = Capacitor.isNativePlatform()

// ── TTS ──────────────────────────────────────────────────────────────────────

export async function speak(text, onEnd) {
  const clean = text.replace(/\*\*/g, '').replace(/✏️/g, '').replace(/[→—]/g, ',')

  if (isNative) {
    try {
      await TextToSpeech.stop()
      await TextToSpeech.speak({ text: clean, lang: 'en-US', rate: 0.82, pitch: 1.0, volume: 1.0, category: 'ambient' })
    } catch (e) {
      console.warn('TTS:', e)
    } finally {
      onEnd?.()
    }
    return
  }

  if (!window.speechSynthesis) { onEnd?.(); return }
  window.speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(clean)
  utt.lang = 'en-US'; utt.rate = 0.9
  if (onEnd) utt.onend = onEnd
  const trySpeak = () => {
    const v = window.speechSynthesis.getVoices()
    const voice = v.find(x => x.lang === 'en-US') || v[0]
    if (voice) utt.voice = voice
    window.speechSynthesis.speak(utt)
  }
  window.speechSynthesis.getVoices().length > 0
    ? trySpeak()
    : window.speechSynthesis.addEventListener('voiceschanged', trySpeak, { once: true })
}

export async function stopSpeaking() {
  if (isNative) { try { await TextToSpeech.stop() } catch {} }
  else window.speechSynthesis?.cancel()
}

// ── Mic permission ────────────────────────────────────────────────────────────
// Uses getUserMedia — triggers standard Android permission dialog.
// On success we immediately stop the test stream.

export async function requestMicPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach(t => t.stop())
    return true
  } catch {
    return false
  }
}

// ── Recording via MediaRecorder Web API ───────────────────────────────────────
// Works in both Capacitor WebView (androidScheme: https → secure origin)
// and desktop browser. No Capacitor plugin required.
// Returns { stop() → Promise<{ base64, mimeType }> }

export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

  const mimeType =
    ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4']
      .find(t => MediaRecorder.isTypeSupported(t)) || ''

  const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {})
  const chunks = []
  recorder.ondataavailable = (e) => { if (e.data?.size > 0) chunks.push(e.data) }
  recorder.start(200)  // flush every 200 ms so stop() has data immediately

  return {
    stop: () => new Promise((resolve, reject) => {
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(chunks, { type: recorder.mimeType || mimeType })
        const reader = new FileReader()
        reader.onloadend = () => {
          resolve({
            base64: reader.result?.split(',')[1] ?? '',
            mimeType: recorder.mimeType || mimeType || 'audio/webm',
          })
        }
        reader.onerror = reject
        reader.readAsDataURL(blob)
      }
      recorder.stop()
    }),
  }
}

// ── Web Speech Recognition (browser dev mode only) ───────────────────────────

export function startWebRecognition({ onInterim, onFinal, onError }) {
  const API = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!API) { onError?.('Not supported'); return { stop: () => {} } }

  const rec = new API()
  rec.lang = 'en-US'; rec.interimResults = true; rec.continuous = false

  rec.onresult = (e) => {
    let interim = '', final = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript
      if (e.results[i].isFinal) final += t
      else interim += t
    }
    if (interim) onInterim?.(interim)
    if (final) onFinal?.(final.trim())
  }
  rec.onerror = (e) => { if (e.error !== 'no-speech') onError?.(e.error) }
  rec.start()
  return { stop: () => { try { rec.stop() } catch {} } }
}
