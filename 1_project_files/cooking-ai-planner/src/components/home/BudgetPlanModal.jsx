import { useEffect } from 'react'

function useLockBodyScroll(open) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])
}

export default function BudgetPlanModal({ open, onClose }) {
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="本月省钱计划"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modalCard" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHead">
          <div>
            <div className="modalTitle">💰 本月省钱计划</div>
            <div className="muted" style={{ marginTop: 6 }}>
              按你的做饭频率，帮你估算这个月的预算压力。
            </div>
          </div>
          <button type="button" className="iconBtn" onClick={onClose} aria-label="关闭">
            ×
          </button>
        </div>

        <div className="budgetModal__section">
          <div className="sectionTitle">预算概览</div>
          <div className="budgetModal__grid" style={{ marginTop: 10 }}>
            <div className="budgetStat">
              <div className="budgetStat__k">本月预算</div>
              <div className="budgetStat__v">¥400</div>
            </div>
            <div className="budgetStat">
              <div className="budgetStat__k">当前已用</div>
              <div className="budgetStat__v">¥213</div>
            </div>
            <div className="budgetStat">
              <div className="budgetStat__k">预计剩余</div>
              <div className="budgetStat__v">¥187</div>
            </div>
            <div className="budgetStat">
              <div className="budgetStat__k">当前状态</div>
              <div className="budgetStat__v" style={{ fontSize: 13 }}>
                还算稳，可以继续自己做饭省钱 ✨
              </div>
            </div>
          </div>
        </div>

        <div className="budgetModal__section">
          <div className="sectionTitle">本周花费拆分</div>
          <ul className="noteList" style={{ marginTop: 10 }}>
            <li>
              <span className="noteDot">🥦</span> 食材采购：<b>¥128</b>
            </li>
            <li>
              <span className="noteDot">🧂</span> 调料补货：<b>¥35</b>
            </li>
            <li>
              <span className="noteDot">🍜</span> 临时外卖替代：<b>¥50</b>
            </li>
          </ul>
        </div>

        <div className="budgetModal__section">
          <div className="sectionTitle">省钱建议</div>
          <ul className="noteList" style={{ marginTop: 10 }}>
            <li>
              <span className="noteDot">✅</span> 本周优先消耗现有食材，减少重复购买
            </li>
            <li>
              <span className="noteDot">🔁</span> 调料类尽量复用，不必每道菜单独新增
            </li>
            <li>
              <span className="noteDot">🍱</span> 优先做“1 菜 + 主食”组合，比点外卖更稳
            </li>
            <li>
              <span className="noteDot">📅</span> 本周还能再做 <b>4–5</b> 顿基础餐
            </li>
          </ul>
        </div>

        <div className="budgetModal__section">
          <div className="sectionTitle">本周推荐省钱思路</div>
          <div className="notice subtle" style={{ marginTop: 10 }}>
            <div className="notice__desc">
              先做宿舍快手菜，再留一道稍复杂的菜周末练习，预算和成就感都会更平衡。
            </div>
          </div>
        </div>

        <div className="actionsRow" style={{ marginTop: 14 }}>
          <button type="button" className="ghostBtn" onClick={onClose}>
            关闭
          </button>
          <button type="button" className="ghostBtn isPrimary" onClick={onClose}>
            我知道了
          </button>
        </div>

        <div className="muted" style={{ marginTop: 10, textAlign: 'center' }}>
          按当前节奏，月底大概率还能省下 <b>¥60–80</b>。
        </div>
      </div>
    </div>
  )
}

