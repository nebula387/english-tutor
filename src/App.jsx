import { useState } from 'react'
import TopicSelect from './screens/TopicSelect'
import Lesson from './screens/Lesson'
import Summary from './screens/Summary'
import Progress from './screens/Progress'
import PlanSelect from './screens/PlanSelect'
import { saveSession } from './services/progressService'
import { completeLesson } from './services/curriculumService'

export default function App() {
  const [screen, setScreen] = useState('topic')
  const [topic, setTopic] = useState(null)
  const [sessionData, setSessionData] = useState(null)
  const [curriculumLesson, setCurriculumLesson] = useState(null)

  const handleTopicSelect = (selected) => {
    setTopic(selected)
    setCurriculumLesson(null)
    setScreen('lesson')
  }

  const handlePlanLessonSelect = (lesson) => {
    setCurriculumLesson(lesson)
    setTopic({ id: lesson.id, label: lesson.title, emoji: lesson.unitEmoji })
    setScreen('lesson')
  }

  const handleLessonEnd = (data) => {
    if (curriculumLesson) {
      completeLesson(curriculumLesson.id)
    }
    saveSession(data)
    setSessionData(data)
    setScreen('summary')
  }

  const handleRestart = () => {
    setTopic(null)
    setSessionData(null)
    setCurriculumLesson(null)
    setScreen('topic')
  }

  return (
    <div className="app">
      {screen === 'topic' && (
        <TopicSelect
          onSelect={handleTopicSelect}
          onProgress={() => setScreen('progress')}
          onPlan={() => setScreen('plan')}
        />
      )}
      {screen === 'plan' && (
        <PlanSelect
          onBack={() => setScreen('topic')}
          onStartLesson={handlePlanLessonSelect}
        />
      )}
      {screen === 'lesson' && (
        <Lesson
          topic={topic}
          curriculumLesson={curriculumLesson}
          onEnd={handleLessonEnd}
          onBack={() => { setTopic(null); setCurriculumLesson(null); setScreen(curriculumLesson ? 'plan' : 'topic') }}
        />
      )}
      {screen === 'summary' && (
        <Summary
          data={sessionData}
          onRestart={handleRestart}
          onProgress={() => setScreen('progress')}
        />
      )}
      {screen === 'progress' && (
        <Progress onBack={() => setScreen(sessionData ? 'summary' : 'topic')} />
      )}
    </div>
  )
}
