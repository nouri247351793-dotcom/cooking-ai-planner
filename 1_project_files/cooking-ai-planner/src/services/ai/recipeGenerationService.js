/**
 * Recipe Generation 抽象层（本轮只允许 mock）
 *
 * 统一接口：
 * - generateRecipes(params, config)
 *
 * params：来自页面整理后的统一参数对象（见 homeRecipeAgentService.buildHomeParams）
 * config：模型配置（localStorage 中保存）
 */

import { createLlmProvider } from './llmProvider.js'
import { retrieveCookingKnowledge } from './retrievalService.js'
import { buildRecipePrompt } from './promptBuilder.js'
import { generateHomeRecipesMock } from '../homeRecipeAgentService.js'

export async function generateRecipes(params, config) {
  const provider = createLlmProvider(config)

  if (provider.kind !== 'mock') {
    throw new Error('当前仅支持 mock provider（真实 provider 暂未接入）')
  }

  const inputText = params && params.inputText ? params.inputText : ''
  const filters = params && params.filters ? params.filters : null
  const scene = params && params.scene ? params.scene : ''

  // RAG-ready：本地检索 mock（JSON 语料），不接云端/DB
  const retrieval = await retrieveCookingKnowledge(inputText, { ...(filters || {}), scene })
  const prompt = buildRecipePrompt({ text: inputText, params }, retrieval.docs, config)

  // mock 生成仍使用既有 service（不发起网络请求）
  const res = await generateHomeRecipesMock(params)
  const knowledgeRefs = (retrieval.docs || []).map((d) => ({ id: d.id, title: d.title, category: d.category }))

  if (import.meta && import.meta.env && import.meta.env.DEV) {
    console.log('[ai][mock] generateRecipes debug', {
      aiConfig: config || null,
      retrievalMeta: retrieval.meta,
      knowledgeRefs,
      promptPreview: prompt,
    })
  }

  return {
    recipes: (res.recipes || []).map((r) => ({ ...r, knowledgeRefs: knowledgeRefs.map((x) => x.id) })),
    aiRequestPayload: {
      ...res.aiRequestPayload,
      aiConfigSnapshot: config || null,
      promptPreview: prompt,
      retrievalMeta: retrieval.meta,
      knowledgeRefs,
    },
  }
}
