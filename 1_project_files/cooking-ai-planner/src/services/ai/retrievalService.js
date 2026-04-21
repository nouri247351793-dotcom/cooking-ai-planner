/**
 * Retrieval 抽象层（本地检索 mock，RAG-ready）
 *
 * 统一接口：
 * - retrieveCookingKnowledge(query, filters)
 *
 * 约束：
 * - 不接真实数据库/云端知识库
 * - 不发起任何网络请求
 */

import cookingBasics from '../../data/knowledge/cooking_basics.json'
import ingredientTips from '../../data/knowledge/ingredient_tips.json'
import equipmentLimits from '../../data/knowledge/equipment_limits.json'
import budgetRules from '../../data/knowledge/budget_rules.json'

function safeArray(x) {
  return Array.isArray(x) ? x : []
}

function normalizeDoc(raw) {
  const tags = safeArray(raw && raw.tags).map((t) => String(t))
  const scenes = safeArray(raw && raw.applicableScenes).map((s) => String(s))
  return {
    id: raw && raw.id ? String(raw.id) : '',
    title: raw && raw.title ? String(raw.title) : '',
    category: raw && raw.category ? String(raw.category) : '',
    tags,
    content: raw && raw.content ? String(raw.content) : '',
    applicableScenes: scenes.length ? scenes : ['any'],
  }
}

function buildKnowledgeCorpus() {
  const all = [
    ...safeArray(cookingBasics),
    ...safeArray(ingredientTips),
    ...safeArray(equipmentLimits),
    ...safeArray(budgetRules),
  ].map(normalizeDoc)
  return all.filter((d) => d.id && d.title && d.content)
}

const KNOWLEDGE_CORPUS = buildKnowledgeCorpus()

function tokenize(text) {
  const t = (text || '').toLowerCase()
  try {
    const parts = t.match(/[\p{Script=Han}]{2,}|[a-z0-9]+/gu)
    return (parts || []).map((x) => x.trim()).filter(Boolean)
  } catch {
    return t
      .replace(/[^\u4e00-\u9fa5a-z0-9]+/gi, ' ')
      .split(/\s+/)
      .map((x) => x.trim())
      .filter((x) => x.length >= 2)
  }
}

function deriveFilterTags(filters) {
  const f = filters && typeof filters === 'object' ? filters : {}
  const tags = []

  if (f.budget === 'low') tags.push('budget_low')
  if (f.budget === 'mid') tags.push('budget_mid')

  if (f.equipmentLimit === 'microwaveOnly') tags.push('microwave_only')
  if (f.equipmentLimit === 'noOven') tags.push('no_oven')
  if (f.equipmentLimit === 'noStove') tags.push('no_stove')

  if (typeof f.durationMaxMinutes === 'number') {
    if (f.durationMaxMinutes <= 15) tags.push('time_15')
    else if (f.durationMaxMinutes <= 30) tags.push('time_30')
  }

  return tags
}

function isSceneApplicable(doc, scene) {
  const scenes = safeArray(doc && doc.applicableScenes)
  if (!scene) return true
  return scenes.includes('any') || scenes.includes(scene)
}

function scoreDoc(doc, keywords, filterTags) {
  const hay = `${doc.title}\n${doc.content}\n${safeArray(doc.tags).join(' ')}`.toLowerCase()
  let keywordHits = 0
  const hitWords = []

  for (const k of keywords) {
    if (!k) continue
    if (hay.includes(k)) {
      keywordHits += 1
      hitWords.push(k)
    }
  }

  let tagBonus = 0
  const tags = safeArray(doc.tags)
  for (const t of filterTags) {
    if (tags.includes(t)) tagBonus += 1
  }

  return { score: keywordHits * 3 + tagBonus * 2, keywordHits, tagBonus, hitWords }
}

export async function retrieveCookingKnowledge(query, filters) {
  const keywords = tokenize(query)
  const filterTags = deriveFilterTags(filters)
  const scene = filters && typeof filters === 'object' ? filters.scene : ''

  const scored = KNOWLEDGE_CORPUS.filter((d) => isSceneApplicable(d, scene)).map((d) => {
    const s = scoreDoc(d, keywords, filterTags)
    return { doc: d, ...s }
  })

  // 先关键词匹配：优先保留命中关键词的；若没有关键词命中，则使用 filterTags/通用知识兜底
  let candidates = scored
    .filter((x) => x.keywordHits > 0)
    .sort((a, b) => b.score - a.score)

  if (!candidates.length) {
    candidates = scored
      .filter((x) => (filterTags.length ? x.tagBonus > 0 : true))
      .sort((a, b) => b.score - a.score)
  }

  // 再按 tags 与 filters 二次筛选：若有 filterTags，则优先保留有 tagBonus 的，再补齐少量通用
  const picked = []
  const seen = new Set()

  const push = (x) => {
    if (!x) return
    if (seen.has(x.doc.id)) return
    seen.add(x.doc.id)
    picked.push(x)
  }

  if (filterTags.length) {
    for (const x of candidates.filter((x) => x.tagBonus > 0)) push(x)
    for (const x of candidates.filter((x) => x.tagBonus === 0)) push(x)
  } else {
    for (const x of candidates) push(x)
  }

  const top = picked.slice(0, 6).map((x) => ({
    ...x.doc,
    _debug: {
      score: x.score,
      keywordHits: x.keywordHits,
      tagBonus: x.tagBonus,
      hitWords: x.hitWords,
    },
  }))

  return {
    docs: top,
    meta: {
      provider: 'local-json-mock',
      query: query || '',
      keywords,
      filterTags,
      scene: scene || '',
      totalCorpus: KNOWLEDGE_CORPUS.length,
      returned: top.length,
    },
  }
}
