import { RECIPE_CATALOG } from '../data/recipeCatalog.js'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function pickRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function pickManyRandom(list, count) {
  const copy = list.slice()
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = pickRandomInt(i + 1)
    const t = copy[i]
    copy[i] = copy[j]
    copy[j] = t
  }
  return copy.slice(0, count)
}

export function createDefaultFilters() {
  return {
    durationMax: '30', // minutes
    budget: 'any', // any | low | mid
    equipmentLimit: 'any', // any | microwaveOnly | noOven | noStove | dormPot | airfryer
    servings: '1',
  }
}

export function createEmptyPhotoResult() {
  return {
    status: 'none', // none | uploaded
    fileName: '',
    mimeType: '',
    sizeBytes: 0,
    mockRecognized: {
      ingredients: [],
      confidenceNote: '未接入真实识别，本轮仅做上传占位',
    },
  }
}

export function createPhotoResultFromFile(file) {
  if (!file) return createEmptyPhotoResult()
  return {
    status: 'uploaded',
    fileName: file.name || '',
    mimeType: file.type || 'image/*',
    sizeBytes: file.size || 0,
    mockRecognized: {
      ingredients: [],
      confidenceNote: '未接入真实识别，本轮仅做上传占位',
    },
  }
}

export function buildHomeParams({ inputText, filters, photoResult }) {
  const now = new Date()
  return {
    scene: 'university_cooking_learning_planner',
    inputText: (inputText || '').trim(),
    filters: {
      durationMaxMinutes: Number(filters.durationMax),
      budget: filters.budget,
      equipmentLimit: filters.equipmentLimit,
      servings: Number(filters.servings),
    },
    photo: photoResult,
    meta: {
      createdAt: now.toISOString(),
      locale: 'zh-CN',
    },
  }
}

export function buildAiRequestPayload(params) {
  const ragQuery = [
    params.inputText,
    `时长≤${params.filters.durationMaxMinutes}min`,
    params.filters.budget === 'any' ? '' : `预算:${params.filters.budget}`,
    params.filters.equipmentLimit === 'any' ? '' : `设备限制:${params.filters.equipmentLimit}`,
    `几人份:${params.filters.servings}`,
    params.photo && params.photo.status === 'uploaded' ? `拍照食材:${params.photo.mockRecognized.ingredients.join('、')}` : '',
  ]
    .filter(Boolean)
    .join('；')

  return {
    intent: 'generate_learning_recipe_plan',
    params,
    rag: {
      enabled: false,
      query: ragQuery,
      topK: 5,
      knowledgeBase: 'local-knowledge-mock',
    },
    llm: {
      model: 'mock',
      temperature: 0.7,
    },
    messages: [
      {
        role: 'system',
        content:
          '你是大学生做饭学习规划师：输出适合新手的菜谱建议与练习重点，优先可执行与可复盘。',
      },
      {
        role: 'user',
        content: `我的需求：${params.inputText || '（未填写）'}；筛选：${ragQuery}`,
      },
    ],
  }
}

function applyFilters(recipes, filters) {
  const maxMinutes = filters.durationMaxMinutes || 999
  const servings = filters.servings || 1
  const budget = filters.budget || 'any'
  const limit = filters.equipmentLimit || 'any'

  return recipes.filter((r) => {
    if (r.minutes > maxMinutes) return false
    if (budget !== 'any' && r.budget !== budget) return false
    if (servings && r.servings && r.servings !== servings) return false

    if (limit === 'microwaveOnly') return r.equipment.includes('microwave')
    if (limit === 'dormPot') return r.equipment.includes('pot')
    if (limit === 'airfryer') return true
    if (limit === 'noOven') return !r.equipment.includes('oven')
    if (limit === 'noStove') return !r.equipment.includes('stove')

    return true
  })
}

function createBaseRecipePool() {
  return RECIPE_CATALOG
}

export function getDefaultRecommendedRecipes() {
  return RECIPE_CATALOG.slice(0, 4)
}

export function pickRandomRecipe(list) {
  if (!list || list.length === 0) return null
  return list[pickRandomInt(list.length)]
}

export async function generateHomeRecipesMock(params) {
  const payload = buildAiRequestPayload(params)

  if (params.inputText && /error|报错|崩/.test(params.inputText)) {
    await delay(450)
    const e = new Error('mock: 服务暂时不可用，请稍后重试')
    e.code = 'MOCK_ERROR'
    throw e
  }

  await delay(700)

  const basePool = createBaseRecipePool()
  const filtered = applyFilters(basePool, params.filters)

  if (filtered.length === 0) {
    return { recipes: [], aiRequestPayload: payload }
  }

  const wanted = Math.min(5, Math.max(3, filtered.length >= 5 ? 5 : filtered.length))
  const chosen = pickManyRandom(filtered, wanted)

  return { recipes: chosen, aiRequestPayload: payload }
}
