/**
 * LLM Provider 抽象层（本轮仅 mock 可用）
 *
 * 目标：
 * - 把“调用某个模型/供应商”的差异收敛在 provider 内
 * - 上层业务只依赖统一接口，不直接依赖某个 SDK / 某个云端 API
 *
 * 重要约束（本轮硬性）：
 * - 不能发起真实网络请求
 * - openai-compatible / custom 仅保留接口与 TODO
 */

function createNotImplementedProvider(kind) {
  return {
    kind,
    async generateRecipes() {
      throw new Error(`${kind} provider is TODO (this build only allows mock provider)`)
    },
  }
}

export function createLlmProvider(config) {
  const provider = config && config.provider ? config.provider : 'mock'

  if (provider === 'mock') {
    return { kind: 'mock' }
  }

  if (provider === 'openai-compatible') {
    // TODO: implement OpenAI-compatible provider (NO network in this stage)
    return createNotImplementedProvider('openai-compatible')
  }

  if (provider === 'custom') {
    // TODO: implement custom provider adapter (NO network in this stage)
    return createNotImplementedProvider('custom')
  }

  return { kind: 'mock' }
}

