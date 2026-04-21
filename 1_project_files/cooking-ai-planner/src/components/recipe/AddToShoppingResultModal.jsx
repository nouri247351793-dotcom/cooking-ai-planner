import { Link } from 'react-router-dom'

export default function AddToShoppingResultModal({ open, recipeTitle, addedCount, onClose }) {
  if (!open) return null

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="已加入待购清单"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modalCard" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHead">
          <div>
            <div className="modalTitle">已加入待购清单</div>
            <div className="muted" style={{ marginTop: 6 }}>
              本次加入 <b>{addedCount}</b> 项 · {recipeTitle}
            </div>
          </div>
          <button type="button" className="iconBtn" onClick={onClose} aria-label="关闭">
            ✕
          </button>
        </div>

        <div className="actionsRow" style={{ marginTop: 12 }}>
          <Link to="/shopping" className="primaryBtn" onClick={onClose}>
            查看待购清单
          </Link>
          <button type="button" className="ghostBtn" onClick={onClose}>
            继续浏览菜谱
          </button>
        </div>
      </div>
    </div>
  )
}

