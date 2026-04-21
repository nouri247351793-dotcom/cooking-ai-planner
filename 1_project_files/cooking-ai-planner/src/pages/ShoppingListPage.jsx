import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useShoppingList } from '../hooks/useShoppingList.js'

export default function ShoppingListPage() {
  const { shoppingItems, groups } = useShoppingList()
  const groupsWithManual = useMemo(() => {
    const hasManual = groups.some((g) => g.key === 'manual')
    return hasManual
      ? groups
      : [
          ...groups,
          { key: 'manual', recipe: null, items: [], total: 0, done: 0, progress: 0 },
        ]
  }, [groups])
  const totalItems = shoppingItems.length

  return (
    <section className="page">
      <p className="page__desc">
        按“菜谱练习”分组管理待购：更像学习规划——选一菜谱 → 准备食材/调料/器具 → 执行复盘。
      </p>

      {totalItems === 0 ? (
        <div className="emptyState">
          <div className="emptyState__title">🧾 还没有待购清单</div>
          <div className="emptyState__hint">
            去任意菜谱详情页点“加入待购清单”，或创建一个手动清单。
          </div>
          <div className="actionsRow">
            <Link to="/" className="ghostBtn">
              去首页
            </Link>
            <Link to="/shopping/manual" className="ghostBtn">
              手动清单
            </Link>
          </div>
        </div>
      ) : (
        <div className="groupList">
          {groupsWithManual.map((g) => (
            <Link key={g.key} to={`/shopping/${encodeURIComponent(g.key)}`} className="groupCard">
              {g.recipe ? (
                <img className="groupCard__img" src={g.recipe.imageSrc} alt="" loading="lazy" />
              ) : (
                <div className="groupCard__img placeholder" aria-hidden="true">
                  🧾
                </div>
              )}

              <div className="groupCard__body">
                <div className="groupCard__title">{g.recipe ? g.recipe.title : '手动清单'}</div>
                <div className="groupCard__meta">
                  {g.total} 项 · 完成 {g.done}/{g.total}（{g.progress}%）
                </div>
                <div className="progressBar" aria-hidden="true">
                  <div className="progressBar__fill" style={{ width: `${g.progress}%` }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
