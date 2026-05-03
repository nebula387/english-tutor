import { useMemo } from 'react'
import { getProgress, relativeDate } from '../services/progressService'
import '../styles/Progress.css'

export default function Progress({ onBack }) {
  const stats = useMemo(() => getProgress(), [])

  const {
    totalSessions,
    totalReplies,
    byTopic,
    streak,
    recentSessions,
    recentCorrections,
  } = stats

  return (
    <div className="progress-screen">
      <div className="progress-top-bar">
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="progress-title">My Progress</span>
        <div style={{ width: 40 }} />
      </div>

      <div className="progress-scroll">

        {/* Overall stats */}
        <div className="prog-stat-row">
          <div className="prog-stat-card prog-stat--sessions">
            <span className="prog-stat-num">{totalSessions}</span>
            <span className="prog-stat-label">Lessons</span>
          </div>
          <div className="prog-stat-card prog-stat--streak">
            <span className="prog-stat-num">{streak} 🔥</span>
            <span className="prog-stat-label">Day streak</span>
          </div>
          <div className="prog-stat-card prog-stat--replies">
            <span className="prog-stat-num">{totalReplies}</span>
            <span className="prog-stat-label">Replies</span>
          </div>
        </div>

        {/* Per-topic */}
        {Object.keys(byTopic).length > 0 && (
          <div className="prog-section">
            <h2 className="prog-section-title">Topics</h2>
            <div className="prog-topic-list">
              {Object.entries(byTopic).map(([id, t]) => (
                <div key={id} className="prog-topic-row">
                  <span className="prog-topic-emoji">{t.emoji}</span>
                  <div className="prog-topic-info">
                    <span className="prog-topic-name">{t.label}</span>
                    <span className="prog-topic-meta">
                      {t.count} {t.count === 1 ? 'lesson' : 'lessons'}
                      {t.lastDate && ` · ${relativeDate(t.lastDate)}`}
                    </span>
                  </div>
                  <div className="prog-topic-dots">
                    {Array.from({ length: Math.min(t.count, 10) }).map((_, i) => (
                      <span key={i} className="prog-dot" />
                    ))}
                    {t.count > 10 && <span className="prog-dot-more">+{t.count - 10}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Corrections to review */}
        {recentCorrections.length > 0 && (
          <div className="prog-section">
            <h2 className="prog-section-title">Corrections to review</h2>
            <div className="prog-corrections">
              {recentCorrections.map((c, i) => (
                <div key={i} className="prog-correction-item">{c}</div>
              ))}
            </div>
          </div>
        )}

        {/* Session history */}
        {recentSessions.length > 0 && (
          <div className="prog-section">
            <h2 className="prog-section-title">History</h2>
            <div className="prog-history">
              {recentSessions.map(s => (
                <div key={s.id} className="prog-history-item">
                  <span className="prog-history-emoji">{s.topicEmoji}</span>
                  <div className="prog-history-info">
                    <span className="prog-history-topic">{s.topicLabel}</span>
                    <span className="prog-history-meta">
                      {relativeDate(s.date)} · {s.userTurns} replies
                      {s.corrections.length > 0 && ` · ${s.corrections.length} correction${s.corrections.length > 1 ? 's' : ''}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalSessions === 0 && (
          <div className="prog-empty">
            <div className="prog-empty-icon">📚</div>
            <p>Complete your first lesson to see progress here.</p>
          </div>
        )}

      </div>
    </div>
  )
}
