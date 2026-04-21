# 1.0 基线快照（v2 升级前）

日期：2026-04-18  
项目：大学生做饭学习规划师（`1_project_files/cooking-ai-planner`）

## 目的

在开始任何 2.0（v2）增量升级前，先把当前 **1.0 的可运行状态**做成基线快照：可对照、可回溯、可验收。

基线截图位置：`2_coding_documentation/08_v2_upgrade/05_assets_v2/screenshots_before/`

## 当前 1.0 完成范围（可演示）

- **整体**：Vite + React + JavaScript（移动端优先，内容宽度 430px），底部 TabBar 导航（开始做饭 / 待购清单 / 我的收藏），HashRouter 路由
- **HomePage（开始做饭）**：输入 + 筛选 + 拍照上传占位 + mock 生成菜谱 + 随机一道菜弹窗
- **RecipeDetailPage**：菜谱详情展示 + 收藏/加入待购清单（localStorage 持久化）
- **ShoppingListPage / ShoppingDetailPage**：按菜谱分组 + CRUD + 勾选完成 + 刷新持久化（localStorage）
- **FavoritesPage**：搜索/筛选/取消收藏 + 空状态引导回首页
- **SettingsPage**：AI provider 与参数配置（本地保存），当前仅允许 mock provider
- **AI/RAG-ready 架构**：
  - 本地知识库 mock（`src/data/knowledge/*.json`）
  - `retrievalService` 本地检索占位 + `promptBuilder` 组装 prompt
  - `generateRecipes()` 仍走 mock 输出，但会体现 knowledgeRefs，并在开发模式 console 输出 debug
- **体验增强**：点击反馈、轻量动效、toast、skeleton、空状态插画占位
- **p5.js 装饰（可选）**：首页装饰模块可开关/可卸载，不影响主功能

## 1.0 未覆盖（仅结构或未做）

- 未按 2.0 PRD 做“左侧固定导航 + 顶部搜索 + 右上角状态入口”的多栏页面框架
- 未实现“菜谱结果页（Home -> Results -> Detail）”的中间层
- 未实现“随机一道菜”完整交互与“成功提示音”规范化资产管理（当前仅有弹窗/占位）
- 未新增“最近做过 / 新手贴士”等独立页面（当前只有既有 1.0 页面）

## 关键数据流（便于后续 v2 对齐）

- **首页 params 统一结构**：`src/services/homeRecipeAgentService.js`（`buildHomeParams()`）
- **生成链路（mock-only）**：`src/services/ai/recipeGenerationService.js`（`generateRecipes(params, config)`）
- **RAG-ready（本地检索）**：`src/services/ai/retrievalService.js` + `src/services/ai/promptBuilder.js`
- **状态层（Context + hooks）**：`src/store/appData.js` + `src/hooks/useFavorites.js` / `useShoppingList.js` / `useRecipeGeneratorState.js`

## 1.0 vs 2.0（手册 2.0 关注点）

2.0（v2）更强调：
- **先归档再升级**：为 1.0 做基线快照（本目录），再逐步推进 v2 step
- **流程档案完整**：每轮必须同步 prompt log / step report / issue log / flowchart / commit_index
- **MVP 定义明确**：mock provider + RAG-ready 架构 + 本地知识库 mock + 结果页 + 内容流页面
