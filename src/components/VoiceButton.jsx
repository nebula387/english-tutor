import '../styles/VoiceButton.css'

const MicIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="12" rx="3" fill="white" stroke="none"/>
    <path d="M5 10a7 7 0 0 0 14 0"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
  </svg>
)

export default function VoiceButton({ recording, grace, disabled, onPressStart, onPressEnd }) {
  const handleDown = (e) => {
    e.preventDefault()
    if (!disabled) onPressStart?.()
  }

  const handleUp = (e) => {
    e.preventDefault()
    if (!disabled) onPressEnd?.()
  }

  let cls = 'voice-btn'
  if (recording || grace) cls += ' voice-btn--recording'
  else if (disabled)      cls += ' voice-btn--disabled'
  else                    cls += ' voice-btn--idle'

  return (
    // No HTML disabled attribute — it suppresses pointer events in Android
    // WebView before they reach React. Disabled state is purely CSS + guards.
    <button
      className={cls}
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onPointerLeave={handleUp}
      onPointerCancel={handleUp}
      aria-label="Hold to speak"
      aria-disabled={disabled}
    >
      <MicIcon />
      {recording && !grace && (
        <>
          <span className="vring vring-1" />
          <span className="vring vring-2" />
        </>
      )}
      {grace && <span className="grace-ring" />}
    </button>
  )
}
