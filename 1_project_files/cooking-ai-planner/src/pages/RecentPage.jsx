import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useRecent } from '../hooks/useRecent.js'
import { getRecipeById } from '../data/recipeCatalog.js'
import RecipeCard from '../components/home/RecipeCard.jsx'

function formatCookedDate(iso) {
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return d.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
  } catch {
    return ''
  }
}

export default function RecentPage() {
  const { recentCooked } = useRecent()

  const items = useMemo(
    () =>
      (recentCooked || [])
        .map((x) => ({ ...x, recipe: getRecipeById(x.recipeId) }))
        .filter((x) => x.recipe),
    [recentCooked],
  )

  if (!items.length) {
    return (
      <section className="page">
        <div className="emptyState">
          <div className="emptyState__title">🍽️ 最近做过</div>
          <div className="emptyState__hint">还没有记录</div>
          <div className="muted" style={{ marginTop: 10, textAlign: 'center' }}>
            做完菜后点「我做了」会出现在这里。
          </div>
          <div className="actionsRow" style={{ marginTop: 12 }}>
            <Link className="ghostBtn" to="/">
              去开始做饭
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="card">
        <div className="cardHeadRow" style={{ marginBottom: 10 }}>
          <div>
            <div className="card__title">🍽️ 最近做过</div>
            <div className="muted" style={{ marginTop: 6 }}>
              共 <b>{items.length}</b> 道（按最近记录排序）
            </div>
          </div>
          <Link className="ghostBtn" to="/">
            去开始做饭
          </Link>
        </div>

        <div className="weekGrid">
          {items.map((x) => (
            <RecipeCard
              key={x.recipeId}
              recipe={x.recipe}
              actionSlot={<span className="cornerPill">做过 · {formatCookedDate(x.cookedAt)}</span>}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
