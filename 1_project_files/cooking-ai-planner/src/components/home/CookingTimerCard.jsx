import { useEffect, useMemo, useState } from 'react'

const DEFAULT_SECONDS = 10 * 60
const MAX_SECONDS = 99 * 60 + 59

function clampSeconds(seconds) {
  if (!Number.isFinite(seconds)) return DEFAULT_SECONDS
  return Math.min(Math.max(Math.floor(seconds), 0), MAX_SECONDS)
}

function formatSeconds(totalSeconds) {
  const safeSeconds = clampSeconds(totalSeconds)
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function parseTimeInput(value) {
  const cleanValue = String(value || '').trim()
  const match = cleanValue.match(/^(\d{1,2})(?::([0-5]?\d))?$/)
  if (!match) return null

  const minutes = Number(match[1])
  const seconds = match[2] === undefined ? 0 : Number(match[2])
  const totalSeconds = clampSeconds(minutes * 60 + seconds)
  return totalSeconds > 0 ? totalSeconds : null
}

export default function CookingTimerCard() {
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_SECONDS)
  const [draftTime, setDraftTime] = useState(formatSeconds(DEFAULT_SECONDS))
  const [timerState, setTimerState] = useState('idle')

  useEffect(() => {
    if (timerState !== 'running') return undefined

    const timerId = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(timerId)
          setTimerState('ended')
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [timerState])

  useEffect(() => {
    if (timerState === 'editing') return
    setDraftTime(formatSeconds(remainingSeconds))
  }, [remainingSeconds, timerState])

  const stateText = useMemo(() => {
    if (timerState === 'running') return '计时中'
    if (timerState === 'editing') return '编辑时间'
    if (timerState === 'ended') return '时间到'
    return '默认 10 分钟'
  }, [timerState])

  const commitDraftTime = () => {
    const parsedSeconds = parseTimeInput(draftTime)
    const nextSeconds = parsedSeconds || DEFAULT_SECONDS
    setRemainingSeconds(nextSeconds)
    setDraftTime(formatSeconds(nextSeconds))
    setTimerState('idle')
  }

  const handlePrimaryClick = () => {
    if (timerState === 'running') {
      setTimerState('idle')
      return
    }

    if (timerState === 'ended') {
      setRemainingSeconds(DEFAULT_SECONDS)
      setDraftTime(formatSeconds(DEFAULT_SECONDS))
      setTimerState('idle')
      return
    }

    const parsedSeconds = parseTimeInput(draftTime)
    const nextSeconds = parsedSeconds || remainingSeconds || DEFAULT_SECONDS
    setRemainingSeconds(nextSeconds)
    setDraftTime(formatSeconds(nextSeconds))
    setTimerState('running')
  }

  const handleReset = () => {
    setRemainingSeconds(DEFAULT_SECONDS)
    setDraftTime(formatSeconds(DEFAULT_SECONDS))
    setTimerState('idle')
  }

  return (
    <section className={`timerCard timerCard--${timerState}`} aria-label="计时器">
      <div className="timerCard__head">
        <div className="timerCard__titleWrap">
          <span className="timerCard__icon" aria-hidden="true">
            ⏱️
          </span>
          <div>
            <div className="timerCard__title">计时器</div>
            <div className="timerCard__status">{stateText}</div>
          </div>
        </div>
      </div>

      <label className="timerCard__timeLabel">
        <span className="timerCard__timeHint">点击时间可修改，格式 MM:SS</span>
        <input
          className="timerCard__timeInput"
          value={timerState === 'running' ? formatSeconds(remainingSeconds) : draftTime}
          inputMode="numeric"
          pattern="[0-9]{1,2}:?[0-9]{0,2}"
          aria-label="计时时间，格式 MM:SS"
          disabled={timerState === 'running'}
          onFocus={() => {
            if (timerState !== 'running') setTimerState('editing')
          }}
          onChange={(event) => {
            setDraftTime(event.target.value)
            setTimerState('editing')
          }}
          onBlur={commitDraftTime}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return
            event.currentTarget.blur()
          }}
        />
      </label>

      <div className="timerCard__actions">
        <button type="button" className="timerCard__primary" onClick={handlePrimaryClick}>
          {timerState === 'running' ? '暂停计时' : timerState === 'ended' ? '再来一次' : '开始计时'}
        </button>
        <button type="button" className="timerCard__reset" onClick={handleReset}>
          重置
        </button>
      </div>
    </section>
  )
}
