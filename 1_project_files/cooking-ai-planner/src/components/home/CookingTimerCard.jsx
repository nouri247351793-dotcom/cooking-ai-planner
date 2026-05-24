import { useEffect, useState } from 'react'
import useCookingTimer, { DEFAULT_TIMER_SECONDS, formatTimerSeconds, parseTimerInput } from '../../hooks/useCookingTimer.js'

export default function CookingTimerCard() {
  const timer = useCookingTimer()
  const [draftTime, setDraftTime] = useState(formatTimerSeconds(timer.timerDuration || DEFAULT_TIMER_SECONDS))
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (editing) return
    setDraftTime(formatTimerSeconds(timer.timerRunning ? timer.timerRemaining : timer.timerRemaining || timer.timerDuration))
  }, [editing, timer.timerDuration, timer.timerRemaining, timer.timerRunning])

  const commitDraftTime = () => {
    const parsedSeconds = parseTimerInput(draftTime)
    const nextSeconds = parsedSeconds || DEFAULT_TIMER_SECONDS
    timer.setDuration(nextSeconds)
    setDraftTime(formatTimerSeconds(nextSeconds))
    setEditing(false)
  }

  const handlePrimaryClick = () => {
    if (timer.timerRunning) {
      timer.pause()
      return
    }

    if (timer.timerEnded) {
      timer.start(timer.timerDuration || DEFAULT_TIMER_SECONDS)
      return
    }

    const parsedSeconds = parseTimerInput(draftTime)
    timer.start(parsedSeconds || timer.timerRemaining || timer.timerDuration || DEFAULT_TIMER_SECONDS)
  }

  const stateClass = timer.timerRunning ? 'running' : timer.timerEnded ? 'ended' : editing ? 'editing' : 'idle'

  return (
    <section className={`timerCard timerCard--${stateClass}`} aria-label="计时器">
      <div className="timerCard__head">
        <div className="timerCard__titleWrap">
          <span className="timerCard__icon" aria-hidden="true">
            ⏱️
          </span>
          <div>
            <div className="timerCard__title">计时器</div>
            <div className="timerCard__status">{editing ? '编辑时间' : timer.stateText}</div>
          </div>
        </div>
      </div>

      <label className="timerCard__timeLabel">
        <span className="timerCard__timeHint">点击时间可修改，格式 MM:SS</span>
        <input
          className="timerCard__timeInput"
          value={timer.timerRunning ? timer.formattedRemaining : draftTime}
          inputMode="numeric"
          pattern="[0-9]{1,2}:?[0-9]{0,2}"
          aria-label="计时时间，格式 MM:SS"
          disabled={timer.timerRunning}
          onFocus={() => {
            if (!timer.timerRunning) setEditing(true)
          }}
          onChange={(event) => {
            setDraftTime(event.target.value)
            setEditing(true)
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
          {timer.timerRunning ? '暂停计时' : timer.timerEnded ? '再来一次' : '开始计时'}
        </button>
        <button type="button" className="timerCard__reset" onClick={timer.reset}>
          重置
        </button>
      </div>
    </section>
  )
}
