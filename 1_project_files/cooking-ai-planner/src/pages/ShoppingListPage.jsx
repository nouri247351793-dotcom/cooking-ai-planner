import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useShoppingList } from '../hooks/useShoppingList.js'

export default function ShoppingListPage() {
  const { shoppingItems, groups } = useShoppingList()
  const groupsWithManual = useMemo(() => {
    const hasManual = groups.some((group) => group.key === 'manual')
    return hasManual
      ? groups
      : [...groups, { key: 'manual', recipe: null, title: '手动清单', items: [], total: 0, done: 0, progress: 0 }]
  }, [groups])
  const totalItems = shoppingItems.length

  return (
    <section className="page v3Page">
      <div className="v3PageHero">
        <div>
          <div className="v3PageHero__eyebrow">准备工具</div>
          <h1 className="v3PageHero__title">待购清单</h1>
          <p className="v3PageHero__desc">
            按 AI 建议、菜谱练习和手动项目分组整理食材、调料和器具，做饭前先把缺的东西确认好。
          </p>
        </div>
        <div className="v3PageHero__badge">{totalItems} 项</div>
      </div>

      {totalItems === 0 ? (
        <div className="emptyState v3EmptyState">
          <div className="emptyState__title">🧺 还没有待购清单</div>
          <div className="emptyState__hint">
            在首页生成 AI 做饭建议后会自动同步待购项，也可以先创建一个手动清单。
          </div>
          <div className="actionsRow">
            <Link to="/" className="ghostBtn">
              回首页
            </Link>
            <Link to="/shopping/manual" className="ghostBtn isPrimary">
              手动清单
            </Link>
          </div>
        </div>
      ) : (
        <div className="groupList v3CardGrid">
          {groupsWithManual.map((group) => (
            <Link key={group.key} to={`/shopping/${encodeURIComponent(group.key)}`} className="groupCard v3ListCard">
              {group.recipe ? (
                <img className="groupCard__img" src={group.recipe.imageSrc} alt="" loading="lazy" />
              ) : (
                <div className="groupCard__img placeholder" aria-hidden="true">
                  🧺
                </div>
              )}

              <div className="groupCard__body">
                <div className="groupCard__title">{group.title}</div>
                <div className="groupCard__meta">
                  {group.total} 项 · 完成 {group.done}/{group.total}（{group.progress}%）
                </div>
                <div className="progressBar" aria-hidden="true">
                  <div className="progressBar__fill" style={{ width: `${group.progress}%` }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
