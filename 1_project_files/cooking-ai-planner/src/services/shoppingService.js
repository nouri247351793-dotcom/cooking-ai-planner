import { getRecipeById } from '../data/recipeCatalog.js'

export const SHOPPING_CATEGORIES = [
  { key: 'ingredient', label: '食材' },
  { key: 'condiment', label: '调料' },
  { key: 'equipment', label: '器具' },
]

export const SHOPPING_SOURCES = [
  { key: 'manual', label: '手动' },
  { key: 'recipe_generated', label: '来自菜谱' },
  { key: 'ai_generated', label: 'AI 生成' },
]

export function createEmptyShoppingItem({ fromRecipeId }) {
  const now = new Date().toISOString()
  return {
    id: `manual:${now}:${Math.random().toString(16).slice(2)}`,
    name: '',
    qty: '',
    category: 'ingredient',
    source: 'manual',
    fromRecipeId: fromRecipeId || '',
    checked: false,
    createdAt: now,
    updatedAt: now,
  }
}

export function normalizeShoppingItem(raw) {
  const now = new Date().toISOString()
  const hasRecipe = raw && typeof raw.fromRecipeId === 'string' && raw.fromRecipeId.length > 0
  const source =
    raw && typeof raw.source === 'string'
      ? raw.source
      : hasRecipe
        ? 'recipe_generated'
        : 'manual'

  const category =
    raw && (raw.category === 'ingredient' || raw.category === 'condiment' || raw.category === 'equipment')
      ? raw.category
      : 'ingredient'

  return {
    id: raw && raw.id ? String(raw.id) : `migrated:${now}:${Math.random().toString(16).slice(2)}`,
    name: raw && raw.name ? String(raw.name) : '',
    qty: raw && raw.qty ? String(raw.qty) : '',
    category,
    source,
    fromRecipeId: raw && raw.fromRecipeId ? String(raw.fromRecipeId) : '',
    checked: Boolean(raw && raw.checked),
    createdAt: raw && raw.createdAt ? String(raw.createdAt) : now,
    updatedAt: raw && raw.updatedAt ? String(raw.updatedAt) : (raw && raw.createdAt ? String(raw.createdAt) : now),
  }
}

export function migrateShoppingItems(items) {
  const input = Array.isArray(items) ? items : []
  const normalized = input.map(normalizeShoppingItem)
  let changed = false

  if (input.length !== normalized.length) changed = true
  for (let i = 0; i < input.length; i += 1) {
    const a = input[i]
    const b = normalized[i]
    if (!a || typeof a !== 'object') {
      changed = true
      break
    }
    for (const k of ['category', 'source', 'updatedAt']) {
      if (!(k in a) && k in b) {
        changed = true
        break
      }
    }
    if (changed) break
  }

  return { items: normalized, changed }
}

export function groupShoppingItemsByRecipe(items) {
  const groups = new Map()

  for (const it of items) {
    const key = it.fromRecipeId ? it.fromRecipeId : 'manual'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(it)
  }

  const result = Array.from(groups.entries()).map(([key, list]) => {
    const total = list.length
    const done = list.filter((x) => x.checked).length
    const recipe = key === 'manual' ? null : getRecipeById(key)
    return {
      key,
      recipe,
      items: list,
      total,
      done,
      progress: total ? Math.round((done / total) * 100) : 0,
    }
  })

  result.sort((a, b) => {
    if (a.key === 'manual') return 1
    if (b.key === 'manual') return -1
    const at = a.recipe ? a.recipe.title : a.key
    const bt = b.recipe ? b.recipe.title : b.key
    return at.localeCompare(bt, 'zh-Hans-CN')
  })

  return result
}

export function titleForShoppingGroup(groupKey) {
  if (groupKey === 'manual') return '手动清单'
  const recipe = getRecipeById(groupKey)
  return recipe ? recipe.title : `菜谱清单：${groupKey}`
}

