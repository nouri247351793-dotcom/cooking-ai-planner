export const AI_RECIPE_IMAGE_CACHE_KEY = 'xiaofanzhuo_ai_recipe_images'
export const STEP_IMAGE_CACHE_KEY = AI_RECIPE_IMAGE_CACHE_KEY

const IMAGE_API_ENDPOINT = '/api/image'
const IMAGE_CACHE_TTL_MS = 50 * 60 * 1000

function safeText(value, fallback = '') {
  return String(value || fallback).trim()
}

function normalizeTextList(input) {
  if (!Array.isArray(input)) return []
  return input.map((item) => safeText(item)).filter(Boolean)
}

function slugify(value) {
  return safeText(value, 'recipe-image')
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function readCache() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(AI_RECIPE_IMAGE_CACHE_KEY) || '{}') || {}
  } catch {
    return {}
  }
}

function writeCache(cache) {
  if (typeof window === 'undefined') return false
  try {
    window.localStorage.setItem(AI_RECIPE_IMAGE_CACHE_KEY, JSON.stringify(cache))
    return true
  } catch {
    return false
  }
}

function isFreshCacheItem(item) {
  if (!item || !item.imageSrc) return false
  if (!item.expiresAt) return true
  return Date.parse(item.expiresAt) > Date.now()
}

function buildCacheKey(type, recipeTitle, detail = '') {
  return `${type}::${slugify(recipeTitle)}::${slugify(detail)}`
}

export function buildStepImagePrompt(stepText, recipeTitle, options = {}) {
  const ingredients = normalizeTextList(options.coreIngredients).slice(0, 8).join('、') || '常见家常食材'
  return [
    `新手友好的做饭步骤辅助图，菜名：${safeText(recipeTitle, '小饭桌家常菜')}`,
    `核心食材：${ingredients}`,
    `当前步骤：${safeText(stepText, '简单做饭步骤')}`,
    '真实食物摄影风格，暖色自然光，干净厨房背景，构图清晰，不要文字，不要水印',
  ].join('。')
}

export function buildCoverImagePrompt(recipe) {
  const title = safeText(recipe?.title, '小饭桌家常菜')
  const ingredients = normalizeTextList(recipe?.coreIngredients).slice(0, 8).join('、') || '常见家常食材'
  const steps = normalizeTextList((recipe?.steps || []).map((step) => step?.detail || step?.title)).slice(0, 5).join('；')
  return [
    `一张适合菜谱封面的家常菜成品图，菜名：${title}`,
    `核心食材：${ingredients}`,
    steps ? `参考做法：${steps}` : '',
    '真实食物摄影风格，暖色自然光，干净餐桌背景，有食欲，不要文字，不要水印',
  ]
    .filter(Boolean)
    .join('。')
}

function buildMockSvg({ label, title, detail, prompt }) {
  const safeTitle = safeText(title, '小饭桌').slice(0, 20)
  const safeDetail = safeText(detail, 'AI image placeholder').slice(0, 28)
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff7ec"/>
      <stop offset="58%" stop-color="#f3e7d5"/>
      <stop offset="100%" stop-color="#f8d8bb"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#9a5a2a" flood-opacity=".18"/>
    </filter>
  </defs>
  <rect width="640" height="360" rx="36" fill="url(#bg)"/>
  <circle cx="112" cy="94" r="48" fill="#fffaf2" opacity=".85"/>
  <circle cx="520" cy="270" r="72" fill="#ffffff" opacity=".38"/>
  <g filter="url(#shadow)">
    <rect x="190" y="96" width="260" height="164" rx="28" fill="#fffaf4"/>
    <ellipse cx="320" cy="178" rx="92" ry="58" fill="#f29a4a" opacity=".18"/>
    <circle cx="284" cy="176" r="34" fill="#ffcf8b"/>
    <circle cx="350" cy="176" r="42" fill="#f45d34" opacity=".72"/>
    <path d="M246 234 C304 210, 356 210, 406 234" fill="none" stroke="#7b4b2a" stroke-width="9" stroke-linecap="round" opacity=".24"/>
  </g>
  <text x="48" y="54" fill="#2e1f19" font-family="Arial, sans-serif" font-size="24" font-weight="800">${label}</text>
  <text x="48" y="304" fill="#6f5b4c" font-family="Arial, sans-serif" font-size="18" font-weight="800">${safeTitle}</text>
  <text x="48" y="330" fill="#8a7464" font-family="Arial, sans-serif" font-size="14" font-weight="700">${safeDetail}</text>
  <text x="592" y="52" fill="#f29a4a" font-family="Arial, sans-serif" font-size="20" font-weight="800" text-anchor="end">AI mock</text>
  <desc>${prompt}</desc>
</svg>`.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

async function requestImage(payload) {
  const response = await fetch(IMAGE_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    return { ok: false, fallbackReason: `http_${response.status}` }
  }

  const data = await response.json()
  if (!data || !data.ok || !data.imageSrc) {
    return {
      ok: false,
      fallbackReason: data?.fallbackReason || 'image_generation_failed',
      prompt: data?.prompt || '',
      debugMessage: data?.debugMessage || '',
    }
  }

  return data
}

function buildMockResult({ type, title, detail, prompt, fallbackReason = 'mock' }) {
  return {
    status: 'mock',
    source: 'mock',
    fallbackReason,
    prompt,
    imageSrc: buildMockSvg({
      label: type === 'cover' ? 'Cover' : 'Step',
      title,
      detail,
      prompt,
    }),
    createdAt: new Date().toISOString(),
  }
}

async function generateRecipeImage(payload, cacheKey, mockMeta) {
  const cache = readCache()
  if (isFreshCacheItem(cache[cacheKey])) {
    return {
      ...cache[cacheKey],
      fromCache: true,
    }
  }

  try {
    const result = await requestImage(payload)
    if (!result.ok) {
      return buildMockResult({
        ...mockMeta,
        prompt: result.prompt || mockMeta.prompt,
        fallbackReason: result.fallbackReason,
      })
    }

    const cached = {
      status: 'ai',
      source: result.source || 'ai_image',
      imageSrc: result.imageSrc,
      prompt: result.prompt || mockMeta.prompt,
      model: result.model || '',
      createdAt: result.createdAt || new Date().toISOString(),
      expiresAt: new Date(Date.now() + IMAGE_CACHE_TTL_MS).toISOString(),
    }

    writeCache({
      ...cache,
      [cacheKey]: cached,
    })

    return cached
  } catch (error) {
    console.error('[xiaofanzhuo image] client request failed', {
      message: error.message,
    })
    return buildMockResult({
      ...mockMeta,
      fallbackReason: 'image_request_failed',
    })
  }
}

export async function generateRecipeCoverImage(recipe) {
  const title = safeText(recipe?.title, '小饭桌家常菜')
  const coreIngredients = normalizeTextList(recipe?.coreIngredients)
  const steps = normalizeTextList((recipe?.steps || []).map((step) => step?.detail || step?.title))
  const prompt = buildCoverImagePrompt(recipe)
  const cacheKey = buildCacheKey('cover', recipe?.id || title, title)

  return generateRecipeImage(
    {
      type: 'cover',
      recipeTitle: title,
      coreIngredients,
      steps,
    },
    cacheKey,
    {
      type: 'cover',
      title,
      detail: coreIngredients.join('、'),
      prompt,
    },
  )
}

export async function generateStepImage(stepText, recipeTitle, options = {}) {
  const stepIndex = Number(options.stepIndex || 0)
  const coreIngredients = normalizeTextList(options.coreIngredients)
  const stepDetail = safeText(stepText, `步骤 ${stepIndex + 1}`)
  const prompt = buildStepImagePrompt(stepDetail, recipeTitle, { coreIngredients })
  const cacheKey = buildCacheKey('step', recipeTitle, `${stepIndex}-${stepDetail}`)

  return generateRecipeImage(
    {
      type: 'step',
      recipeTitle,
      coreIngredients,
      stepText: stepDetail,
      stepIndex,
    },
    cacheKey,
    {
      type: 'step',
      title: recipeTitle,
      detail: stepDetail,
      prompt,
    },
  )
}
