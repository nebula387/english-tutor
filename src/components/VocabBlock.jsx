import '../styles/VocabBlock.css'

function renderVocab(text) {
  return text.split('\n').map((line, i) => {
    if (line.trim() === '') return null
    // Bold word/phrase
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return (
      <div key={i} className="vocab-line">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>
          }
          return <span key={j}>{part}</span>
        })}
      </div>
    )
  })
}

export default function VocabBlock({ loading, text, error, onStart, subtitle }) {
  return (
    <div className="vocab-block">
      <h2 className="vocab-title">📚 Today's Vocabulary</h2>
      {subtitle && <p className="vocab-subtitle">{subtitle}</p>}

      {loading && (
        <div className="vocab-loading">
          <div className="spinner" />
          <p>Loading vocabulary…</p>
        </div>
      )}

      {error && !loading && (
        <div className="vocab-error">{error}</div>
      )}

      {!loading && !error && text && (
        <>
          <div className="vocab-content">{renderVocab(text)}</div>
          <button className="start-btn" onClick={onStart}>
            Start Conversation →
          </button>
        </>
      )}
    </div>
  )
}
