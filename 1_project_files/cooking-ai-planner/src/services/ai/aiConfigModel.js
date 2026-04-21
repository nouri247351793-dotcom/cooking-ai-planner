export const AI_PROVIDERS = [
  { key: 'mock', label: 'mock（本地）' },
  { key: 'openai-compatible', label: 'openai-compatible（占位）' },
  { key: 'custom', label: 'custom（占位）' },
]

export function createDefaultAiConfig() {
  return {
    version: 1,
    provider: 'mock', // mock | openai-compatible | custom
    model: 'mock-gpt',
    temperature: 0.7,
    maxTokens: 800,
    systemPrompt: '',
  }
}

export function normalizeAiConfig(raw) {
  const base = createDefaultAiConfig()
  if (!raw || typeof raw !== 'object') return base

  const provider =
    raw.provider === 'mock' || raw.provider === 'openai-compatible' || raw.provider === 'custom'
      ? raw.provider
      : base.provider

  const temperatureNum = Number(raw.temperature)
  const maxTokensNum = Number(raw.maxTokens)

  return {
    version: 1,
    provider,
    model: typeof raw.model === 'string' ? raw.model : base.model,
    temperature: Number.isFinite(temperatureNum) ? temperatureNum : base.temperature,
    maxTokens: Number.isFinite(maxTokensNum) ? Math.max(1, Math.floor(maxTokensNum)) : base.maxTokens,
    systemPrompt: typeof raw.systemPrompt === 'string' ? raw.systemPrompt : base.systemPrompt,
  }
}

