import { useState } from 'react'
import TopicSelect from './screens/TopicSelect'
import Lesson from './screens/Lesson'
import Summary from './screens/Summary'

export default function App() {
  const [screen, setScreen] = useState('topic')
  const [topic, setTopic] = useState(null)
  const [sessionData, setSessionData] = useState(null)

  const handleTopicSelect = (selectedTopic) => {
    setTopic(selectedTopic)
    setScreen('lesson')
  }

  const handleLessonEnd = (data) => {
    setSessionData(data)
    setScreen('summary')
  }

  const handleRestart = () => {
    setTopic(null)
    setSessionData(null)
    setScreen('topic')
  }

  return (
    <div className="app">
      {screen === 'topic' && (
        <TopicSelect onSelect={handleTopicSelect} />
      )}
      {screen === 'lesson' && (
        <Lesson
          topic={topic}
          onEnd={handleLessonEnd}
          onBack={() => { setTopic(null); setScreen('topic') }}
        />
      )}
      {screen === 'summary' && (
        <Summary data={sessionData} onRestart={handleRestart} />
      )}
    </div>
  )
}
