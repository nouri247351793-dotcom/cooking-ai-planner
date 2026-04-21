# Step 08 - ai-core-config（Step Report）

## 本轮目标

- 新增 AI core 配置层（本地保存到 localStorage），并提供 provider 抽象与 service 抽象层占位。
- 新增 `services/ai/` 抽象层：recipe generation / retrieval / prompt builder / provider 选择。
- 当前页面调用只允许 mock provider；真实 provider 不发起任何请求（仅 TODO）。

## 为什么先做 provider 抽象

- 降低耦合：页面与业务层不直接依赖某个 SDK/云端 API；后续换供应商只改 provider 适配层。
- 便于扩展：未来接入 OpenAI-compatible / OpenClaw / 自定义 provider 时，不需要改动页面交互与参数结构。
- 统一接口：把“生成菜谱 / 检索知识 / 构建 prompt”的职责分层，后续可分别演进而不互相牵连。

## 为什么当前阶段不用真 API

- 当前目标是“课堂演示/可迭代架构”，优先保证可运行与可演示，不引入 API key、计费、网络波动与安全合规负担。
- 避免提前绑定：真实 LLM / RAG 接入前，先把参数结构、状态流、接口边界稳定下来。
- 本仓库的 mock 数据与 mock service 已能覆盖主要交互路径（生成、收藏、加入待购、导出）。

## 将来替换真实服务时只需要改哪些文件

- provider 适配（核心改动点）：
  - `1_project_files/cooking-ai-planner/src/services/ai/llmProvider.js:1`
- recipe generation 调用链：
  - `1_project_files/cooking-ai-planner/src/services/ai/recipeGenerationService.js:1`
- retrieval / prompt 工程（可独立演进）：
  - `1_project_files/cooking-ai-planner/src/services/ai/retrievalService.js:1`
  - `1_project_files/cooking-ai-planner/src/services/ai/promptBuilder.js:1`
- 配置模型（字段扩展/校验）：
  - `1_project_files/cooking-ai-planner/src/services/ai/aiConfigModel.js:1`

## 文件级改动

- 新增：
  - `1_project_files/cooking-ai-planner/src/services/ai/aiConfigModel.js`
  - `1_project_files/cooking-ai-planner/src/services/ai/llmProvider.js`
  - `1_project_files/cooking-ai-planner/src/services/ai/recipeGenerationService.js`
  - `1_project_files/cooking-ai-planner/src/services/ai/retrievalService.js`
  - `1_project_files/cooking-ai-planner/src/services/ai/promptBuilder.js`
  - `1_project_files/cooking-ai-planner/src/hooks/useAiConfig.js`
  - `2_coding_documentation/01_prompt_logs/step-08-ai-core-config.md`
- 修改：
  - `1_project_files/cooking-ai-planner/src/store/storageKeys.js`
  - `1_project_files/cooking-ai-planner/src/store/appData.js`
  - `1_project_files/cooking-ai-planner/src/pages/SettingsPage.jsx`

## 代码级改动

- AI 配置持久化：
  - localStorage key：`cooking_ai_planner.ai.config.v1`
  - Provider 内通过 `normalizeAiConfig()` 兜底字段与类型，避免旧值/脏值导致报错。
- 生成调用改造：
  - 首页生成从“直接调用 mock service”切换为 `services/ai/recipeGenerationService.generateRecipes(params, config)`。
  - 当前只允许 `mock` provider，非 mock 会抛出“暂不支持”错误（不发起网络请求）。
- SettingsPage：
  - 可编辑 provider / model / temperature / maxTokens / systemPrompt，并即时保存到 localStorage。

## 模块职责说明图（Mermaid）

```mermaid
flowchart TD
  UI[Pages: Home/RecipeDetail/Settings] -->|hooks| Store[AppDataProvider (Context)]
  UI -->|only for config edit| Settings[SettingsPage]
  Settings -->|update| Store

  Store -->|aiConfig| AIGen[services/ai/recipeGenerationService.generateRecipes]
  AIGen --> ProvSel[services/ai/llmProvider.createLlmProvider]
  AIGen --> Ret[services/ai/retrievalService.retrieveCookingKnowledge]
  AIGen --> Prompt[services/ai/promptBuilder.buildRecipePrompt]
  AIGen --> MockSvc[services/homeRecipeAgentService.generateHomeRecipesMock]

  ProvSel --> Mock[mock provider ✅]
  ProvSel --> OpenAI[openai-compatible TODO]
  ProvSel --> Custom[custom TODO]
```

## 自测结果（本轮最小验证）

- [x] `npm run build` 通过
- [x] dev server 可启动且 `#/settings` 可访问（HTTP 200）
- [ ] 手动回归：选择非 mock provider 后在首页点击“生成菜谱”能看到错误提示（不阻塞运行）

## 已知问题 / 风险

- 设置页允许选择非 mock provider：当前会导致首页生成报错（符合“只允许 mock”的要求，但需要用户理解）。
- 若未来接入真实 provider，需要补齐：鉴权（key 管理）、请求限流、错误分类与重试策略。

## 下一轮建议

- 在首页对“非 mock provider”增加更明确的引导（例如按钮禁用/提示文案），避免用户误以为已接入真实模型。
- 逐步补齐 retrieval 的本地 mock 文档结构（用于 Step 08 的 RAG-ready 演示）。

