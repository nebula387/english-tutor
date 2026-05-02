import '../styles/TopicSelect.css'

const TOPICS = [
  {
    id: 'tourism',
    label: 'Tourism & Hobbies',
    emoji: '✈️',
    description: 'Travel, sightseeing, free time activities',
    color: '#4CAF50',
  },
  {
    id: 'programming',
    label: 'Programming & AI',
    emoji: '💻',
    description: 'Software development, machine learning, tech',
    color: '#2196F3',
  },
]

export default function TopicSelect({ onSelect }) {
  return (
    <div className="topic-select">
      <div className="topic-header">
        <div className="topic-logo">🗣️</div>
        <h1>English Tutor</h1>
        <p className="topic-subtitle">Choose a topic to practice</p>
      </div>

      <div className="topic-cards">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            className="topic-card"
            style={{ '--card-color': topic.color }}
            onClick={() => onSelect(topic)}
          >
            <span className="topic-emoji">{topic.emoji}</span>
            <span className="topic-name">{topic.label}</span>
            <span className="topic-desc">{topic.description}</span>
          </button>
        ))}
      </div>

      <p className="topic-hint">
        You'll learn vocabulary, then have a conversation in English.
        <br />
        Errors are corrected gently at the end only.
      </p>
    </div>
  )
}
