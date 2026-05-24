# Step 4.0-01 Report - Project Structure Check

Date: 2026-05-23

## 本轮目标

进入 4.0 AI 接入前，先检查当前项目结构，确认项目类型、关键页面、mock 数据和后续 AI 接入修改建议。

## 检查结果

### 项目类型

- 当前项目是 Vite + React。
- `1_project_files/cooking-ai-planner/package.json` 包含 `vite`、`react`、`react-dom`、`react-router-dom`。
- 构建脚本为 `npm run build`，实际命令为 `vite build --configLoader native`。
- `1_project_files/cooking-ai-planner/vite.config.js` 已配置 GitHub Pages production base：`/cooking-ai-planner/`。

### 页面定位

- 开始做饭：首页入口为 `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`。
- 首页输入组件为 `1_project_files/cooking-ai-planner/src/components/home/HomeHero.jsx`。
- 待购清单页为 `1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`。
- 我的收藏页为 `1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx`。
- 路由集中在 `1_project_files/cooking-ai-planner/src/App.jsx`。

### mock 数据和现有 AI 结构

- 菜谱目录：`1_project_files/cooking-ai-planner/src/data/recipeCatalog.js`。
- mock 生成逻辑：`1_project_files/cooking-ai-planner/src/services/homeRecipeAgentService.js`。
- 当前首页生成链路：`HomePage.jsx` → `useRecipeGeneratorState()` → `store/appData.js` → `generateRecipes()`。
- 现有 AI 抽象层：
  - `src/services/ai/recipeGenerationService.js`
  - `src/services/ai/llmProvider.js`
  - `src/services/ai/promptBuilder.js`
  - `src/services/ai/retrievalService.js`
  - `src/services/ai/aiConfigModel.js`
- 当前真实 provider 尚未接入；非 mock provider 会抛出“当前仅支持 mock provider”。

## 文件级改动说明

本 Step 原检查阶段未修改业务代码。

补归档时新增/更新：

- `2_coding_documentation/10_v4_ai_upgrade/00_recording_rules_v4.md`
- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-01-project-structure-check.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-01-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/03_issue_reviews_v4/issue-log-v4.md`
- `2_coding_documentation/10_v4_ai_upgrade/03_issue_reviews_v4/reflection-log-v4.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-01-project-structure-check.mmd`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/current_status_v4.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/current_status_v4.mmd`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/macro_flow_v4.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## 代码级改动说明

无业务代码改动。  
本轮只检查结构并补齐 4.0 归档记录，不修改 React 页面、hooks、services、路由、localStorage schema 或 API 实现。

## 后续修改文件建议

- Step 4.0-02：新增 `src/services/ai/aiTypes.js`，定义结构化 AI 响应与 `mockAIResponse`。
- Step 4.0-03：新增 `src/services/aiService.js` 或与现有 `src/services/ai/` 对齐，提供 `askAI(userMessage, context)`。
- Step 4.0-04：新增 `/api/ai` Serverless 接口和 `.env.example`，API Key 只在服务端读取。
- Step 4.0-05：沉淀大学生做饭规划助手 prompt，要求输出结构化 JSON。
- Step 4.0-06：接入首页生成流程，收集 context、loading、菜谱、步骤和 tips。
- Step 4.0-07：将 AI 返回的 `shoppingList` 同步到现有 shopping localStorage。
- Step 4.0-08：将 AI 返回的 recipe 收藏到现有 favorites localStorage，避免重复。
- Step 4.0-09：补齐非法 JSON、超时、网络错误和 localStorage 异常处理。
- Step 4.0-10：无 API Key 时进入 mock 并在页面显示演示模式。
- Step 4.0-11：执行完整测试和验收。

## 验证结果

- `npm.cmd run build`: passed
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-yYwa312i.css`
  - `dist/assets/index-gaH9Lqu3.js`

## Git 记录

Planned commit message:

```text
[step-4.0-01][docs] record v4 project structure check
```

当前状态：

- 本轮归档尚未提交。
- 本轮归档尚未 push。
- 当前工作区还有 3.0 UI 调整与归档改动，后续提交前需要统一检查暂存范围。
