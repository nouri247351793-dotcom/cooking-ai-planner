# Step 04 - recipe-detail-localstorage（Step Report）

## 本轮目标

- 完成 `RecipeCard` 与 `RecipeDetailPage`（围绕移动端阅读体验）
- 详情页加入“收藏 / 加入待购清单”按钮，并用 `localStorage` 持久化当前状态
- 抽离 recipe 数据结构约定（集中在 `utils`/`data`）
- 同步把 Shopping/Favorites 页接上本地状态（无需后端）

## Prompt 设计理由

- 先把“菜谱对象”变成稳定的数据结构：卡片/详情/收藏/待购都围绕同一份结构工作，后续接 AI/RAG/持久化最顺滑

## AI 输出方案摘要

- 新增 `Recipe` 结构约定（JSDoc）+ 本地 `recipeCatalog` 作为 mock 数据源
- `RecipeCard` 展示：图片/标题/标签/时间/难度/核心食材
- `RecipeDetailPage` 展示完整信息并固定底部操作条（收藏/加入待购）
- `localStorage`：收藏存 recipeId；待购清单存 item 列表（带来源 recipeId）

## 文件级改动说明

| 文件 | 类型 | 说明 |
|---|---|---|
| `1_project_files/cooking-ai-planner/src/utils/recipeModel.js` | 新增 | recipe 数据结构约定（JSDoc typedef） |
| `1_project_files/cooking-ai-planner/src/data/recipeCatalog.js` | 新增 | 本地 mock 菜谱目录（含图片/步骤/营养等） |
| `1_project_files/cooking-ai-planner/src/assets/recipes/*.svg` | 新增 | 卡片/详情页用的轻量占位图片 |
| `1_project_files/cooking-ai-planner/src/components/home/RecipeCard.jsx` | 更新 | 卡片信息补齐（图片/核心食材等） |
| `1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx` | 更新 | 详情页完整信息 + 收藏/待购（localStorage） |
| `1_project_files/cooking-ai-planner/src/store/storageKeys.js` | 新增 | localStorage key 常量 |
| `1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx` | 更新 | 待购清单读取/勾选 localStorage（无数据时 fallback demo） |
| `1_project_files/cooking-ai-planner/src/pages/ShoppingDetailPage.jsx` | 更新 | 待购详情读取 localStorage + 标记/移除 |
| `1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx` | 更新 | 收藏页读取 localStorage 并渲染卡片流 |
| `1_project_files/cooking-ai-planner/src/services/homeRecipeAgentService.js` | 更新 | Home mock 生成改为使用 `recipeCatalog` |
| `1_project_files/cooking-ai-planner/src/styles/app.css` | 更新 | 卡片/详情/步骤/底部操作条样式（移动端） |

## 代码级改动说明

| 模块/函数 | 说明 |
|---|---|
| `RecipeCard` | 渲染字段：图片/标题/2-3 标签/时间/难度/核心食材，并携带 `Link state` |
| `RecipeDetailPage` | 优先使用 `location.state.recipe`，缺失时用 `getRecipeById(recipeId)` 从 catalog 恢复 |
| `RecipeDetailPage` 收藏 | `favorites: string[]` 存在 `localStorage`，用 `useLocalStorage` 管理 |
| `RecipeDetailPage` 待购 | `shoppingItems` 写入 `localStorage`，按 `recipeId:name` 去重 |
| `ShoppingListPage` | 本地清单可勾选；无本地数据时用 demo 作为占位 |
| `FavoritesPage` | 根据收藏 id 列表映射到 `recipeCatalog` 并渲染 `RecipeCard` |

## 自测结果

- [x] `npm.cmd run dev` 可启动（HTTP 200）
- [x] `RecipeCard` 字段齐全；点击进入详情页；返回正常
- [x] 详情页：标题/图片/标签/时间/难度/食材/调料/步骤/营养/搭配均可展示
- [x] 收藏/加入待购写入 `localStorage`，切到“我的收藏/待购清单”仍保留
- [x] `npm.cmd run build` 构建成功
- [x] 文档已归档（prompt log / step report / commit index / flowchart）

## AI 输出评估

- 可用：数据结构先行，让后续 AI/RAG 接入只需要“填充 recipeCatalog / service 输出”，页面与持久化逻辑可复用

## 人工修正/二次指令

- 选择 `HashRouter`（前序 Step 02）+ “路由参数优先从本地 mock 恢复”，降低刷新丢数据风险

## 本轮知识点与反思

- 设计“菜谱对象模型”比先写页面更关键：它决定了 mock、RAG、收藏/待购、详情展示能否统一

## 发现的问题

- 详情页底部操作条为 `fixed`：需要确保 `appShell` 底部留足 padding（当前已通过全局布局 padding 覆盖）

## 下一轮建议

- Step 05：把 SettingsPage 的模型配置占位与 services 层连接（仍可 mock），并把 `aiRequestPayload` 与用户操作日志落到 localStorage（便于课堂展示“过程证据链”）

## 数据结构设计理由（Step 04 关键）

- 统一 `Recipe` 结构（见 `src/utils/recipeModel.js`）的目的：
  - 卡片与详情页共用，不需要在页面里“猜字段”
  - 收藏/待购只保存最小信息（id / item），需要时可从 `recipeCatalog` 恢复完整内容
  - 后续接 RAG：可用 `coreIngredients + tags + steps` 作为检索 query / 结构化上下文

## 建议 git commit（本轮）

- Commit message：`[step-04][feat] recipe card detail and localStorage`


