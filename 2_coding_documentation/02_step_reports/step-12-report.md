# Step 12 - project-check（Step Report）

## 本轮目标

- 以“前端开发 + 测试同事”视角做全项目健康检查（功能/样式/持久化/AI mock 链路/RAG-ready 链路）。
- 发现问题优先做最小修复，并同步记录到 issue log 与本 step report。

## 本轮执行的检查项

- 文件树盘点（src 与 2_coding_documentation）
- 路由/页面可达性检查
- `npm run lint` / `npm run build` 回归
- localStorage key 与数据形态检查（基于 `storageKeys.js` 与 Provider）
- mock AI 生成链路（Home → generateRecipes → mock generator）
- AI 配置（Settings → localStorage → generateRecipes）
- RAG-ready mock（本地 JSON 知识库 → retrieval → promptBuilder → knowledgeRefs）
- 移动端交互体验回归（按钮反馈、弹窗动效、toast、FAB）

## 发现的问题与最小修复

### 1) lint 失败（vendor/min.js 被 ESLint 扫描）

- 现象：`public/vendor/p5.min.js` 被 eslint 扫描，导致大量 lint error。
- 修复：在 `eslint.config.js` 增加忽略规则：`public/vendor/**`、`**/*.min.js`。
- 记录：已在 issue log 新增并标记 mitigated。

### 2) AI 调试日志不易看到

- 现象：`console.debug` 可能被默认 Console 级别隐藏，用户以为“没输出”。
- 修复：改为 `console.log('[ai][mock] generateRecipes debug', ...)`。
- 记录：已在 issue log 新增并标记 mitigated。

### 3) 浏览器 Issues 警告：表单控件缺少 name/id

- 现象：部分 input/select/textarea 缺少 `name`，触发浏览器 Issues 面板提示。
- 修复：为主要表单控件补齐 `name`（不影响功能）。
- 记录：已在 issue log 新增并标记 mitigated。

## localStorage 持久化检查（key 与内容）

统一 key 定义：`1_project_files/cooking-ai-planner/src/store/storageKeys.js:1`

- `cooking_ai_planner.favorites.ids.v1`
  - 数据：收藏 recipe id 数组（最新在前）
  - 刷新：可保留
  - legacy 回退：`cooking_ai_planner.favorites.v1`
- `cooking_ai_planner.shopping.items.v1`
  - 数据：ShoppingItem 数组（含 `source/manual/recipe_generated/ai_generated`）
  - 刷新：可保留；Provider 内会做 shape 归一化写回
  - legacy 回退：`cooking_ai_planner.shopping_items.v1`
- `cooking_ai_planner.recipe_generator.state.v1`
  - 数据：首页输入/筛选/上传占位结果
  - 刷新：可保留（但 recipes 列表属于 UI state，刷新会回到默认推荐）
- `cooking_ai_planner.ai.config.v1`
  - 数据：provider/model/temperature/maxTokens/systemPrompt
  - 刷新：可保留；Provider 内 normalize 写回兜底
- `cooking_ai_planner.ui.p5_hero.enabled.v1`
  - 数据：首页 p5 装饰开关（boolean）
  - 刷新：可保留

## mock AI 生成链路检查

- 入口（页面）：`HomePage` 调用 `useRecipeGeneratorState().generate()`
- 生成服务（抽象层）：`services/ai/recipeGenerationService.generateRecipes(params, config)`
- mock 生成：`services/homeRecipeAgentService.generateHomeRecipesMock(params)`
- 输出：
  - `aiRequestPayload`：包含 promptPreview / retrievalMeta / knowledgeRefs / aiConfigSnapshot
  - dev 模式会输出：`[ai][mock] generateRecipes debug`

## 模型配置页与 service 层连接检查

- Settings UI：`pages/SettingsPage.jsx`
- 读取/写入：`useAiConfig()` → Provider → localStorage
- 生效点：`AppDataProvider` 内调用 `generateRecipes(params, aiConfig)`
- 约束：非 mock provider 会报错（符合“mock-only”阶段要求）

## RAG mock 检索链路检查（RAG-ready）

- 本地知识库：`src/data/knowledge/*.json`
- 检索：`services/ai/retrievalService.retrieveCookingKnowledge(query, filters)`
  - 关键词匹配（title/content/tags）
  - filters 派生 tag（budget/equipment/time）二次筛选
- Prompt 组装：`services/ai/promptBuilder.buildRecipePrompt(...)`
- 生成输出体现引用：`knowledgeRefs` 写入 payload，并附加到每条 recipe（id 列表）

## 移动端样式检查项（建议清单）

- 430px 内：标题、输入、按钮不溢出；TabBar/FAB 不遮挡内容
- 触控反馈：按钮/卡片 press 缩放与视觉反馈
- 弹窗：可关闭、动画不过重、`prefers-reduced-motion` 生效
- 空状态：文案清晰 + 占位插画不抢内容
- 滚动：页面滚动顺滑、不出现抖动/穿透

## 下一轮建议（修复优先级）

P0（阻塞/明显影响演示）
- 补齐课堂“最小演示路径”脚本：从首页生成 → 详情 → 收藏/待购 → 收藏页/清单页验证（建议录屏/截图归档）

P1（影响体验/一致性）
- 解决 `2_coding_documentation/06_assets/screenshots/step-10-mobile-ux-enhance/before/edge-wait-test2.png` 的多余文件清理与归档规范（必要时手动删除/重建目录）
- 增加多 Tab 同步（storage 事件）或说明“同一 Tab 实时同步”的边界

P2（可优化）
- RAG 本地检索质量（同义词、分词、更好的评分/去重）
- 将 toast 统一到 layout（避免多个页面各自渲染 toast）

## 本轮建议 commit message

`[step-12][chore] project health check fixes (eslint ignores + form names + ai log)`

