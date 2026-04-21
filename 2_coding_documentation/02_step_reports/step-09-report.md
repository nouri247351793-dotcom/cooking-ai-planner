# Step 09 - rag-ready-local-retrieval（Step Report）

## 本轮目标

- 建立本地知识库 mock（JSON 语料），实现本地检索与 Prompt 组装链路，形成 RAG-ready 架构占位。
- `generateRecipes()` 仍只走 mock 生成，但能体现“参考了哪些知识点”，并在开发模式输出调试信息。

## 这不是完整 RAG，只是 RAG-ready 架构

- 当前检索仅在前端本地 JSON 做关键词/标签/筛选条件的粗检索，没有向量索引、重排序、召回评估，也没有文档更新/权限/版本管理。
- PromptBuilder 只负责把输入/筛选/检索摘要/输出格式组织成统一结构；并不会触发真实 LLM 调用。
- 目标是把“接口边界与数据流”固定下来：未来接入真实 RAG 时，替换检索实现即可，不需要重写页面。

## 为什么这样做适合课堂 MVP

- 可控：不依赖网络、不需要数据库、不需要 API key，课堂演示稳定可复现。
- 可讲：能清晰展示 RAG 的核心链路（Query → Retrieval → Prompt → Generation），但实现成本低。
- 可迭代：后续引入向量库/云端知识库时，只动少数模块，减少推倒重来。

## 真实 RAG 上线时需替换哪些模块

- 检索层（核心替换点）：
  - `1_project_files/cooking-ai-planner/src/services/ai/retrievalService.js:1`
- 知识库数据源（由本地 JSON → 向量库/文档库）：
  - `1_project_files/cooking-ai-planner/src/data/knowledge/cooking_basics.json:1` 等（将被替换为外部数据源或构建产物）
- Prompt 工程（可增强但接口不变）：
  - `1_project_files/cooking-ai-planner/src/services/ai/promptBuilder.js:1`
- 生成服务（接入真实 provider 时扩展）：
  - `1_project_files/cooking-ai-planner/src/services/ai/recipeGenerationService.js:1`
  - `1_project_files/cooking-ai-planner/src/services/ai/llmProvider.js:1`

## 文件级改动

- 新增本地知识库：
  - `1_project_files/cooking-ai-planner/src/data/knowledge/cooking_basics.json`
  - `1_project_files/cooking-ai-planner/src/data/knowledge/ingredient_tips.json`
  - `1_project_files/cooking-ai-planner/src/data/knowledge/equipment_limits.json`
  - `1_project_files/cooking-ai-planner/src/data/knowledge/budget_rules.json`
- 修改 AI 抽象层：
  - `1_project_files/cooking-ai-planner/src/services/ai/retrievalService.js`
  - `1_project_files/cooking-ai-planner/src/services/ai/promptBuilder.js`
  - `1_project_files/cooking-ai-planner/src/services/ai/recipeGenerationService.js`
- 新增文档：
  - `2_coding_documentation/01_prompt_logs/step-09-rag-ready-local-retrieval.md`
  - `2_coding_documentation/02_step_reports/step-09-report.md`

## 代码级改动

- 本地检索（retrievalService）：
  - 先关键词匹配（title/content/tags），再根据 filters 派生 tag（如 `budget_low` / `microwave_only` / `time_15`）做二次筛选与排序。
  - 支持 `applicableScenes`（含 `any` 或匹配场景才返回）。
- PromptBuilder：
  - 统一组织：用户输入 + 筛选参数 + 检索结果摘要 + 输出格式要求（JSON schema 方向）。
- generateRecipes（mock-only）：
  - 仍用 `generateHomeRecipesMock()` 输出菜谱；
  - 在返回中附加 `knowledgeRefs`（引用知识点 id），并写入 `aiRequestPayload.knowledgeRefs`；
  - 开发模式 `console.debug` 输出调试信息（检索 meta / promptPreview / knowledgeRefs）。

## 自测结果

- [x] `npm run build` 通过
- [x] dev server 可启动且首页可访问（HTTP 200）
- [ ] 手动：在首页点“生成菜谱”，观察控制台输出 `[ai][mock] generateRecipes debug`，确认 `knowledgeRefs` 非空且随输入/筛选变化

