import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import {
  buildHomeParams,
  createDefaultFilters,
  createEmptyPhotoResult,
  getDefaultRecommendedRecipes,
} from '../services/homeRecipeAgentService.js'
import { generateRecipes } from '../services/ai/recipeGenerationService.js'
import { groupShoppingItemsByRecipe, migrateShoppingItems } from '../services/shoppingService.js'
import { createDefaultAiConfig, normalizeAiConfig } from '../services/ai/aiConfigModel.js'
import { LEGACY_KEYS, STORAGE_KEYS } from './storageKeys.js'

function safeReadJson(key) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return { ok: false, value: null }
    return { ok: true, value: JSON.parse(raw) }
  } catch {
    return { ok: false, value: null }
  }
}

function readLegacyFirst(keys) {
  for (const k of keys) {
    const res = safeReadJson(k)
    if (res.ok) return res.value
  }
  return null
}

function normalizeFavoriteIds(input) {
  const list = Array.isArray(input) ? input : []
  const out = []
  const seen = new Set()
  for (const x of list) {
    const id = typeof x === 'string' ? x : null
    if (!id) continue
    if (seen.has(id)) continue
    seen.add(id)
    out.push(id)
  }
  return out
}

const FavoritesCtx = createContext(null)
const ShoppingCtx = createContext(null)
const RecipeGenCtx = createContext(null)
const AiConfigCtx = createContext(null)
const RecentCtx = createContext(null)

function normalizeRecentCooked(input) {
  const list = Array.isArray(input) ? input : []
  const out = []
  const seen = new Set()
  for (const x of list) {
    if (!x || typeof x !== 'object') continue
    const recipeId = typeof x.recipeId === 'string' ? x.recipeId : ''
    const cookedAt = typeof x.cookedAt === 'string' ? x.cookedAt : ''
    if (!recipeId || !cookedAt) continue
    if (seen.has(recipeId)) continue
    seen.add(recipeId)
    out.push({ recipeId, cookedAt })
  }
  out.sort((a, b) => String(b.cookedAt).localeCompare(String(a.cookedAt)))
  return out
}

export function AppDataProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(STORAGE_KEYS.favorites, () => {
    const legacy = readLegacyFirst(LEGACY_KEYS.favorites || [])
    return normalizeFavoriteIds(legacy || [])
  })

  const [shoppingItemsRaw, setShoppingItemsRaw] = useLocalStorage(STORAGE_KEYS.shoppingItems, () => {
    const legacy = readLegacyFirst(LEGACY_KEYS.shoppingItems || [])
    return Array.isArray(legacy) ? legacy : []
  })

  const { items: shoppingItems, changed: shoppingChanged } = useMemo(
    () => migrateShoppingItems(shoppingItemsRaw),
    [shoppingItemsRaw],
  )

  // keep localStorage in normalized shape (migration fallback)
  useEffect(() => {
    if (!shoppingChanged) return
    setShoppingItemsRaw(shoppingItems)
  }, [shoppingChanged, shoppingItems, setShoppingItemsRaw])

  const [recipeGenPersist, setRecipeGenPersist] = useLocalStorage(STORAGE_KEYS.recipeGenerator, () => ({
    inputText: '',
    filters: createDefaultFilters(),
    photoResult: createEmptyPhotoResult(),
  }))

  const [recentCookedRaw, setRecentCookedRaw] = useLocalStorage(STORAGE_KEYS.recentCooked, () => {
    const legacy = readLegacyFirst(LEGACY_KEYS.recentCooked || [])
    return normalizeRecentCooked(legacy || [])
  })

  const recentApi = useMemo(() => {
    const list = normalizeRecentCooked(recentCookedRaw)
    const add = (recipeId) => {
      if (!recipeId) return
      const now = new Date().toISOString()
      setRecentCookedRaw((prev) => {
        const p = normalizeRecentCooked(prev)
        const rest = p.filter((x) => x.recipeId !== recipeId)
        const next = [{ recipeId, cookedAt: now }, ...rest]
        return next.slice(0, 30)
      })
    }
    const remove = (recipeId) => {
      if (!recipeId) return
      setRecentCookedRaw((prev) => normalizeRecentCooked(prev).filter((x) => x.recipeId !== recipeId))
    }
    const clear = () => setRecentCookedRaw([])
    return { recentCooked: list, addRecentCooked: add, removeRecentCooked: remove, clearRecentCooked: clear }
  }, [recentCookedRaw, setRecentCookedRaw])

  const [aiConfigRaw, setAiConfigRaw] = useLocalStorage(STORAGE_KEYS.aiConfig, () => {
    const legacy = readLegacyFirst(LEGACY_KEYS.aiConfig || [])
    return legacy || createDefaultAiConfig()
  })

  const aiConfig = useMemo(() => normalizeAiConfig(aiConfigRaw), [aiConfigRaw])

  useEffect(() => {
    const normalized = normalizeAiConfig(aiConfigRaw)
    const rawText = JSON.stringify(aiConfigRaw)
    const normText = JSON.stringify(normalized)
    if (rawText !== normText) setAiConfigRaw(normalized)
  }, [aiConfigRaw, setAiConfigRaw])

  // recipe generator UI state (in-memory)
  const defaultRecs = useMemo(() => getDefaultRecommendedRecipes(), [])
  const [recipeGenUi, setRecipeGenUi] = useState(() => ({
    status: 'idle', // idle | loading | success | empty | error
    recipes: defaultRecs,
    errorMsg: '',
    lastAiRequestPayload: null,
    randomRecipe: null,
  }))

  const favoritesApi = useMemo(() => {
    const ids = normalizeFavoriteIds(favoriteIds)
    const isFavorite = (id) => ids.includes(id)
    const add = (id) => {
      if (!id) return
      setFavoriteIds((prev) => [id, ...normalizeFavoriteIds(prev).filter((x) => x !== id)])
    }
    const remove = (id) => {
      if (!id) return
      setFavoriteIds((prev) => normalizeFavoriteIds(prev).filter((x) => x !== id))
    }
    const toggle = (id) => {
      if (!id) return
      setFavoriteIds((prev) => {
        const p = normalizeFavoriteIds(prev)
        return p.includes(id) ? p.filter((x) => x !== id) : [id, ...p.filter((x) => x !== id)]
      })
    }
    return { favoriteIds: ids, isFavorite, addFavorite: add, removeFavorite: remove, toggleFavorite: toggle }
  }, [favoriteIds, setFavoriteIds])

  const shoppingApi = useMemo(() => {
    const groups = groupShoppingItemsByRecipe(shoppingItems)
    return {
      shoppingItems,
      setShoppingItems: setShoppingItemsRaw,
      groups,
    }
  }, [setShoppingItemsRaw, shoppingItems])

  const setInputText = useCallback(
    (next) => setRecipeGenPersist((prev) => ({ ...prev, inputText: next })),
    [setRecipeGenPersist],
  )
  const setFilters = useCallback(
    (next) => setRecipeGenPersist((prev) => ({ ...prev, filters: next })),
    [setRecipeGenPersist],
  )
  const setPhotoResult = useCallback(
    (next) => setRecipeGenPersist((prev) => ({ ...prev, photoResult: next })),
    [setRecipeGenPersist],
  )

  const generate = useCallback(async () => {
    setRecipeGenUi((prev) => ({ ...prev, status: 'loading', errorMsg: '' }))

    try {
      const params = buildHomeParams({
        inputText: recipeGenPersist.inputText,
        filters: recipeGenPersist.filters,
        photoResult: recipeGenPersist.photoResult,
      })

      const res = await generateRecipes(params, aiConfig)

      if (!res.recipes || res.recipes.length === 0) {
        setRecipeGenUi((prev) => ({
          ...prev,
          status: 'empty',
          recipes: [],
          lastAiRequestPayload: res.aiRequestPayload,
        }))
        return { status: 'empty', recipes: [], aiRequestPayload: res.aiRequestPayload }
      }

      setRecipeGenUi((prev) => ({
        ...prev,
        status: 'success',
        recipes: res.recipes,
        lastAiRequestPayload: res.aiRequestPayload,
      }))
      return { status: 'success', recipes: res.recipes, aiRequestPayload: res.aiRequestPayload }
    } catch (e) {
      const msg = e && e.message ? e.message : '发生未知错误，请重试'
      setRecipeGenUi((prev) => ({
        ...prev,
        status: 'error',
        recipes: [],
        errorMsg: msg,
      }))
      return { status: 'error', recipes: [], errorMsg: msg }
    }
  }, [aiConfig, recipeGenPersist.filters, recipeGenPersist.inputText, recipeGenPersist.photoResult])

  const recipeGenApi = useMemo(
    () => ({
      defaultRecipes: defaultRecs,
      inputText: recipeGenPersist.inputText,
      filters: recipeGenPersist.filters,
      photoResult: recipeGenPersist.photoResult,
      setInputText,
      setFilters,
      setPhotoResult,
      status: recipeGenUi.status,
      recipes: recipeGenUi.recipes,
      errorMsg: recipeGenUi.errorMsg,
      lastAiRequestPayload: recipeGenUi.lastAiRequestPayload,
      randomRecipe: recipeGenUi.randomRecipe,
      setRandomRecipe: (r) => setRecipeGenUi((prev) => ({ ...prev, randomRecipe: r })),
      resetToDefault: () =>
        setRecipeGenUi((prev) => ({ ...prev, status: 'idle', recipes: defaultRecs, errorMsg: '' })),
      generate,
    }),
    [
      defaultRecs,
      generate,
      recipeGenPersist.filters,
      recipeGenPersist.inputText,
      recipeGenPersist.photoResult,
      recipeGenUi.errorMsg,
      recipeGenUi.lastAiRequestPayload,
      recipeGenUi.randomRecipe,
      recipeGenUi.recipes,
      recipeGenUi.status,
      setFilters,
      setInputText,
      setPhotoResult,
    ],
  )

  return createElement(
    FavoritesCtx.Provider,
    { value: favoritesApi },
    createElement(
      ShoppingCtx.Provider,
      { value: shoppingApi },
      createElement(
        AiConfigCtx.Provider,
        {
          value: {
            aiConfig,
            setAiConfig: setAiConfigRaw,
            updateAiConfig: (patch) => setAiConfigRaw((prev) => ({ ...normalizeAiConfig(prev), ...(patch || {}) })),
          },
        },
        createElement(
          RecentCtx.Provider,
          { value: recentApi },
          createElement(RecipeGenCtx.Provider, { value: recipeGenApi }, children),
        ),
      ),
    ),
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesCtx)
  if (!ctx) throw new Error('useFavorites must be used within AppDataProvider')
  return ctx
}

export function useShoppingList() {
  const ctx = useContext(ShoppingCtx)
  if (!ctx) throw new Error('useShoppingList must be used within AppDataProvider')
  return ctx
}

export function useRecipeGeneratorState() {
  const ctx = useContext(RecipeGenCtx)
  if (!ctx) throw new Error('useRecipeGeneratorState must be used within AppDataProvider')
  return ctx
}

export function useRecent() {
  const ctx = useContext(RecentCtx)
  if (!ctx) throw new Error('useRecent must be used within AppDataProvider')
  return ctx
}

export function useAiConfig() {
  const ctx = useContext(AiConfigCtx)
  if (!ctx) throw new Error('useAiConfig must be used within AppDataProvider')
  return ctx
}
