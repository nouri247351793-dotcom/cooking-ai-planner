const DEFAULT_IMAGE_BASE_URL = 'https://api.siliconflow.cn/v1'
const DEFAULT_IMAGE_MODEL = 'Qwen/Qwen-Image'
const IMAGE_TIMEOUT_MS = 60000
const LOG_TEXT_LIMIT = 4000

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

function normalizeBaseUrl(value) {
  return String(value || DEFAULT_IMAGE_BASE_URL).replace(/\/+$/, '')
}

function limitLogText(text) {
  const raw = String(text || '')
  if (raw.length <= LOG_TEXT_LIMIT) return raw
  return `${raw.slice(0, LOG_TEXT_LIMIT)}... [truncated ${raw.length - LOG_TEXT_LIMIT} chars]`
}

function parseRequestBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  if (typeof req.body === 'object') return req.body
  return {}
}

function asText(value, fallback = '') {
  return String(value || fallback).trim()
}

function asList(value) {
  if (!Array.isArray(value)) return []
  return value.map((item) => asText(item)).filter(Boolean)
}

function buildImagePrompt({ type, recipeTitle, coreIngredients, stepText, steps, stepIndex }) {
  const title = asText(recipeTitle, '小饭桌家常菜')
  const ingredients = asList(coreIngredients).slice(0, 8).join('、') || '常见家常食材'
  const step = asText(stepText)
  const stepList = asList(steps).slice(0, 6).join('；')

  if (type === 'step') {
    return [
      '新手友好的做饭步骤辅助图，真实食物摄影风格，暖色自然光，干净厨房或餐桌背景，不要文字，不要水印',
      `菜名：${title}`,
      `核心食材：${ingredients}`,
      `当前步骤：${step || `第 ${Number(stepIndex || 0) + 1} 步`}`,
      '画面重点展示这一步的操作状态，构图清晰，适合大学生照着做饭',
    ].join('。')
  }

  return [
    '一张适合菜谱封面的家常菜成品图，真实食物摄影风格，暖色自然光，干净餐桌背景，不要文字，不要水印',
    `菜名：${title}`,
    `核心食材：${ingredients}`,
    stepList ? `参考做法：${stepList}` : '',
    '画面干净、有食欲、适合小饭桌做饭应用展示',
  ]
    .filter(Boolean)
    .join('。')
}

function extractImageSrc(data) {
  const first = data && Array.isArray(data.data) ? data.data[0] : null
  const image = first || (data && Array.isArray(data.images) ? data.images[0] : null)
  if (!image) return ''
  if (typeof image === 'string') return image
  if (image.url) return String(image.url)
  if (image.b64_json) return `data:image/png;base64,${image.b64_json}`
  if (image.base64) return `data:image/png;base64,${image.base64}`
  return ''
}

async function requestSiliconFlowImage({ apiKey, model, baseUrl, prompt }) {
  const controller = typeof AbortController === 'function' ? new AbortController() : null
  const timeoutId =
    controller && IMAGE_TIMEOUT_MS > 0
      ? setTimeout(() => {
          controller.abort()
        }, IMAGE_TIMEOUT_MS)
      : null

  let response
  try {
    response = await fetch(`${normalizeBaseUrl(baseUrl)}/images/generations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || DEFAULT_IMAGE_MODEL,
        prompt,
        image_size: '1024x1024',
        batch_size: 1,
        num_inference_steps: 20,
        guidance_scale: 7.5,
      }),
      signal: controller ? controller.signal : undefined,
    })
  } catch (error) {
    console.error('[AI IMAGE ERROR] request failed', {
      message: error.message,
      stack: error.stack,
      model,
      baseUrl: normalizeBaseUrl(baseUrl),
    })
    return {
      ok: false,
      status: error && error.name === 'AbortError' ? 504 : 502,
      statusText: error && error.name === 'AbortError' ? 'Image generation timed out' : 'Image generation request failed',
      reason: error && error.name === 'AbortError' ? 'image_timeout' : 'image_request_failed',
      error,
    }
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }

  console.log('[AI IMAGE DEBUG] upstream status', response.status)

  let responseText = ''
  try {
    responseText = await response.text()
  } catch (error) {
    console.error('[AI IMAGE ERROR] response read failed', {
      message: error.message,
      stack: error.stack,
    })
    return {
      ok: false,
      status: 502,
      statusText: 'Image response text could not be read',
      reason: 'image_response_read_failed',
      error,
    }
  }

  if (!response.ok) {
    console.error('[AI IMAGE ERROR] upstream failed', {
      status: response.status,
      statusText: response.statusText,
      body: limitLogText(responseText),
    })
    return {
      ok: false,
      status: response.status,
      statusText: response.statusText || 'Image generation failed',
      reason: 'image_upstream_failed',
      responseText,
    }
  }

  let data
  try {
    data = JSON.parse(responseText)
  } catch (error) {
    console.error('[AI IMAGE ERROR] JSON parse failed', {
      rawContent: limitLogText(responseText),
      error: error.message,
    })
    return {
      ok: false,
      status: 502,
      statusText: 'Image provider returned invalid JSON',
      reason: 'image_invalid_json',
      responseText,
      error,
    }
  }

  const imageSrc = extractImageSrc(data)
  if (!imageSrc) {
    console.error('[AI IMAGE ERROR] missing image url', {
      body: limitLogText(responseText),
    })
    return {
      ok: false,
      status: 502,
      statusText: 'Image provider returned no image',
      reason: 'image_missing_url',
      responseText,
    }
  }

  return {
    ok: true,
    imageSrc,
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    sendJson(res, 200, { ok: true })
    return
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: { code: 'METHOD_NOT_ALLOWED', message: 'Only POST requests are allowed.' } })
    return
  }

  const body = parseRequestBody(req)
  const apiKey = process.env.AI_API_KEY
  const model = process.env.IMAGE_MODEL || DEFAULT_IMAGE_MODEL
  const baseUrl = process.env.IMAGE_BASE_URL || DEFAULT_IMAGE_BASE_URL
  const prompt = buildImagePrompt(body)

  console.log('[AI IMAGE DEBUG] env check', {
    hasApiKey: Boolean(apiKey),
    apiKeyPreview: apiKey ? `${apiKey.slice(0, 6)}...${apiKey.slice(-4)}` : 'missing',
    model,
    baseUrl: normalizeBaseUrl(baseUrl),
    timeoutMs: IMAGE_TIMEOUT_MS,
  })

  if (!apiKey) {
    sendJson(res, 200, {
      ok: false,
      source: 'mock',
      fallbackReason: 'missing_api_key',
      debugMessage: '图片生成 API Key 缺失，已保留 mock 占位图。',
      prompt,
    })
    return
  }

  const result = await requestSiliconFlowImage({ apiKey, model, baseUrl, prompt })
  if (!result.ok) {
    sendJson(res, 200, {
      ok: false,
      source: 'mock',
      fallbackReason: result.reason || 'image_generation_failed',
      debugMessage: '图片生成失败，已保留 mock 占位图，请查看 Vercel Logs。',
      prompt,
      error: {
        status: result.status,
        message: result.statusText,
      },
    })
    return
  }

  sendJson(res, 200, {
    ok: true,
    source: 'ai_image',
    imageSrc: result.imageSrc,
    prompt,
    model,
    createdAt: new Date().toISOString(),
  })
}
