# Step 02 - router-and-global-style（Step Report）

## 本轮目标

- 接入 React Router（不改变 Vite + React + JavaScript 路线）
- 新增页面占位：Home / RecipeDetail / ShoppingList / ShoppingDetail / Favorites / Settings（AI 模型配置占位）
- 创建共享结构组件：AppLayout / TabBar / PageHeader
- 新增并落地全局设计 tokens（主/辅色、圆角、阴影、字号、间距）
- 首页预留“AI 配置入口”（右上角按钮 → SettingsPage）

## Prompt 设计理由

- 先把“导航骨架 + 页面信息架构 + 设计 token”稳定下来，后续接 mock AI / localStorage / RAG-ready 只需要在既定页面与 service 层逐步填充

## AI 输出方案摘要

- 采用 React Router v6，使用 `HashRouter` 保证静态部署/刷新不 404
- 用 `AppLayout` 统一承载：PageHeader（标题/返回/右上角入口）+ Outlet + TabBar
- 用 tokens 统一风格：清爽、年轻、克制装饰（轻渐变背景 + 半透明卡片 + 统一圆角阴影）

## 文件级改动说明

- 新增：`1_project_files/cooking-ai-planner/src/components/AppLayout.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/components/TabBar.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/components/PageHeader.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/pages/ShoppingDetailPage.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/pages/SettingsPage.jsx`
- 更新：`1_project_files/cooking-ai-planner/src/App.jsx`（React Router 路由）
- 更新：`1_project_files/cooking-ai-planner/src/main.jsx`（全局样式入口）
- 更新：`1_project_files/cooking-ai-planner/src/styles/tokens.css`、`src/styles/global.css`、`src/styles/app.css`
- 更新：`1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`、`src/pages/FavoritesPage.jsx`
- 更新：`1_project_files/cooking-ai-planner/README.md`（启动方式 + 路由说明）
- 删除：`1_project_files/cooking-ai-planner/src/components/BottomNav.jsx`、`src/pages/StartCookingPage.jsx`（被 React Router + TabBar 替代）

## 代码级改动说明

- 路由：`src/App.jsx` 使用 `HashRouter` + `Routes`，包含列表页、详情页与设置页
- 布局：`AppLayout` 根据 pathname 决定是否显示 TabBar、是否显示返回按钮，并在首页右上角提供“AI 配置”入口
- 设计 tokens：在 `src/styles/tokens.css` 引入字号/间距/阴影/圆角/色彩体系，组件样式统一引用变量

## 自测结果

- [x] `npm.cmd install` 成功（含新增 `react-router-dom`）
- [x] `npm.cmd run dev` 可启动（HTTP 200；页面非空白）
- [x] TabBar 可切换：`#/`、`#/shopping`、`#/favorites`
- [x] 详情页与设置页可访问：`#/recipes/r1`、`#/shopping/鸡蛋`、`#/settings`，并可返回
- [x] `npm.cmd run build` 构建成功
- [x] 文档归档已更新（prompt log / step report / commit index / flowchart）

## AI 输出评估

- 可用：在不引入后端的前提下，把“页面骨架 + 路由 + 统一设计语言”稳定下来，后续能按 step 渐进填充功能

## 人工修正/二次指令

- 统一选择 `HashRouter`（降低部署与刷新风险）；其余保持既定技术路线不变

## 本轮知识点与反思

- React Router 的“布局路由 + Outlet”适合把 Header/TabBar 变成可复用壳层
- tokens 先行能避免后续每个页面各写各的样式，且更利于课堂讲解“设计系统思维”

## 发现的问题

- 受限环境中 `npm run dev` 可能报 `spawn EPERM`：需在本机环境执行验证（本轮已验证通过）

## 下一轮建议

- Step 03：补齐首页输入区（偏好/预算/时间/厨具/饮食限制）+ mock AI 输出结构（service 层与页面展示联动）


