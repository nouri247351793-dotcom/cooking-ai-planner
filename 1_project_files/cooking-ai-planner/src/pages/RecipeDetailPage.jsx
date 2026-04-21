import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import AddToShoppingResultModal from '../components/recipe/AddToShoppingResultModal.jsx'
import { getRecipeById } from '../data/recipeCatalog.js'
import { useFavorites } from '../hooks/useFavorites.js'
import { useShoppingList } from '../hooks/useShoppingList.js'
import { useRecent } from '../hooks/useRecent.js'
import useToast from '../hooks/useToast.js'

function formatBudget(budget) {
  if (budget === 'low') return '<10元'
  if (budget === 'mid') return '10-30元'
  return '不确定'
}

function parseQty(qty) {
  const text = String(qty || '').trim()
  const m = text.match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!m) return null
  const n = Number(m[1])
  if (!Number.isFinite(n)) return null
  const unit = String(m[2] || '').trim()
  return { n, unit }
}

function mergeQty(a, b) {
  const aText = String(a || '').trim()
  const bText = String(b || '').trim()
  if (!aText) return bText
  if (!bText) return aText
  if (aText === bText) return aText

  const pa = parseQty(aText)
  const pb = parseQty(bText)
  if (pa && pb && pa.unit === pb.unit) {
    const sum = pa.n + pb.n
    const sumText = Number.isInteger(sum) ? String(sum) : String(Math.round(sum * 10) / 10)
    return `${sumText}${pa.unit ? ` ${pa.unit}` : ''}`.trim()
  }

  return `${aText} + ${bText}`
}

function buildSelectionKey(type, id) {
  return `${type}:${id}`
}

function RecipeDetailInner({ recipe }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { setShoppingItems } = useShoppingList()
  const { addRecentCooked } = useRecent()
  const { toast, showToast } = useToast()

  const [selected, setSelected] = useState(() => {
    const next = new Set()
    for (const i of recipe.ingredients || []) next.add(buildSelectionKey('ingredient', i.name))
    for (const i of recipe.condiments || []) next.add(buildSelectionKey('condiment', i.name))
    return next
  })

  const [resultOpen, setResultOpen] = useState(false)
  const [lastAddedCount, setLastAddedCount] = useState(0)

  const selectedCount = selected.size
  const isFav = isFavorite(recipe.id)

  const toggleSelection = (type, name) => {
    const key = buildSelectionKey(type, name)
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const isSelected = (type, name) => selected.has(buildSelectionKey(type, name))
  const clearSelection = () => setSelected(new Set())

  const addSelectedToShopping = () => {
    if (selectedCount === 0) {
      showToast('先选择要加入清单的食材/调料')
      return
    }

    const now = new Date().toISOString()
    const toAdd = []

    for (const i of recipe.ingredients || []) {
      if (!isSelected('ingredient', i.name)) continue
      toAdd.push({
        id: `${recipe.id}:ingredient:${i.name}`,
        name: i.name,
        qty: i.amount,
        category: 'ingredient',
        source: 'recipe_generated',
        fromRecipeId: recipe.id,
        checked: false,
        createdAt: now,
        updatedAt: now,
      })
    }

    for (const i of recipe.condiments || []) {
      if (!isSelected('condiment', i.name)) continue
      toAdd.push({
        id: `${recipe.id}:condiment:${i.name}`,
        name: i.name,
        qty: i.amount,
        category: 'condiment',
        source: 'recipe_generated',
        fromRecipeId: recipe.id,
        checked: false,
        createdAt: now,
        updatedAt: now,
      })
    }

    if (toAdd.length === 0) {
      showToast('没有可加入的条目')
      return
    }

    setShoppingItems((prev) => {
      const list = Array.isArray(prev) ? prev : []
      const out = list.map((x) => ({ ...x }))

      for (const item of toAdd) {
        const idx = out.findIndex((x) => x.category === item.category && x.name === item.name)
        if (idx >= 0) {
          const existed = out[idx]
          out[idx] = { ...existed, qty: mergeQty(existed.qty, item.qty), updatedAt: now }
        } else {
          out.unshift(item)
        }
      }

      return out
    })

    setLastAddedCount(toAdd.length)
    setResultOpen(true)
  }

  return (
    <section className="page">
      <div className="detailHero">
        <img className="detailHero__img" src={recipe.imageSrc} alt="" />
      </div>

      <div className="detailGrid">
        <div className="detailCol detailCol--left">
          <div className="card">
        <div className="detailTitle">{recipe.title}</div>
        <div className="detailMeta">
          <span className="metaPill">{recipe.minutes} 分钟</span>
          <span className="metaPill">{formatBudget(recipe.budget)}</span>
          <span className="metaPill">{recipe.difficulty}</span>
          <span className="metaPill">{recipe.servings} 人份</span>
        </div>
        <div className="detailTags">
          {(recipe.tags || []).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="detailSection">
          <div className="sectionTitle">🍱 核心食材</div>
          <div className="inlineList">{(recipe.coreIngredients || []).join(' · ')}</div>
        </div>
      </div>

      <div className="card">
        <div className="sectionHeadRow">
          <div>
            <div className="sectionTitle">🥦 食材（可点选加入清单）</div>
            <div className="muted" style={{ marginTop: 6 }}>
              点击条目可选中/取消；底部按钮角标会显示已选数量。
            </div>
          </div>
          <button
            type="button"
            className="miniBtn"
            onClick={clearSelection}
            disabled={selectedCount === 0}
            aria-label="清空当前选择"
          >
            清空
          </button>
        </div>

        <ul className="kvList">
          {(recipe.ingredients || []).map((i) => {
            const on = isSelected('ingredient', i.name)
            return (
              <li key={i.name} className="kvRow">
                <button
                  type="button"
                  className={on ? 'kv kv--selectable is-selected' : 'kv kv--selectable'}
                  aria-pressed={on}
                  onClick={() => toggleSelection('ingredient', i.name)}
                >
                  <span className="kv__k">{i.name}</span>
                  <span className="kv__v">{i.amount}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="sectionTitle" style={{ marginTop: 14 }}>
          🧂 调料（可点选加入清单）
        </div>
        <ul className="kvList">
          {(recipe.condiments || []).map((i) => {
            const on = isSelected('condiment', i.name)
            return (
              <li key={i.name} className="kvRow">
                <button
                  type="button"
                  className={on ? 'kv kv--selectable is-selected' : 'kv kv--selectable'}
                  aria-pressed={on}
                  onClick={() => toggleSelection('condiment', i.name)}
                >
                  <span className="kv__k">{i.name}</span>
                  <span className="kv__v">{i.amount}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="card">
        <div className="sectionTitle">🥗 营养信息（估算）</div>
        <div className="nutritionGrid">
          <div className="nutri">
            <div className="nutri__k">热量</div>
            <div className="nutri__v">{recipe.nutrition.kcal} kcal</div>
          </div>
          <div className="nutri">
            <div className="nutri__k">蛋白质</div>
            <div className="nutri__v">{recipe.nutrition.proteinG} g</div>
          </div>
          <div className="nutri">
            <div className="nutri__k">碳水</div>
            <div className="nutri__v">{recipe.nutrition.carbsG} g</div>
          </div>
          <div className="nutri">
            <div className="nutri__k">脂肪</div>
            <div className="nutri__v">{recipe.nutrition.fatG} g</div>
          </div>
        </div>
      </div>

        </div>

        <div className="detailCol detailCol--right">
          <div className="card">
        <div className="sectionTitle">📝 步骤</div>
        <ol className="stepList">
          {(recipe.steps || []).map((s, idx) => (
            <li key={`${idx}-${s.title}`} className="step">
              <div className="step__head">
                <div className="step__title">{s.title}</div>
                {typeof s.minutes === 'number' ? <div className="step__time">{s.minutes} min</div> : null}
              </div>

              {idx < 2 ? <div className="step__imgPlaceholder">辅助图片占位（可替换）</div> : null}

              <div className="step__detail">{s.detail}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="card">
        <div className="sectionTitle">🍵 推荐搭配</div>
        <ul className="bulletList">
          {(recipe.pairings || []).map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

        </div>
      </div>

      <div className="detailActions">
        <button
          type="button"
          className={isFav ? 'actionBtn is-active' : 'actionBtn'}
          onClick={() => {
            const wasFav = isFavorite(recipe.id)
            toggleFavorite(recipe.id)
            showToast(wasFav ? '已取消收藏' : '已收藏')
          }}
        >
          {isFav ? '已收藏' : '收藏'}
        </button>

        <button
          type="button"
          className="actionBtn"
          onClick={() => {
            addRecentCooked(recipe.id)
            showToast('已记录：我做了')
          }}
        >
          我做了
        </button>

        <button type="button" className="actionBtn actionBtn--primary" onClick={addSelectedToShopping}>
          加入待购清单
          {selectedCount > 0 ? <span className="actionBadge">{selectedCount}</span> : null}
        </button>
      </div>

      <AddToShoppingResultModal
        open={resultOpen}
        recipeTitle={recipe.title}
        addedCount={lastAddedCount}
        onClose={() => setResultOpen(false)}
      />

      {toast ? <div className="toast">{toast}</div> : null}
    </section>
  )
}

export default function RecipeDetailPage() {
  const { recipeId } = useParams()
  const location = useLocation()
  const recipeFromState = location.state && location.state.recipe ? location.state.recipe : null
  const recipe = recipeFromState || getRecipeById(recipeId)

  if (!recipe) {
    return (
      <section className="page">
        <div className="card">
          <div className="card__title">未找到菜谱</div>
          <p className="muted">请返回上一页重新选择。</p>
        </div>
      </section>
    )
  }

  // Keyed to reset selection state when switching recipes.
  return <RecipeDetailInner key={recipe.id} recipe={recipe} />
}
