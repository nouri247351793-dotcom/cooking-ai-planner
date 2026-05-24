export const AI_SHOPPING_LIST_STORAGE_KEY = 'xiaofanzhuo_ai_shopping_list'
const AI_RECIPE_ID_PREFIX = 'ai-recipe:'

function normalizeCategory(category) {
  const value = String(category || '').toLowerCase()
  if (value.includes('condiment') || value.includes('调料') || value.includes('调味')) return 'condiment'
  if (value.includes('equipment') || value.includes('器具') || value.includes('工具') || value.includes('厨具')) {
    return 'equipment'
  }
  return 'ingredient'
}

function normalizeAmount(item) {
  const amount = item?.amount ?? item?.qty ?? item?.quantity ?? ''
  return String(amount || '').trim()
}

function normalizeName(item, index) {
  const name = item?.name ?? item?.title ?? item?.ingredient ?? ''
  const fallback = `AI 待购项 ${index + 1}`
  return String(name || fallback).trim()
}

function normalizeAIRecipeId(recipe) {
  const rawId = String(recipe?.id || recipe?.title || '').trim()
  if (!rawId) return ''
  return rawId.startsWith(AI_RECIPE_ID_PREFIX) ? rawId : `${AI_RECIPE_ID_PREFIX}${rawId}`
}

function resolveRecipeGroup(item, index, recipes) {
  const recipeList = Array.isArray(recipes) ? recipes : []
  const explicitRecipeId = String(item?.recipeId || item?.recipe_id || '').trim()
  const explicitRecipeTitle = String(item?.recipeTitle || item?.recipe || '').trim()

  if (explicitRecipeId) {
    const matched = recipeList.find((recipe) => String(recipe.id) === explicitRecipeId)
    return {
      fromRecipeId: explicitRecipeId.startsWith(AI_RECIPE_ID_PREFIX) ? explicitRecipeId : `${AI_RECIPE_ID_PREFIX}${explicitRecipeId}`,
      fromRecipeTitle: matched?.title || explicitRecipeTitle || explicitRecipeId,
    }
  }

  if (explicitRecipeTitle) {
    const matched = recipeList.find((recipe) => String(recipe.title || '').trim() === explicitRecipeTitle)
    return {
      fromRecipeId: normalizeAIRecipeId(matched || { id: explicitRecipeTitle }),
      fromRecipeTitle: matched?.title || explicitRecipeTitle,
    }
  }

  const fallbackRecipe = recipeList.length ? recipeList[index % recipeList.length] : null
  return {
    fromRecipeId: fallbackRecipe ? normalizeAIRecipeId(fallbackRecipe) : '',
    fromRecipeTitle: fallbackRecipe?.title || '',
  }
}

export function mapAIShoppingListToItems(shoppingList, recipes = [], createdAt = new Date().toISOString()) {
  const list = Array.isArray(shoppingList) ? shoppingList : []

  return list
    .map((item, index) => {
      const group = resolveRecipeGroup(item, index, recipes)
      return {
        id: `ai:${createdAt}:${index}:${normalizeName(item, index)}`,
        name: normalizeName(item, index),
        qty: normalizeAmount(item),
        category: normalizeCategory(item?.category),
        source: 'ai_generated',
        fromRecipeId: group.fromRecipeId,
        fromRecipeTitle: group.fromRecipeTitle,
        checked: Boolean(item?.checked),
        createdAt,
        updatedAt: createdAt,
      }
    })
    .filter((item) => item.name)
}

export function persistAIShoppingList(shoppingList) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false
    window.localStorage.setItem(AI_SHOPPING_LIST_STORAGE_KEY, JSON.stringify(Array.isArray(shoppingList) ? shoppingList : []))
    return true
  } catch {
    return false
  }
}

export function replaceAIShoppingItems(previousItems, aiShoppingItems) {
  const existing = Array.isArray(previousItems) ? previousItems : []
  const nextAIItems = Array.isArray(aiShoppingItems) ? aiShoppingItems : []
  return [
    ...nextAIItems,
    ...existing.filter((item) => item.source !== 'ai_generated' && item.fromRecipeId !== 'ai-generated'),
  ]
}
