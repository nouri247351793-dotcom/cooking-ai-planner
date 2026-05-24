import mockAIResponse from '../src/data/mockAIResponse.js'
import { isAIResponse, normalizeAIResponse } from '../src/services/aiTypes.js'

const DEFAULT_BASE_URL = 'https://api.openai.com/v1'
const DEFAULT_MODEL = 'gpt-4o-mini'
const DEFAULT_PROVIDER_TIMEOUT_MS = 15000

const AI_RESPONSE_JSON_SCHEMA_DESCRIPTION = `
{
  "answer": "string",
  "recipes": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "ingredients": ["string"],
      "steps": ["string"],
      "estimatedTime": "string",
      "difficulty": "string",
      "tags": ["string"]
    }
  ],
  "shoppingList": [
    {
      "id": "string",
      "name": "string",
      "amount": "string",
      "category": "string",
      "checked": false
    }
  ],
  "cookingSteps": ["string"],
  "estimatedTime": "string",
  "tips": ["string"]
}
`

const XIAOFANZHUO_SYSTEM_PROMPT = `
你是“小饭桌”的大学生做饭规划助手。

用户场景：
- 用户可能预算有限、时间有限、厨具有限。
- 用户可能在宿舍、出租屋或普通家庭厨房做饭。
- 目标是生成省钱、省时间、容易执行的新手做饭方案。

你必须根据用户输入和 context 综合判断：
- 已有食材
- 人数
- 预算
- 可用时间
- 口味偏好
- 忌口
- 厨具条件
- 用户输入内容

输出要求：
1. 只能输出一个合法 JSON 对象。
2. 不要输出 Markdown。
3. 不要输出解释性前后缀。
4. 不要使用代码块。
5. JSON 必须完全符合以下结构：
${AI_RESPONSE_JSON_SCHEMA_DESCRIPTION}
6. recipes 至少给出 1 道菜，优先给 2-3 道可搭配方案。
7. 推荐菜谱必须适合大学生宿舍或普通厨房场景。
8. 优先省钱、省时间、易操作，不推荐成本过高或步骤复杂的菜。
9. 如果用户输入信息不足，也要生成合理默认方案。
10. shoppingList 的 checked 必须为 false。
11. shoppingList 的 category 建议使用“食材”“调味”“主食”“厨具”之一。
12. recipes 的 ingredients 和 steps 必须是字符串数组，不要返回对象数组。
13. cookingSteps 应该是整套做饭顺序，不只是单道菜步骤。
14. tips 给 2-4 条，优先提醒省钱、替换食材、厨具限制和新手避坑。
15. 不要添加 schema 之外的字段。
16. 所有文本字段使用中文，语气自然、直接、可执行。
`

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

function buildMockResponse(reason, extra = {}) {
  return {
    ...normalizeAIResponse(mockAIResponse),
    demoMode: true,
    source: 'mock',
    fallbackReason: reason,
    ...extra,
  }
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

function normalizeBaseUrl(value) {
  return String(value || DEFAULT_BASE_URL).replace(/\/+$/, '')
}

function extractJsonText(text) {
  const raw = String(text || '').trim()
  if (!raw) return ''
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenced && fenced[1]) return fenced[1].trim()
  const first = raw.indexOf('{')
  const last = raw.lastIndexOf('}')
  if (first >= 0 && last > first) return raw.slice(first, last + 1)
  return raw
}

function parseAIContent(text) {
  const jsonText = extractJsonText(text)
  if (!jsonText) return null
  try {
    return JSON.parse(jsonText)
  } catch {
    return null
  }
}

function buildUserPrompt(userMessage, context) {
  const safeContext = context && typeof context === 'object' ? context : {}
  return [
    '请根据以下用户需求和上下文，生成“小饭桌”做饭规划 JSON。',
    '',
    `用户输入：${String(userMessage || '').trim() || '用户没有补充具体要求，请生成一套默认的新手友好方案。'}`,
    '',
    '上下文 JSON：',
    JSON.stringify(safeContext, null, 2),
    '',
    '请重点考虑：已有食材、人数、预算、可用时间、口味偏好、忌口、厨具条件。',
    '如果某些信息缺失，请合理假设为：1 人份、30 分钟内、低预算、普通锅/平底锅或电煮锅可完成。',
  ].join('\n')
}

function buildMessages(userMessage, context) {
  return [
    {
      role: 'system',
      content: XIAOFANZHUO_SYSTEM_PROMPT,
    },
    {
      role: 'user',
      content: buildUserPrompt(userMessage, context),
    },
  ]
}

async function requestAIProvider({ apiKey, model, baseUrl, userMessage, context }) {
  const controller = typeof AbortController === 'function' ? new AbortController() : null
  const timeoutId = controller
    ? setTimeout(() => {
        controller.abort()
      }, DEFAULT_PROVIDER_TIMEOUT_MS)
    : null

  let response
  try {
    response = await fetch(`${normalizeBaseUrl(baseUrl)}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model || DEFAULT_MODEL,
        messages: buildMessages(userMessage, context),
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
      signal: controller ? controller.signal : undefined,
    })
  } catch (error) {
    return {
      ok: false,
      status: error && error.name === 'AbortError' ? 504 : 502,
      statusText: error && error.name === 'AbortError' ? 'AI provider request timed out' : 'AI provider request failed',
      reason: error && error.name === 'AbortError' ? 'provider_timeout' : 'provider_exception',
    }
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      statusText: response.statusText || 'AI provider request failed',
    }
  }

  let data
  try {
    data = await response.json()
  } catch {
    return {
      ok: false,
      status: 502,
      statusText: 'AI provider returned invalid JSON',
      reason: 'invalid_provider_json',
    }
  }
  const content = data && data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : ''
  const parsed = parseAIContent(content)

  if (!isAIResponse(parsed)) {
    return {
      ok: false,
      status: 502,
      statusText: 'AI provider returned invalid JSON shape',
      reason: 'invalid_response_shape',
    }
  }

  return {
    ok: true,
    data: normalizeAIResponse(parsed),
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
  const userMessage = body.userMessage || ''
  const context = body.context && typeof body.context === 'object' ? body.context : {}
  const apiKey = process.env.AI_API_KEY
  const model = process.env.AI_MODEL || DEFAULT_MODEL
  const baseUrl = process.env.AI_BASE_URL || DEFAULT_BASE_URL

  if (!apiKey) {
    sendJson(res, 200, buildMockResponse('missing_api_key'))
    return
  }

  try {
    const result = await requestAIProvider({ apiKey, model, baseUrl, userMessage, context })
    if (!result.ok) {
      sendJson(
        res,
        200,
        buildMockResponse(result.reason || 'provider_request_failed', {
          error: {
            code: 'AI_PROVIDER_FAILED',
            status: result.status,
            message: result.statusText,
          },
        }),
      )
      return
    }

    sendJson(res, 200, {
      ...result.data,
      demoMode: false,
      source: 'ai',
    })
  } catch {
    sendJson(
      res,
      200,
      buildMockResponse('provider_exception', {
        error: {
          code: 'AI_PROVIDER_EXCEPTION',
          message: 'AI request failed and mock data was returned.',
        },
      }),
    )
  }
}
