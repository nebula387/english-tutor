const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `You are a friendly English conversation teacher for a B1-B2 level student.

LESSON FORMAT — follow this every turn:
1. If the student made a MAJOR error (wrong tense, completely wrong word, bad word order):
   Add one correction line: ✏️ You said: "..." → Better: "..."
   Skip minor errors: missing articles, small prepositions, spelling.
2. Give a short warm reaction to what they said (1-2 sentences).
3. Ask your next question about the topic.

Keep the whole response under 5 sentences. Be encouraging and natural.

After 8-10 student replies, or when the student says "stop" / "finish" / "end":
Write "🎉 Great session!" then give:
- 2-3 sentences about what was discussed
- Up to 3 key corrections from the whole conversation (format: ✏️ "..." → "...")
- One encouraging closing sentence.`

const VOCAB_PROMPT = `You are an English tutor. Generate a vocabulary reference for the topic "{TOPIC}".
List exactly 6 useful words or phrases.
Format each line as: **word/phrase** — Russian translation — short example sentence in English.
No introduction, no closing sentence. Just the 6 lines.`

async function callGroq(messages, { temperature = 0.8, max_tokens = 500 } = {}) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: MODEL, messages, temperature, max_tokens }),
  })
  if (!response.ok) throw new Error(`Groq API error ${response.status}`)
  const data = await response.json()
  return data.choices[0].message.content
}

export function fetchVocabulary(topic) {
  const prompt = VOCAB_PROMPT.replace('{TOPIC}', topic)
  return callGroq([{ role: 'user', content: prompt }], { temperature: 0.6, max_tokens: 400 })
}

export function startLesson(topic) {
  return callGroq([
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nTopic: ${topic}` },
    { role: 'user', content: '[LESSON START] Ask your first warm-up question to begin.' },
  ], { temperature: 0.8, max_tokens: 200 })
}

export function sendMessage(history, userMessage, topic) {
  return callGroq([
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nTopic: ${topic}` },
    ...history,
    { role: 'user', content: userMessage },
  ], { temperature: 0.8, max_tokens: 350 })
}

export function requestSummary(history, topic) {
  return callGroq([
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nTopic: ${topic}` },
    ...history,
    {
      role: 'user',
      content: 'stop — give me the session summary now',
    },
  ], { temperature: 0.6, max_tokens: 500 })
}

function mimeToExt(mime) {
  if (!mime) return 'webm'
  if (mime.includes('webm')) return 'webm'
  if (mime.includes('ogg'))  return 'ogg'
  if (mime.includes('mp4') || mime.includes('m4a') || mime.includes('aac')) return 'm4a'
  if (mime.includes('wav'))  return 'wav'
  return 'webm'
}

export async function transcribeAudio(base64Audio, mimeType) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  const binary = atob(base64Audio)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  const blob = new Blob([bytes], { type: mimeType || 'audio/webm' })

  const formData = new FormData()
  formData.append('file', blob, `speech.${mimeToExt(mimeType)}`)
  formData.append('model', 'whisper-large-v3-turbo')
  formData.append('language', 'en')

  const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: formData,
  })
  if (!response.ok) throw new Error(`Whisper error ${response.status}`)
  const data = await response.json()
  return data.text?.trim() || ''
}
