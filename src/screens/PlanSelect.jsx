import { useMemo } from 'react'
import { CURRICULUM, getCurrentLesson, getCompletedLessons, getPlanStats } from '../services/curriculumService'
import '../styles/PlanSelect.css'

export default function PlanSelect({ onBack, onStartLesson }) {
  const stats = useMemo(() => getPlanStats(), [])
  const currentLesson = useMemo(() => getCurrentLesson(), [])
  const completed = useMemo(() => getCompletedLessons(), [])

  return (
    <div className="plan-screen">
      <div className="plan-top-bar">
        <button className="back-btn" onClick={onBack}>←</button>
        <span className="plan-screen-title">Learning Plan</span>
        <div style={{ width: 40 }} />
      </div>

      <div className="plan-scroll">

        <div className="plan-progress-header">
          <div className="plan-progress-label">
            <span className="plan-done-num">{stats.done}</span>
            <span className="plan-total-label"> / {stats.total} lessons complete</span>
          </div>
          <div className="plan-bar-track">
            <div className="plan-bar-fill" style={{ width: `${stats.percent}%` }} />
          </div>
          <span className="plan-percent">{stats.percent}%</span>
        </div>

        {currentLesson ? (
          <button className="plan-continue-card" onClick={() => onStartLesson(currentLesson)}>
            <div className="continue-tag">▶ Continue Learning</div>
            <div className="continue-unit-row">
              <span className="continue-unit-emoji">{currentLesson.unitEmoji}</span>
              <span className="continue-unit-name">{currentLesson.unitTitle}</span>
            </div>
            <div className="continue-lesson-title">{currentLesson.title}</div>
            <div className="continue-words">
              {currentLesson.newWords.map(w => w.word).join(' · ')}
            </div>
          </button>
        ) : (
          <div className="plan-complete-banner">
            🎉 You've completed the full curriculum!
          </div>
        )}

        {CURRICULUM.map(unit => {
          const doneCount = unit.lessons.filter(l => completed.has(l.id)).length
          return (
            <div key={unit.id} className="plan-unit">
              <div className="plan-unit-header">
                <span className="plan-unit-label">{unit.emoji} {unit.title}</span>
                <span className={`plan-unit-count ${doneCount === unit.lessons.length ? 'is-full' : ''}`}>
                  {doneCount}/{unit.lessons.length}
                </span>
              </div>
              <div className="plan-lesson-list">
                {unit.lessons.map((lesson, idx) => {
                  const isDone = completed.has(lesson.id)
                  const isCurrent = lesson.id === currentLesson?.id
                  const isLocked = !isDone && !isCurrent
                  const lessonWithUnit = { ...lesson, unitId: unit.id, unitTitle: unit.title, unitEmoji: unit.emoji }
                  return (
                    <button
                      key={lesson.id}
                      className={`plan-lesson-item ${isDone ? 'is-done' : ''} ${isCurrent ? 'is-current' : ''} ${isLocked ? 'is-locked' : ''}`}
                      onClick={() => !isLocked && onStartLesson(lessonWithUnit)}
                    >
                      <span className="pli-num">
                        {isDone ? '✓' : idx + 1}
                      </span>
                      <span className="pli-title">{lesson.title}</span>
                      <span className="pli-words">{lesson.newWords.length}w</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}
