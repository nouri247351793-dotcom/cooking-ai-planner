export const RANDOM_RECIPE_HISTORY_STORAGE_KEY = 'xiaofanzhuo_random_recipe_history'
const MAX_RANDOM_RECIPE_HISTORY = 5

function readHistory() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(RANDOM_RECIPE_HISTORY_STORAGE_KEY)
    return normalizeRandomRecipeHistory(raw ? JSON.parse(raw) : [])
  } catch {
    return []
  }
}

function writeHistory(history) {
  if (typeof window === 'undefined') return false
  try {
    window.localStorage.setItem(RANDOM_RECIPE_HISTORY_STORAGE_KEY, JSON.stringify(history))
    return true
  } catch {
    return false
  }
}

export function normalizeRandomRecipeHistory(input) {
  const list = Array.isArray(input) ? input : []
  const seen = new Set()
  const output = []

  for (const item of list) {
    if (!item || typeof item !== 'object') continue
    const recipe = item.recipe && typeof item.recipe === 'object' ? item.recipe : item
    const id = String(recipe.id || item.id || '').trim()
    if (!id || seen.has(id)) continue
    seen.add(id)
    output.push({
      id,
      createdAt: String(item.createdAt || new Date().toISOString()),
      recipe: {
        ...recipe,
        id,
        title: String(recipe.title || '随机菜谱'),
        description: String(recipe.description || ''),
        estimatedTime: recipe.estimatedTime || (recipe.minutes ? `${recipe.minutes} 分钟` : ''),
        difficulty: String(recipe.difficulty || '新手'),
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        steps: Array.isArray(recipe.steps) ? recipe.steps : [],
        tags: Array.isArray(recipe.tags) ? recipe.tags : [],
      },
    })
  }

  return output
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    .slice(0, MAX_RANDOM_RECIPE_HISTORY)
}

export function getRandomRecipeHistory() {
  return readHistory()
}

export function addRandomRecipeHistory(recipe) {
  if (!recipe || !recipe.id) return readHistory()
  const now = new Date().toISOString()
  const current = readHistory().filter((item) => item.id !== recipe.id)
  const next = normalizeRandomRecipeHistory([{ id: recipe.id, recipe, createdAt: now }, ...current])
  writeHistory(next)
  return next
}

export function clearRandomRecipeHistory() {
  writeHistory([])
  return []
}
