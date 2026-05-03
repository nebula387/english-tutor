import { useMemo } from 'react'
import { getProgress, relativeDate } from '../services/progressService'
import { getCurrentLesson, getPlanStats } from '../services/curriculumService'
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

export default function TopicSelect({ onSelect, onProgress, onPlan }) {
  const stats = useMemo(() => getProgress(), [])
  const planStats = useMemo(() => getPlanStats(), [])
  const currentLesson = useMemo(() => getCurrentLesson(), [])

  return (
    <div className="topic-select">
      <div className="topic-header">
        <div className="topic-logo">🗣️</div>
        <h1>English Tutor</h1>
        <p className="topic-subtitle">Choose a topic to practice</p>
      </div>

      <button className="plan-entry-card" onClick={onPlan}>
        <div className="plan-entry-left">
          <span className="plan-entry-icon">📚</span>
          <div className="plan-entry-text">
            <span className="plan-entry-title">Learning Plan</span>
            <span className="plan-entry-sub">
              {currentLesson
                ? `Next: ${currentLesson.unitEmoji} ${currentLesson.title}`
                : `${planStats.done}/${planStats.total} complete`}
            </span>
          </div>
        </div>
        <div className="plan-entry-right">
          <div className="plan-entry-bar-track">
            <div className="plan-entry-bar-fill" style={{ width: `${planStats.percent}%` }} />
          </div>
          <span className="plan-entry-arrow">→</span>
        </div>
      </button>

      <div className="topic-section-label">Free Practice</div>

      <div className="topic-cards">
        {TOPICS.map((topic) => {
          const t = stats.byTopic[topic.id]
          return (
            <button
              key={topic.id}
              className="topic-card"
              style={{ '--card-color': topic.color }}
              onClick={() => onSelect(topic)}
            >
              <div className="topic-card-top">
                <span className="topic-emoji">{topic.emoji}</span>
                {t && (
                  <span className="topic-progress-badge">
                    {t.count} {t.count === 1 ? 'lesson' : 'lessons'}
                  </span>
                )}
                {!t && <span className="topic-progress-badge topic-badge--new">New</span>}
              </div>
              <span className="topic-name">{topic.label}</span>
              <span className="topic-desc">{topic.description}</span>
              {t?.lastDate && (
                <span className="topic-last-date">Last: {relativeDate(t.lastDate)}</span>
              )}
            </button>
          )
        })}
      </div>

      {stats.totalSessions > 0 && (
        <button className="progress-nav-btn" onClick={onProgress}>
          <span>📊</span>
          <span>
            {stats.totalSessions} {stats.totalSessions === 1 ? 'lesson' : 'lessons'} total
          </span>
          {stats.streak > 0 && <span className="streak-badge">{stats.streak} 🔥</span>}
        </button>
      )}

      <p className="topic-hint">
        You'll learn vocabulary, then have a conversation in English.
        <br />
        Errors are corrected gently at the end only.
      </p>
    </div>
  )
}
