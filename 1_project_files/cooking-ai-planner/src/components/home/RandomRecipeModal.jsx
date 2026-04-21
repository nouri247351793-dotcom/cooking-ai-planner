import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

function createConfettiPieces(count) {
  const palette = ['#ff7c24', '#ffd89a', '#f3f3ec', '#cfe8d8', '#f6d2d8']
  const pieces = []

  for (let i = 0; i < count; i += 1) {
    const left = 8 + Math.random() * 84
    const width = 6 + Math.round(Math.random() * 6)
    const height = 10 + Math.round(Math.random() * 10)
    const dx = Math.round(-34 + Math.random() * 68)
    const rot = Math.round(120 + Math.random() * 520)
    const delay = Math.round(Math.random() * 120)
    const dur = Math.round(900 + Math.random() * 520)
    const round = Math.random() < 0.28
    const color = palette[Math.floor(Math.random() * palette.length)]

    pieces.push({
      id: `${Date.now()}_${i}_${Math.random().toString(16).slice(2)}`,
      left,
      width,
      height,
      dx,
      rot,
      delay,
      dur,
      round,
      color,
      opacity: 0.72 + Math.random() * 0.24,
    })
  }

  return pieces
}

function ConfettiBurst({ runKey }) {
  const reduceMotion = useMemo(() => {
    try {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return false
    }
  }, [])

  const pieces = useMemo(() => (reduceMotion ? [] : createConfettiPieces(16)), [reduceMotion, runKey])
  const [alive, setAlive] = useState(true)

  useEffect(() => {
    if (!pieces.length) return undefined
    setAlive(true)
    const t = window.setTimeout(() => setAlive(false), 1450)
    return () => window.clearTimeout(t)
  }, [pieces.length, runKey])

  if (!alive || !pieces.length) return null

  return (
    <div className="confettiLayer" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={p.round ? 'confettiPiece is-round' : 'confettiPiece'}
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            opacity: p.opacity,
            backgroundColor: p.color,
            animationDelay: `${p.delay}ms`,
            ['--dx']: `${p.dx}px`,
            ['--rot']: `${p.rot}deg`,
            ['--dur']: `${p.dur}ms`,
          }}
        />
      ))}
    </div>
  )
}

function RecipeCardPreview({ recipe }) {
  const tags = (recipe.tags || []).slice(0, 3)
  const core = (recipe.coreIngredients || []).slice(0, 4).join(' · ')

  return (
    <article className="recipeCard" aria-label={recipe.title}>
      <div className="recipeCard__link" style={{ cursor: 'default' }}>
        <img className="recipeCard__img" src={recipe.imageSrc} alt="" loading="lazy" />

        <div className="recipeCard__body">
          <div className="recipeCard__top">
            <div className="recipeCard__title">{recipe.title}</div>
            <div className="recipeCard__meta">
              {recipe.minutes} 分钟 · {recipe.difficulty}
            </div>
          </div>

          <div className="recipeCard__tags">
            {tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="recipeCard__core">
            核心食材：<span className="recipeCard__coreText">{core || '—'}</span>
          </div>

          {recipe.learning ? (
            <div className="recipeCard__learn">
              <div className="recipeCard__learnTitle">学习目标：{recipe.learning.goal}</div>
              <div className="recipeCard__learnPoints">
                {recipe.learning.focus && recipe.learning.focus.length
                  ? recipe.learning.focus.slice(0, 3).map((p) => (
                      <span key={p} className="pill">
                        {p}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function RandomRecipeModal({ open, recipe, onClose, onReroll }) {
  const navigate = useNavigate()
  useLockBodyScroll(open)
  const [burstKey, setBurstKey] = useState(0)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  useEffect(() => {
    if (!open) return
    setBurstKey((x) => x + 1)
  }, [open])

  if (!open || !recipe) return null

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="随机一道菜"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modalCard" onMouseDown={(e) => e.stopPropagation()}>
        <ConfettiBurst runKey={burstKey} />
        <div className="modalHead">
          <div>
            <div className="modalTitle">🎲 随机一道菜</div>
            <div className="muted" style={{ marginTop: 6 }}>
              手气不满意就再摇一次；满意就去详情页学习这道菜的关键动作。
            </div>
          </div>
          <button type="button" className="iconBtn" onClick={onClose} aria-label="关闭">
            ✕
          </button>
        </div>

        <RecipeCardPreview recipe={recipe} />

        <div className="actionsRow" style={{ marginTop: 12 }}>
          <button
            type="button"
            className="secondaryBtn"
            onClick={() => {
              setBurstKey((x) => x + 1)
              if (onReroll) onReroll()
            }}
          >
            再摇一次
          </button>
          <button
            type="button"
            className="primaryBtn"
            onClick={() => {
              onClose()
              navigate(`/recipes/${recipe.id}`, { state: { recipe, from: '/' } })
            }}
          >
            查看详情
          </button>
        </div>
      </div>
    </div>
  )
}
