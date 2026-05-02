import '../styles/ChatMessage.css'

function renderContent(text) {
  return text.split('\n').map((line, i) => {
    if (line.trim() === '') return null
    // Correction lines get special styling
    if (line.includes('✏️') || (line.includes('You said:') && line.includes('→'))) {
      return <div key={i} className="inline-correction">{line}</div>
    }
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    return (
      <p key={i}>
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : <span key={j}>{part}</span>
        )}
      </p>
    )
  })
}

export default function ChatMessage({ role, content }) {
  return (
    <div className={`message message--${role}`}>
      <div className="message-bubble">
        {renderContent(content)}
      </div>
    </div>
  )
}
