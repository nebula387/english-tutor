import '../styles/Summary.css'

function renderSummary(text) {
  if (!text) return null
  return text.split('\n').map((line, i) => {
    if (line.includes('✏️') || line.includes('You said:') || line.includes('→')) {
      return <div key={i} className="correction-line">{line}</div>
    }
    if (line.trim() === '') return <br key={i} />
    return <p key={i}>{line}</p>
  })
}

export default function Summary({ data, onRestart }) {
  const { topic, history, summary } = data || {}
  const userTurns = (history || []).filter((m) => m.role === 'user').length

  return (
    <div className="summary-screen">
      <div className="summary-header">
        <div className="summary-icon">🎉</div>
        <h1>Lesson Complete!</h1>
        <p className="summary-topic">
          {topic?.emoji} {topic?.label}
        </p>
      </div>

      <div className="summary-stats">
        <div className="stat-card">
          <span className="stat-num">{userTurns}</span>
          <span className="stat-label">Replies</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{topic?.label?.split(' ')[0]}</span>
          <span className="stat-label">Topic</span>
        </div>
      </div>

      <div className="summary-body">
        <h2>Session Feedback</h2>
        <div className="summary-text">{renderSummary(summary)}</div>
      </div>

      <button className="restart-btn" onClick={onRestart}>
        New Lesson
      </button>
    </div>
  )
}
