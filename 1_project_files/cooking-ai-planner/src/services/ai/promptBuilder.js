/**
 * Prompt Builder 抽象层（RAG-ready，占位实现）
 *
 * 统一接口：
 * - buildRecipePrompt(userInput, retrievedDocs, config)
 *
 * 本轮约束：
 * - 不调用真实 LLM；仅负责组织统一 prompt 结构
 */

export function buildRecipePrompt(userInput, retrievedDocs, config) {
  const inputText =
    typeof userInput === 'string'
      ? userInput
      : userInput && typeof userInput === 'object' && typeof userInput.text === 'string'
        ? userInput.text
        : ''

  const params =
    userInput && typeof userInput === 'object' && userInput.params && typeof userInput.params === 'object'
      ? userInput.params
      : null

  const filters = params && params.filters ? params.filters : null

  const sys =
    (config && config.systemPrompt ? String(config.systemPrompt) : '').trim() ||
    '你是大学生做饭学习规划师：输出适合新手的菜谱建议与练习重点，优先可执行与可复盘。'

  const docs = Array.isArray(retrievedDocs) ? retrievedDocs : []
  const docSummary = docs.length
    ? docs
        .slice(0, 6)
        .map((d, idx) => {
          const tags = Array.isArray(d.tags) ? d.tags.slice(0, 6).join(', ') : ''
          const snippet = String(d.content || '').slice(0, 90).replace(/\s+/g, ' ')
          return `${idx + 1}. ${d.title}（${d.category || 'knowledge'}）${tags ? ` [${tags}]` : ''}：${snippet}`
        })
        .join('\n')
    : '（无检索结果：本轮为 RAG-ready 架构占位）'

  const filterText = filters
    ? `- 时长上限: ${filters.durationMaxMinutes ?? ''} min\n- 预算: ${filters.budget ?? ''}\n- 设备限制: ${filters.equipmentLimit ?? ''}\n- 几人份: ${filters.servings ?? ''}`
    : '（无筛选参数）'

  const outputFormat = [
    '输出要求：生成 3~5 个适合大学生新手练习的菜谱建议，JSON 数组，每个对象包含：',
    '- title（菜名）',
    '- minutes（预计时长）',
    '- difficulty（新手/进阶）',
    '- coreIngredients（核心食材，数组）',
    '- steps（步骤数组，每步包含 title/detail/minutes）',
    '- learning（学习规划对象，包含 goal 与 2~4 条 focus）',
    '- knowledgeRefs（引用的知识点 id 数组）',
  ].join('\n')

  return {
    systemPrompt: sys,
    messages: [
      { role: 'system', content: sys },
      {
        role: 'user',
        content: [
          `用户输入：${inputText || '（空）'}`,
          '',
          '筛选参数：',
          filterText,
          '',
          '检索结果摘要（本地知识库）：',
          docSummary,
          '',
          outputFormat,
        ].join('\n'),
      },
    ],
  }
}
