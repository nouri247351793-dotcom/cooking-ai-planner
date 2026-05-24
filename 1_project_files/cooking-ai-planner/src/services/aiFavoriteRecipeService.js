export const AI_FAVORITE_RECIPES_STORAGE_KEY = 'xiaofanzhuo_favorite_recipes'
export const AI_RECIPE_ID_PREFIX = 'ai-recipe:'

function asText(value, fallback = '') {
  return String(value || fallback).trim()
}

function parseMinutes(value) {
  const match = String(value || '').match(/\d+/)
  const minutes = match ? Number(match[0]) : 15
  return Number.isFinite(minutes) && minutes > 0 ? minutes : 15
}

function normalizeRecipeId(recipe) {
  const rawId = asText(recipe?.id || recipe?.title || Date.now())
  return rawId.startsWith(AI_RECIPE_ID_PREFIX) ? rawId : `${AI_RECIPE_ID_PREFIX}${rawId}`
}

function normalizeTextList(input) {
  return Array.isArray(input) ? input.map((item) => asText(item)).filter(Boolean) : []
}

function mapIngredients(input) {
  if (!Array.isArray(input)) return []
  return input
    .map((item) => {
      if (item && typeof item === 'object') {
        return {
          name: asText(item.name || item.title || item.ingredient),
          amount: asText(item.amount || item.qty || item.quantity),
        }
      }
      return { name: asText(item), amount: '' }
    })
    .filter((item) => item.name)
}

function mapSteps(input) {
  if (!Array.isArray(input)) return []
  return input
    .map((step, index) => {
      if (step && typeof step === 'object') {
        return {
          title: asText(step.title, `步骤 ${index + 1}`),
          detail: asText(step.detail || step.description || step.text),
          minutes: typeof step.minutes === 'number' ? step.minutes : null,
        }
      }
      return {
        title: `步骤 ${index + 1}`,
        detail: asText(step),
        minutes: null,
      }
    })
    .filter((step) => step.detail)
}

export function mapAIRecipeToFavoriteRecipe(recipe, savedAt = new Date().toISOString()) {
  const ingredients = mapIngredients(recipe?.ingredients)
  const title = asText(recipe?.title, 'AI 推荐菜谱')

  return {
    id: normalizeRecipeId(recipe),
    title,
    description: asText(recipe?.description, '来自 AI 的做饭建议'),
    imageSrc: '/brand/logo-placeholder.svg',
    minutes: parseMinutes(recipe?.estimatedTime),
    budget: 'unknown',
    difficulty: asText(recipe?.difficulty, '新手'),
    servings: 1,
    tags: normalizeTextList(recipe?.tags).slice(0, 6),
    coreIngredients: ingredients.map((item) => item.name).slice(0, 5),
    ingredients,
    condiments: [],
    steps: mapSteps(recipe?.steps),
    pairings: [],
    nutrition: { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 },
    learning: {
      goal: '按 AI 建议完成一道简单菜',
      focus: ['省时', '省钱', '易上手'],
    },
    source: 'ai_generated',
    savedAt,
  }
}

export function normalizeAIFavoriteRecipes(input) {
  const list = Array.isArray(input) ? input : []
  const seen = new Set()
  const out = []

  for (const item of list) {
    if (!item || typeof item !== 'object') continue
    const recipe = mapAIRecipeToFavoriteRecipe(item, item.savedAt || new Date().toISOString())
    if (seen.has(recipe.id)) continue
    seen.add(recipe.id)
    out.push(recipe)
  }

  return out
}

export function isAIFavoriteRecipe(recipes, recipeId) {
  const normalizedId = normalizeRecipeId({ id: recipeId })
  return normalizeAIFavoriteRecipes(recipes).some((recipe) => recipe.id === normalizedId)
}

export function addAIFavoriteRecipe(recipes, aiRecipe) {
  const nextRecipe = mapAIRecipeToFavoriteRecipe(aiRecipe)
  const existing = normalizeAIFavoriteRecipes(recipes).filter((recipe) => recipe.id !== nextRecipe.id)
  return [nextRecipe, ...existing]
}

export function removeAIFavoriteRecipe(recipes, recipeId) {
  const normalizedId = normalizeRecipeId({ id: recipeId })
  return normalizeAIFavoriteRecipes(recipes).filter((recipe) => recipe.id !== normalizedId)
}
