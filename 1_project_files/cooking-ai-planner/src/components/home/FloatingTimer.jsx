import useCookingTimer from '../../hooks/useCookingTimer.js'

export default function FloatingTimer() {
  const timer = useCookingTimer()

  if (!timer.timerVisible) return null

  if (timer.timerCollapsed) {
    return (
      <button
        type="button"
        className="floatingTimer floatingTimer--collapsed"
        onClick={() => timer.setCollapsed(false)}
        aria-label="展开悬浮计时器"
      >
        <span aria-hidden="true">⏱️</span>
        <strong>{timer.formattedRemaining}</strong>
      </button>
    )
  }

  return (
    <section className="floatingTimer" aria-label="全局悬浮计时器">
      <div className="floatingTimer__top">
        <div>
          <div className="floatingTimer__label">做饭计时</div>
          <div className="floatingTimer__time">{timer.formattedRemaining}</div>
        </div>
        <button type="button" className="floatingTimer__iconBtn" onClick={timer.toggleCollapsed} aria-label="收纳计时器">
          ‹
        </button>
      </div>

      <div className="floatingTimer__actions">
        <button type="button" onClick={timer.timerRunning ? timer.pause : () => timer.start()}>
          {timer.timerRunning ? '暂停' : '继续'}
        </button>
        <button type="button" onClick={timer.reset}>
          重置
        </button>
        <button type="button" onClick={timer.closeFloating}>
          关闭
        </button>
      </div>
    </section>
  )
}
