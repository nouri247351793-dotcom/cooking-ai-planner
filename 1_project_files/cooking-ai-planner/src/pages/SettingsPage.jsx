import { Link } from 'react-router-dom'
import { useAiConfig } from '../hooks/useAiConfig.js'
import { AI_PROVIDERS } from '../services/ai/aiConfigModel.js'

export default function SettingsPage() {
  const { aiConfig, updateAiConfig } = useAiConfig()

  return (
    <section className="page">
      <div className="card">
        <div className="card__title">AI 模型配置（本地保存）</div>
        <p className="muted">
          当前只接入 <b>mock provider</b>；其他 provider 仅做架构占位，不会发起真实请求。
        </p>

        <div className="formGrid">
          <label className="field">
            <div className="field__label">Provider</div>
            <select
              className="select"
              value={aiConfig.provider}
              name="ai_provider"
              onChange={(e) => updateAiConfig({ provider: e.target.value })}
            >
              {AI_PROVIDERS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <div className="field__label">Model name</div>
            <input
              className="input"
              value={aiConfig.model}
              name="ai_model"
              onChange={(e) => updateAiConfig({ model: e.target.value })}
              placeholder="例如：gpt-4.1-mini / deepseek-chat / mock-gpt"
            />
          </label>

          <label className="field">
            <div className="field__label">Temperature</div>
            <input
              className="input"
              inputMode="decimal"
              value={String(aiConfig.temperature)}
              name="ai_temperature"
              onChange={(e) => updateAiConfig({ temperature: e.target.value })}
              placeholder="0.0 ~ 2.0"
            />
          </label>

          <label className="field">
            <div className="field__label">Max tokens</div>
            <input
              className="input"
              inputMode="numeric"
              value={String(aiConfig.maxTokens)}
              name="ai_max_tokens"
              onChange={(e) => updateAiConfig({ maxTokens: e.target.value })}
              placeholder="例如：800"
            />
          </label>

          <label className="field" style={{ gridColumn: '1 / -1' }}>
            <div className="field__label">System Prompt（占位）</div>
            <textarea
              className="textarea"
              rows={4}
              value={aiConfig.systemPrompt}
              name="ai_system_prompt"
              onChange={(e) => updateAiConfig({ systemPrompt: e.target.value })}
              placeholder="后续可在此维护系统提示词模板（本轮仅本地保存，不接真实 LLM）"
            />
          </label>
        </div>

        {aiConfig.provider !== 'mock' ? (
          <div className="notice" style={{ marginTop: 10 }}>
            <div className="notice__title">提示</div>
            <div className="notice__desc">
              你已选择非 mock provider，但本阶段不会真实调用；首页点击“生成菜谱”会提示暂不支持。
            </div>
          </div>
        ) : null}
      </div>

      <div className="card">
        <div className="card__title">导出我的数据（占位入口）</div>
        <p className="muted">当前仅支持导出为本地 JSON（不做云端）。</p>
        <div className="actionsRow">
          <Link to="/favorites" className="ghostBtn">
            去收藏页导出
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card__title">更多入口（v2）</div>
        <p className="muted">用于移动端访问桌面侧边栏里的页面（当前为占位页）。</p>
        <div className="actionsRow">
          <Link to="/recent" className="ghostBtn">
            最近做过
          </Link>
          <Link to="/tips" className="ghostBtn">
            新手贴士
          </Link>
        </div>
      </div>
    </section>
  )
}
