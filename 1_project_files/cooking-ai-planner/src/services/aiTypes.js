export const AI_RESPONSE_SCHEMA_VERSION = 'xiaofanzhuo.ai-response.v1'

/**
 * @typedef {Object} AIRecipe
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} ingredients
 * @property {string[]} steps
 * @property {string} estimatedTime
 * @property {string} difficulty
 * @property {string[]} tags
 */

/**
 * @typedef {Object} AIShoppingItem
 * @property {string} id
 * @property {string} name
 * @property {string} amount
 * @property {string} category
 * @property {boolean} checked
 */

/**
 * @typedef {Object} AIResponse
 * @property {string} answer
 * @property {AIRecipe[]} recipes
 * @property {AIShoppingItem[]} shoppingList
 * @property {string[]} cookingSteps
 * @property {string} estimatedTime
 * @property {string[]} tips
 */

export function createEmptyAIResponse() {
  return {
    answer: '',
    recipes: [],
    shoppingList: [],
    cookingSteps: [],
    estimatedTime: '',
    tips: [],
  }
}

export function isAIResponse(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.answer === 'string' &&
      Array.isArray(value.recipes) &&
      Array.isArray(value.shoppingList) &&
      Array.isArray(value.cookingSteps) &&
      typeof value.estimatedTime === 'string' &&
      Array.isArray(value.tips),
  )
}

function normalizeStringList(value) {
  if (!Array.isArray(value)) return []
  return value.map((item) => String(item || '').trim()).filter(Boolean)
}

function normalizeRecipe(recipe, index) {
  const source = recipe && typeof recipe === 'object' ? recipe : {}
  return {
    id: String(source.id || `ai-recipe-${index + 1}`),
    title: String(source.title || '未命名菜谱'),
    description: String(source.description || ''),
    ingredients: normalizeStringList(source.ingredients),
    steps: normalizeStringList(source.steps),
    estimatedTime: String(source.estimatedTime || ''),
    difficulty: String(source.difficulty || '新手'),
    tags: normalizeStringList(source.tags),
  }
}

function normalizeShoppingItem(item, index) {
  const source = item && typeof item === 'object' ? item : {}
  return {
    id: String(source.id || `ai-shopping-${index + 1}`),
    name: String(source.name || '未命名食材'),
    amount: String(source.amount || ''),
    category: String(source.category || '食材'),
    checked: Boolean(source.checked),
  }
}

export function normalizeAIResponse(value) {
  const source = value && typeof value === 'object' ? value : {}
  return {
    answer: String(source.answer || ''),
    recipes: Array.isArray(source.recipes) ? source.recipes.map(normalizeRecipe) : [],
    shoppingList: Array.isArray(source.shoppingList) ? source.shoppingList.map(normalizeShoppingItem) : [],
    cookingSteps: normalizeStringList(source.cookingSteps),
    estimatedTime: String(source.estimatedTime || ''),
    tips: normalizeStringList(source.tips),
  }
}
