const STEP_IMAGE_CACHE_KEY = 'xiaofanzhuo_step_image_cache_v1'

function safeText(value, fallback = '') {
  return String(value || fallback).trim()
}

function slugify(value) {
  return safeText(value, 'step')
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function readCache() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(STEP_IMAGE_CACHE_KEY) || '{}') || {}
  } catch {
    return {}
  }
}

function writeCache(cache) {
  if (typeof window === 'undefined') return false
  try {
    window.localStorage.setItem(STEP_IMAGE_CACHE_KEY, JSON.stringify(cache))
    return true
  } catch {
    return false
  }
}

export function buildStepImagePrompt(stepText, recipeTitle) {
  return [
    `warm cooking tutorial image for ${safeText(recipeTitle, 'home cooking recipe')}`,
    safeText(stepText, 'simple cooking preparation step'),
    'top view, soft lighting, clean kitchen background, clear beginner-friendly composition, not overly complex',
  ].join(', ')
}

function buildMockStepSvg({ stepText, recipeTitle, stepIndex }) {
  const prompt = buildStepImagePrompt(stepText, recipeTitle)
  const title = safeText(recipeTitle, '小饭桌')
  const stepLabel = `Step ${Number(stepIndex || 0) + 1}`
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
  <text x="48" y="54" fill="#2e1f19" font-family="Arial, sans-serif" font-size="24" font-weight="800">${stepLabel}</text>
  <text x="48" y="320" fill="#6f5b4c" font-family="Arial, sans-serif" font-size="18" font-weight="700">${title.slice(0, 20)}</text>
  <text x="592" y="52" fill="#f29a4a" font-family="Arial, sans-serif" font-size="20" font-weight="800" text-anchor="end">AI mock</text>
  <desc>${prompt}</desc>
</svg>`.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export async function generateStepImage(stepText, recipeTitle, options = {}) {
  const stepIndex = Number(options.stepIndex || 0)
  const cacheKey = `${slugify(recipeTitle)}::${slugify(stepText)}::${stepIndex}`
  const cache = readCache()

  if (cache[cacheKey]) {
    return {
      ...cache[cacheKey],
      fromCache: true,
    }
  }

  const prompt = buildStepImagePrompt(stepText, recipeTitle)
  const result = {
    status: 'mock',
    prompt,
    imageSrc: buildMockStepSvg({ stepText, recipeTitle, stepIndex }),
    createdAt: new Date().toISOString(),
  }

  writeCache({
    ...cache,
    [cacheKey]: result,
  })

  return result
}

export { STEP_IMAGE_CACHE_KEY }
