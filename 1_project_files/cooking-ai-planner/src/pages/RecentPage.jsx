import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useRecent } from '../hooks/useRecent.js'
import { getRecipeById } from '../data/recipeCatalog.js'
import RecipeCard from '../components/home/RecipeCard.jsx'

function formatCookedDate(iso) {
  try {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
  } catch {
    return ''
  }
}

export default function RecentPage() {
  const { recentCooked } = useRecent()
  const items = useMemo(
    () =>
      (recentCooked || [])
        .map((item) => ({ ...item, recipe: getRecipeById(item.recipeId) }))
        .filter((item) => item.recipe),
    [recentCooked],
  )

  return (
    <section className="page v3Page">
      <div className="v3PageHero">
        <div>
          <div className="v3PageHero__eyebrow">复盘记录</div>
          <h1 className="v3PageHero__title">最近做过</h1>
          <p className="v3PageHero__desc">做完菜后点击“我做了”，这里会保留最近记录，方便复盘和重复练习。</p>
        </div>
        <div className="v3PageHero__badge">{items.length} 道</div>
      </div>

      {!items.length ? (
        <div className="emptyState v3EmptyState">
          <div className="emptyState__title">🍽️ 最近还没有记录</div>
          <div className="emptyState__hint">完成一道菜后，在菜谱详情页点击“我做了”，它会出现在这里。</div>
          <div className="actionsRow" style={{ marginTop: 12 }}>
            <Link className="ghostBtn isPrimary" to="/">
              去开始做饭
            </Link>
          </div>
        </div>
      ) : (
        <div className="weekGrid v3RecipeGrid">
          {items.map((item) => (
            <RecipeCard
              key={item.recipeId}
              recipe={item.recipe}
              actionSlot={<span className="cornerPill">做过 · {formatCookedDate(item.cookedAt)}</span>}
            />
          ))}
        </div>
      )}
    </section>
  )
}
