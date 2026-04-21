# Step 01 - project-init（Step Report）

## 本轮目标

- 在 `1_project_files/cooking-ai-planner` 初始化 `Vite + React + JavaScript` 项目
- 移动端优先（最大内容宽度 430px）
- 搭建底部导航框架（开始做饭 / 待购清单 / 我的收藏）

## Prompt 设计理由

- 先保证可运行与可演示：做出“非空白首屏 + 可切换导航 + 演示数据”，为后续 mock AI / localStorage / RAG-ready 结构留接口位

## AI 输出方案摘要

- 使用 Vite React JS 脚手架生成基础工程
- 不引入额外路由依赖：用 hash route（`#/cook` 等）实现 3 页切换
- 全局样式采用移动端优先 + `max-width: 430px` 容器布局，底部导航固定并适配安全区

## 文件级改动说明

- 新增：`1_project_files/cooking-ai-planner/`（Vite + React + JS 工程）
- 新增：`1_project_files/cooking-ai-planner/src/components/BottomNav.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/pages/*Page.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/data/demo*.js`
- 新增：`1_project_files/cooking-ai-planner/src/hooks/useHashRoute.js`、`1_project_files/cooking-ai-planner/src/hooks/useLocalStorage.js`
- 新增：`1_project_files/cooking-ai-planner/src/services/mockPlanner.js`
- 新增：`1_project_files/cooking-ai-planner/src/styles/*`
- 更新：`1_project_files/cooking-ai-planner/src/main.jsx`、`1_project_files/cooking-ai-planner/src/App.jsx`
- 更新：`1_project_files/cooking-ai-planner/README.md`、`1_project_files/cooking-ai-planner/index.html`
- 更新归档：`2_coding_documentation/**`（本文件、commit index、flowchart）

## 代码级改动说明

- `App.jsx`：提供应用壳（header/main/bottomNav）与 3 页面占位渲染
- `useHashRoute.js`：用 `window.location.hash` 实现轻量路由（无需后端/无需 react-router）
- `styles/`：通过 `--maxw: 430px` 控制最大内容宽度；底部导航固定

## 自测结果

- [x] `npm install` 成功（在本机/非沙盒环境执行）
- [x] `npm run dev` 可启动（`http://127.0.0.1:5173/`）
- [x] 页面非空白：首屏有标题、卡片与演示数据
- [x] 关键交互：底部导航可切换 3 个页面
- [x] `npm run build` 构建成功（额外验证）
- [x] 文档已归档（prompt log / step report / commit index / flowchart）

## AI 输出评估

- 可用：先把“可演示壳子”搭出来，便于后续逐步接 mock AI/RAG-ready/localStorage
- 注意：在受限沙盒环境内运行 `npm run dev` 可能出现 `spawn EPERM`，需在本机环境验证（本轮已在本机环境验证成功）

## 人工修正/二次指令

- 无（本轮以骨架搭建为主，后续再细化首页信息结构与输入表单）

## 本轮知识点与反思

- 先做“可讲清楚链路”的最小工程，比堆功能更有利于课堂展示与过程归档
- 不依赖路由库也能快速做出可切换的 3 页结构，降低依赖与风险

## 发现的问题

- `npm` 在 PowerShell 里可能因脚本策略被拦截：可用 `npm.cmd` 替代
- 依赖下载/缓存写入需要权限（环境限制时需切换到本机可联网环境）

## 下一轮建议

- Step 02：完善首页首屏与空状态（输入区、示例配置、演示数据更完整），并开始设计 mock AI service 的输入/输出数据结构


