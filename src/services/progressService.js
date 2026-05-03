const KEY = 'english_tutor_v1'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || { sessions: [] } }
  catch { return { sessions: [] } }
}

function persist(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

function extractCorrections(text) {
  if (!text) return []
  return text.split('\n')
    .filter(l => l.includes('✏️'))
    .map(l => l.trim())
    .filter(Boolean)
}

export function relativeDate(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const d = Math.floor(diff / 86400000)
  if (d === 0) return 'today'
  if (d === 1) return 'yesterday'
  if (d < 7)  return `${d}d ago`
  if (d < 30) return `${Math.floor(d / 7)}w ago`
  return `${Math.floor(d / 30)}mo ago`
}

export function saveSession({ topic, history, summary }) {
  const data = load()
  const entry = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    topicId: topic.id,
    topicLabel: topic.label,
    topicEmoji: topic.emoji,
    summary: summary || '',
    userTurns: (history || []).filter(m => m.role === 'user').length,
    corrections: extractCorrections(summary),
  }
  data.sessions = [entry, ...data.sessions].slice(0, 200)
  persist(data)
  return entry
}

export function getProgress() {
  const { sessions } = load()

  const byTopic = {}
  for (const s of sessions) {
    if (!byTopic[s.topicId]) {
      byTopic[s.topicId] = { count: 0, lastDate: null, label: s.topicLabel, emoji: s.topicEmoji }
    }
    byTopic[s.topicId].count++
    if (!byTopic[s.topicId].lastDate || s.date > byTopic[s.topicId].lastDate) {
      byTopic[s.topicId].lastDate = s.date
    }
  }

  // Count consecutive days ending today or yesterday
  const days = [...new Set(sessions.map(s => s.date.slice(0, 10)))].sort().reverse()
  let streak = 0
  let cursor = new Date(new Date().toISOString().slice(0, 10))
  for (const day of days) {
    const diff = Math.round((cursor.getTime() - new Date(day).getTime()) / 86400000)
    if (diff === 0) {
      streak++
      cursor = new Date(cursor.getTime() - 86400000)
    } else if (diff === 1 && streak === 0) {
      // Allow yesterday to start the streak if nothing today
      streak++
      cursor = new Date(new Date(day).getTime() - 86400000)
    } else {
      break
    }
  }

  return {
    totalSessions: sessions.length,
    totalReplies: sessions.reduce((acc, s) => acc + s.userTurns, 0),
    byTopic,
    streak,
    recentSessions: sessions.slice(0, 15),
    recentCorrections: sessions.flatMap(s => s.corrections).slice(0, 30),
  }
}

export function getLastSession(topicId) {
  return load().sessions.find(s => s.topicId === topicId) || null
}
