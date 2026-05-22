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
    ...((recipe.ingredients || []).map((item) => item.name)),
    ...((recipe.condiments || []).map((item) => item.name)),
  ]
  return parts.filter(Boolean).join(' ').toLowerCase().includes(q)
}

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites()
  const { toast, showToast } = useToast()
  const [query, setQuery] = useState('')
  const [activeCap, setActiveCap] = useState('all')
  const [removingIds, setRemovingIds] = useState(() => new Set())

  const favRecipes = useMemo(() => favoriteIds.map((id) => getRecipeById(id)).filter(Boolean), [favoriteIds])
  const caps = useMemo(
    () => [
      { key: 'all', label: '全部', test: () => true },
      { key: 't10', label: '10 分钟内', test: (recipe) => recipe.minutes <= 10 },
      { key: 't20', label: '20 分钟内', test: (recipe) => recipe.minutes <= 20 },
      { key: 'b10', label: '<10 元', test: (recipe) => recipe.budget === 'low' },
      { key: 'easy', label: '新手', test: (recipe) => String(recipe.difficulty) === '新手' },
      {
        key: 'simple',
        label: '极简',
        test: (recipe) => (recipe.ingredients || []).length <= 5 && (recipe.condiments || []).length <= 4,
      },
    ],
    [],
  )

  const activeTest = useMemo(() => {
    const found = caps.find((cap) => cap.key === activeCap)
    return found ? found.test : () => true
  }, [activeCap, caps])

  const filtered = useMemo(
    () => favRecipes.filter((recipe) => activeTest(recipe) && matchQuery(recipe, query)),
    [activeTest, favRecipes, query],
  )

  const resetFilters = () => {
    setQuery('')
    setActiveCap('all')
  }

  return (
    <section className="page v3Page">
      <div className="v3PageHero">
        <div>
          <div className="v3PageHero__eyebrow">练习收藏夹</div>
          <h1 className="v3PageHero__title">我的收藏</h1>
          <p className="v3PageHero__desc">
            已收藏 {favoriteIds.length} 道 · 当前显示 {filtered.length} 道。这里是复练和备选菜谱的辅助页。
          </p>
        </div>
        <button
          type="button"
          className="ghostBtn isPrimary"
          onClick={() => {
            try {
              downloadJSON({ fileName: 'favorites.json', jsonText: exportFavoritesToJSON() })
              downloadJSON({ fileName: 'shopping-list.json', jsonText: exportShoppingListToJSON() })
              showToast('已导出 JSON 数据')
            } catch {
              showToast('导出失败，请检查浏览器权限')
            }
          }}
        >
          导出数据
        </button>
      </div>

      <div className="card v3ControlCard">
        <div className="searchBar">
          <input
            className="searchInput"
            value={query}
            name="favorites_search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索：菜名 / 食材 / 标签"
          />
          <button type="button" className="secondaryBtn" onClick={() => setQuery('')} disabled={!query.trim()}>
            清空
          </button>
        </div>

        <div className="capsRow" style={{ marginTop: 12 }} aria-label="收藏筛选">
          {caps.map((cap) => (
            <button
              key={cap.key}
              type="button"
              className={cap.key === activeCap ? 'capBtn is-active' : 'capBtn'}
              onClick={() => setActiveCap(cap.key)}
            >
              {cap.label}
            </button>
          ))}
        </div>
      </div>

      {favoriteIds.length === 0 ? (
        <div className="emptyState v3EmptyState">
          <div className="emptyState__title">还没有收藏 ⭐</div>
          <div className="emptyState__hint">先从首页生成或随机一道菜，把适合复练的菜收藏起来。</div>
          <div className="actionsRow">
            <Link to="/" className="ghostBtn isPrimary">
              回首页
            </Link>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="emptyState v3EmptyState">
          <div className="emptyState__title">没有匹配的收藏</div>
          <div className="emptyState__hint">尝试清空搜索或切换筛选胶囊。</div>
          <div className="actionsRow">
            <button type="button" className="ghostBtn isPrimary" onClick={resetFilters}>
              重置筛选
            </button>
          </div>
        </div>
      ) : (
        <div className="weekGrid v3RecipeGrid">
          {filtered.map((recipe) => (
            <div key={recipe.id} className={removingIds.has(recipe.id) ? 'fadeOutWrap is-fading' : 'fadeOutWrap'}>
              <RecipeCard
                recipe={recipe}
                actionSlot={
                  <button
                    type="button"
                    className="iconBtn"
                    aria-label={isFavorite(recipe.id) ? '取消收藏' : '收藏'}
                    onClick={() => {
                      if (removingIds.has(recipe.id)) return
                      if (!isFavorite(recipe.id)) {
                        toggleFavorite(recipe.id)
                        showToast('已收藏')
                        return
                      }

                      const next = new Set(removingIds)
                      next.add(recipe.id)
                      setRemovingIds(next)
                      setTimeout(() => {
                        toggleFavorite(recipe.id)
                        showToast('已取消收藏')
                        const after = new Set(next)
                        after.delete(recipe.id)
                        setRemovingIds(after)
                      }, 220)
                    }}
                    style={{ color: isFavorite(recipe.id) ? 'var(--c-primary)' : undefined }}
                  >
                    {isFavorite(recipe.id) ? '★' : '☆'}
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
