# Step 1 执行记录：检查 3.0 项目结构

日期：2026-05-23

## 执行目标

检查当前“小饭桌”3.0 项目结构，为后续 4.0 GitHub × Vercel × AI 接入做准备；本步骤只做结构确认与接入建议，不修改业务代码。

## 实际检查结果

- 项目类型：确认是 Vite + React 项目，`package.json` 使用 `vite`、`react`、`react-dom`、`react-router-dom`，构建命令为 `npm run build`。
- 路由结构：`src/App.jsx` 使用 `HashRouter`、`Routes`、`Route` 管理页面路由。
- 入口文件：`src/main.jsx` 挂载 `AppDataProvider` 与 `App`，并引入全局样式。
- 开始做饭：首页入口在 `src/pages/HomePage.jsx`，主输入组件在 `src/components/home/HomeHero.jsx`，筛选条件组件在 `src/components/home/FiltersPanel.jsx`。
- 待购清单：页面在 `src/pages/ShoppingListPage.jsx`，详情页在 `src/pages/ShoppingDetailPage.jsx`，数据整理逻辑在 `src/services/shoppingService.js`。
- 我的收藏：页面在 `src/pages/FavoritesPage.jsx`，收藏状态通过 `src/store/appData.js` 和 `src/hooks/useFavorites.js` 管理。
- 设置页面：存在 `src/pages/SettingsPage.jsx`，当前包含本地 AI/mock 配置入口。
- mock 菜谱数据：主要在 `src/data/recipeCatalog.js` 与 `src/services/homeRecipeAgentService.js`。
- localStorage：统一封装在 `src/hooks/useLocalStorage.js`，key 定义在 `src/store/storageKeys.js`，主要数据聚合在 `src/store/appData.js`。
- 现有 AI 抽象层：已存在 `src/services/ai/recipeGenerationService.js`、`llmProvider.js`、`promptBuilder.js`、`retrievalService.js`、`aiConfigModel.js`，但当前真实 provider 未接入，只允许 mock。

## 实际修改

- 新增本步骤 record 文件：`records/step-01-project-check.md`
- 更新 4.0 归档规则文件：`2_coding_documentation/10_v4_ai_upgrade/00_recording_rules_v4.md`
- 未修改任何业务代码。

## 涉及文件

- `package.json`
- `src/App.jsx`
- `src/main.jsx`
- `src/pages/HomePage.jsx`
- `src/components/home/HomeHero.jsx`
- `src/components/home/FiltersPanel.jsx`
- `src/pages/ShoppingListPage.jsx`
- `src/pages/ShoppingDetailPage.jsx`
- `src/pages/FavoritesPage.jsx`
- `src/pages/SettingsPage.jsx`
- `src/store/appData.js`
- `src/store/storageKeys.js`
- `src/hooks/useLocalStorage.js`
- `src/data/recipeCatalog.js`
- `src/services/homeRecipeAgentService.js`
- `src/services/shoppingService.js`
- `src/services/ai/recipeGenerationService.js`
- `src/services/ai/llmProvider.js`
- `src/services/ai/promptBuilder.js`
- `src/services/ai/retrievalService.js`
- `src/services/ai/aiConfigModel.js`
- `records/step-01-project-check.md`
- `2_coding_documentation/10_v4_ai_upgrade/00_recording_rules_v4.md`

## 是否修改代码

无业务代码改动，仅新增 Step 1 结构检查记录。

## 后续 AI 接入建议

- Step 2 先检查 `.gitignore` 与敏感信息，确保 `.env`、`.env.local`、`node_modules`、`dist` 和真实 API Key 不会进入 GitHub。
- 后续 Vercel API 文件建议放在实际应用根目录 `1_project_files/cooking-ai-planner/api/ai.js`，因为当前 Vite 项目根目录在 `1_project_files/cooking-ai-planner`。
- 前端统一通过服务层调用 `/api/ai`，不要在页面组件或浏览器端写真实 AI Base URL 与 API Key。
- 现有 `src/services/ai` 可保留作为抽象基础，但 4.0 应新增稳定的 AI 数据结构、mock 回退数据和 Vercel Serverless API。
- AI 结果后续需要和当前 `AppDataProvider`、待购清单、收藏逻辑对齐，避免引入第二套不兼容的数据状态。

## 测试结果

- 已运行：`npm.cmd run build`
- 结果：通过
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-yYwa312i.css`
  - `dist/assets/index-gaH9Lqu3.js`
- 构建耗时：约 702ms

## 当前状态

Step 1 已完成。当前项目结构清晰，满足继续执行 Step 2 的前置条件；本步骤未触碰业务逻辑。

## 下一步建议

等待用户确认后，再执行 Step 2：检查 `.gitignore` 与敏感信息。
