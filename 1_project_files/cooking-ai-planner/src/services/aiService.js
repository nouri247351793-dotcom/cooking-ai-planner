import mockAIResponse from '../data/mockAIResponse.js'
import { isAIResponse, normalizeAIResponse } from './aiTypes.js'

export const AI_API_ENDPOINT = '/api/ai'
export const MIN_AI_REQUEST_TIMEOUT_MS = 60000
export const AI_REQUEST_TIMEOUT_MS = 60000

function logAIRequestFailure(reason, extra = {}) {
  console.error('[xiaofanzhuo ai] client request failed', {
    reason: reason || 'unknown',
    endpoint: extra.endpoint || AI_API_ENDPOINT,
    status: extra.status || 'n/a',
    responseText: extra.responseText || '',
    errorMessage: extra.error && extra.error.message ? extra.error.message : extra.error ? String(extra.error) : '',
  })
}

function buildFallbackResponse(reason) {
  return {
    ...normalizeAIResponse(mockAIResponse),
    demoMode: true,
    source: 'mock',
    fallbackReason: reason || 'unknown',
    debugMessage: '真实 AI 请求失败，已回退演示数据，请查看 Vercel Logs',
  }
}

function pickResponsePayload(data) {
  if (!data || typeof data !== 'object') return data
  if (data.aiResponse && typeof data.aiResponse === 'object') return data.aiResponse
  if (data.data && typeof data.data === 'object') return data.data
  if (data.result && typeof data.result === 'object') return data.result
  return data
}

function getResponseMeta(data, payload) {
  return {
    demoMode: Boolean((data && data.demoMode) || (payload && payload.demoMode)),
    source: (data && data.source) || (payload && payload.source) || 'api',
    fallbackReason: (data && data.fallbackReason) || (payload && payload.fallbackReason) || '',
    debugMessage: (data && data.debugMessage) || (payload && payload.debugMessage) || '',
  }
}

export async function askAI(userMessage, context = {}, options = {}) {
  if (typeof fetch !== 'function') {
    return buildFallbackResponse('fetch_unavailable')
  }

  const endpoint = options.endpoint || AI_API_ENDPOINT
  const requestedTimeoutMs = Number(options.timeoutMs || AI_REQUEST_TIMEOUT_MS)
  const timeoutMs = Math.max(requestedTimeoutMs, MIN_AI_REQUEST_TIMEOUT_MS)
  const safeContext = context && typeof context === 'object' ? context : {}
  const safeMessage = String(userMessage || '').trim()

  const controller = typeof AbortController === 'function' ? new AbortController() : null
  const timeoutId =
    controller && timeoutMs > 0
      ? globalThis.setTimeout(() => {
          controller.abort()
        }, timeoutMs)
      : null

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage: safeMessage,
        context: safeContext,
      }),
      signal: controller ? controller.signal : undefined,
    })

    if (!response.ok) {
      let responseText = ''
      try {
        responseText = await response.text()
      } catch {
        responseText = ''
      }
      logAIRequestFailure(`http_${response.status}`, { endpoint, status: response.status, responseText })
      return buildFallbackResponse(`http_${response.status}`)
    }

    let data = null
    try {
      data = await response.json()
    } catch (error) {
      logAIRequestFailure('invalid_json', { endpoint, error })
      return buildFallbackResponse('invalid_json')
    }

    const payload = pickResponsePayload(data)
    if (!isAIResponse(payload)) {
      logAIRequestFailure('invalid_response_shape', {
        endpoint,
        responseText: JSON.stringify(data),
      })
      return buildFallbackResponse('invalid_response_shape')
    }

    return {
      ...normalizeAIResponse(payload),
      ...getResponseMeta(data, payload),
    }
  } catch (error) {
    const reason = error && error.name === 'AbortError' ? 'timeout' : 'request_failed'
    logAIRequestFailure(reason, { endpoint, error })
    return buildFallbackResponse(reason)
  } finally {
    if (timeoutId) globalThis.clearTimeout(timeoutId)
  }
}

export function getMockAIResponse(reason) {
  return buildFallbackResponse(reason || 'manual_mock')
}
