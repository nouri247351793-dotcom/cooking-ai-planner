import { LEGACY_KEYS, STORAGE_KEYS } from '../store/storageKeys.js'
import { getRecipeById } from '../data/recipeCatalog.js'
import { migrateShoppingItems } from './shoppingService.js'

function safeReadJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function safeReadJsonFirst(keys, fallback) {
  for (const key of keys || []) {
    const value = safeReadJson(key, null)
    if (value !== null) return value
  }
  return fallback
}

function buildExportMeta() {
  return {
    app: 'cooking-ai-planner',
    exportedAt: new Date().toISOString(),
    version: 1,
  }
}

export function exportFavoritesToJSON() {
  const ids = safeReadJson(STORAGE_KEYS.favorites, null) ?? safeReadJsonFirst(LEGACY_KEYS.favorites, [])
  const recipes = Array.isArray(ids)
    ? ids.map((id) => getRecipeById(id)).filter(Boolean)
    : []

  return JSON.stringify(
    {
      meta: buildExportMeta(),
      favorites: {
        ids: Array.isArray(ids) ? ids : [],
        recipesSnapshot: recipes,
      },
    },
    null,
    2,
  )
}

export function exportShoppingListToJSON() {
  const raw = safeReadJson(STORAGE_KEYS.shoppingItems, null) ?? safeReadJsonFirst(LEGACY_KEYS.shoppingItems, [])
  const { items } = migrateShoppingItems(raw)
  return JSON.stringify(
    {
      meta: buildExportMeta(),
      shoppingItems: items,
    },
    null,
    2,
  )
}

export function downloadJSON({ fileName, jsonText }) {
  const blob = new Blob([jsonText], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 500)
}
