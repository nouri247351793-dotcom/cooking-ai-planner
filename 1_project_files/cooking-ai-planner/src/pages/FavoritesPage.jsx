import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { getRecipeById } from '../data/recipeCatalog.js'
import RecipeCard from '../components/home/RecipeCard.jsx'
import { downloadJSON, exportFavoritesToJSON, exportShoppingListToJSON } from '../services/exportService.js'
import { useFavorites } from '../hooks/useFavorites.js'
import useToast from '../hooks/useToast.js'

function matchQuery(recipe, query) {
  const q = String(query || '').trim().toLowerCase()
  if (!q) return true
  const parts = [
    recipe.title,
    ...(recipe.tags || []),
    ...(recipe.coreIngredients || []),
    ...((recipe.ingredients || []).map((x) => x.name)),
    ...((recipe.condiments || []).map((x) => x.name)),
  ]
  const text = parts.filter(Boolean).join(' ').toLowerCase()
  return text.includes(q)
}

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()
  const { toast, showToast } = useToast()

  const favRecipes = useMemo(() => favoriteIds.map((id) => getRecipeById(id)).filter(Boolean), [favoriteIds])

  const [query, setQuery] = useState('')
  const [activeCap, setActiveCap] = useState('all')
  const [removingIds, setRemovingIds] = useState(() => new Set())

  const caps = useMemo(
    () => [
      { key: 'all', label: '全部', test: () => true },
      { key: 't10', label: '10 分钟内', test: (r) => r.minutes <= 10 },
      { key: 't20', label: '20 分钟内', test: (r) => r.minutes <= 20 },
      { key: 'b10', label: '<10 元', test: (r) => r.budget === 'low' },
      { key: 'easy', label: '新手', test: (r) => String(r.difficulty) === '新手' },
      { key: 'simple', label: '极简', test: (r) => (r.ingredients || []).length <= 5 && (r.condiments || []).length <= 4 },
    ],
    [],
  )

  const activeTest = useMemo(() => {
    const found = caps.find((c) => c.key === activeCap)
    return found ? found.test : () => true
  }, [activeCap, caps])

  const filtered = useMemo(
    () => favRecipes.filter((r) => activeTest(r) && matchQuery(r, query)),
    [activeTest, favRecipes, query],
  )

  return (
    <section className="page">
      <div className="card">
        <div className="cardHeadRow" style={{ marginBottom: 10 }}>
          <div>
            <div className="card__title">⭐ 我的收藏</div>
            <div className="muted" style={{ marginTop: 6 }}>
              已收藏 <b>{favoriteIds.length}</b> 道 · 当前显示 <b>{filtered.length}</b> 道
            </div>
          </div>
          <button
            type="button"
            className="ghostBtn"
            onClick={() => {
              try {
                downloadJSON({ fileName: 'favorites.json', jsonText: exportFavoritesToJSON() })
                downloadJSON({ fileName: 'shopping-list.json', jsonText: exportShoppingListToJSON() })
                showToast('已导出 JSON（favorites / shopping-list）')
              } catch {
                showToast('导出失败（请检查浏览器权限）')
              }
            }}
          >
            导出数据
          </button>
        </div>

        <div className="searchBar">
          <input
            className="searchInput"
            value={query}
            name="favorites_search"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索：菜名 / 食材 / 标签"
          />
          <button type="button" className="secondaryBtn" onClick={() => setQuery('')} disabled={!query.trim()}>
            清空
          </button>
        </div>

        <div className="capsRow" style={{ marginTop: 12 }} aria-label="收藏筛选胶囊">
          {caps.map((c) => {
            const active = c.key === activeCap
            return (
              <button
                key={c.key}
                type="button"
                className={active ? 'capBtn is-active' : 'capBtn'}
                onClick={() => setActiveCap(c.key)}
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      {favoriteIds.length === 0 ? (
        <div className="emptyState">
          <div className="emptyState__title">还没有收藏 ⭐</div>
          <div className="emptyState__hint">回首页看看本周推荐，先收藏 1 道当作练习目标。</div>
          <div className="actionsRow">
            <Link to="/" className="ghostBtn">
              回首页
            </Link>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="emptyState">
          <div className="emptyState__title">没有匹配的收藏</div>
          <div className="emptyState__hint">试试清空搜索或切换筛选胶囊。</div>
          <div className="actionsRow">
            <button
              type="button"
              className="ghostBtn"
              onClick={() => {
                setQuery('')
                setActiveCap('all')
              }}
            >
              重置筛选
            </button>
          </div>
        </div>
      ) : (
        <div className="weekGrid">
          {filtered.map((r) => (
            <div key={r.id} className={removingIds.has(r.id) ? 'fadeOutWrap is-fading' : 'fadeOutWrap'}>
              <RecipeCard
                recipe={r}
                actionSlot={
                  <button
                    type="button"
                    className="iconBtn"
                    aria-label={isFavorite(r.id) ? '取消收藏' : '收藏'}
                    onClick={() => {
                      if (removingIds.has(r.id)) return
                      if (!isFavorite(r.id)) {
                        toggleFavorite(r.id)
                        showToast('已收藏')
                        return
                      }

                      const next = new Set(removingIds)
                      next.add(r.id)
                      setRemovingIds(next)
                      setTimeout(() => {
                        toggleFavorite(r.id)
                        showToast('已取消收藏')
                        const after = new Set(next)
                        after.delete(r.id)
                        setRemovingIds(after)
                      }, 220)
                    }}
                    style={{ color: isFavorite(r.id) ? 'var(--c-primary)' : undefined }}
                  >
                    {isFavorite(r.id) ? '★' : '☆'}
                  </button>
                }
              />
            </div>
          ))}
        </div>
      )}

      {toast ? <div className="toast">{toast}</div> : null}
    </section>
  )
}
