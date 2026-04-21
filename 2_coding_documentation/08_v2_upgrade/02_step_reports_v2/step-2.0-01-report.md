# Step 2.0-01 Report（全局网页框架）

日期：2026-04-18  
范围：在现有 1.0 基础上进行 2.0 增量升级（本轮仅做 Step 2.0-01）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-01-layout-shell.md`

## AI 输出方案摘要

- 目标：在不推翻 1.0 的前提下，新增 **桌面端全局框架**：
  - 左侧固定导航（至少：开始做饭 / 待购清单 / 我的收藏 / 最近做过 / 新手贴士）
  - 顶部搜索框（占位，不接真实检索）
  - 右上角状态入口（收藏/待购数量 + Settings）
- 实现方式：通过 CSS media query（`min-width: 900px`）在桌面端启用 v2 框架；移动端保持原有 `PageHeader + TabBar`。
- 不接真实 AI/后端/数据库；保持 mock provider + RAG-ready 架构不变。

## 旧壳 vs 新壳（区别说明）

- **旧壳（1.0）**：移动端优先，`PageHeader（sticky） + TabBar（底部固定） + 主内容区`。
- **新壳（2.0 桌面端）**：桌面网页结构，`SideNav（左侧固定） + TopBar（顶部搜索/状态入口） + 主内容区`。
- **共存策略**：通过 `@media (min-width: 900px)` 仅在桌面端启用新壳；移动端保持旧壳不动，避免一次性重写页面内容。

## 为什么 2.0 改为左导航而不是底部导航

- 2.0 的页面范围更接近“Web 应用”信息架构（更多栏目：最近做过/新手贴士/后续右侧辅助区），左侧导航能提供**稳定、可扩展**的全局入口。
- 桌面端空间更充裕：左导航可以承载更长的菜单与状态徽标（待购/收藏数量），不挤压主内容区。
- 移动端仍保留底部 TabBar：符合移动端单手操作习惯；本轮采用“双壳共存”，降低回归风险。

## 文件级改动说明（清单）

| 类型 | 文件 | 说明 |
|---|---|---|
| 新增 | `1_project_files/cooking-ai-planner/src/components/SideNav.jsx` | 桌面端左侧导航（含徽标/高亮/数量 badge） |
| 新增 | `1_project_files/cooking-ai-planner/src/components/TopBar.jsx` | 桌面端顶部条（搜索占位 + 右上状态入口） |
| 新增 | `1_project_files/cooking-ai-planner/src/pages/RecentPage.jsx` | “最近做过”占位页 |
| 新增 | `1_project_files/cooking-ai-planner/src/pages/TipsPage.jsx` | “新手贴士”占位页 |
| 修改 | `1_project_files/cooking-ai-planner/src/components/AppLayout.jsx` | v2Frame 包裹 + 桌面端启用 SideNav/TopBar；新增 recent/tips 元信息 |
| 修改 | `1_project_files/cooking-ai-planner/src/styles/app.css` | v2 桌面布局样式 + SideNav/TopBar 样式 |
| 修改 | `1_project_files/cooking-ai-planner/src/App.jsx` | 新增 `/recent`、`/tips` 路由 |
| 修改 | `1_project_files/cooking-ai-planner/src/pages/SettingsPage.jsx` | 增加移动端访问 recent/tips 的入口卡片 |

## 代码级改动说明（要点）

| 模块 | 变更点 |
|---|---|
| `AppLayout` | 原移动端壳保留，外层增加 `v2Frame`；桌面端显示 `SideNav` 与 `TopBar`，并隐藏 `PageHeader/TabBar` |
| `SideNav` | 使用 `NavLink` 支持高亮；从 `useFavorites/useShoppingList` 读取数量并渲染 badge |
| `TopBar` | 顶部搜索输入为占位（Enter 仅 console log）；右侧提供“待购/收藏/设置”入口与计数 |
| 路由 | 新增 `/recent`、`/tips` 两个占位页路由；移动端通过 Settings 入口可到达 |

## 自测结果（最小验证）

- `npm.cmd run build`：通过
- `npm.cmd run dev`：可启动；`http://127.0.0.1:5173/#/` 可访问（结构层验证）
- 页面检查建议（人工）：
  - 移动端宽度：仍为 `PageHeader + TabBar`，主流程可用
  - 桌面端宽度（>=900px）：出现左侧导航 + 顶部搜索/状态入口

## git 记录

- 当前目录未初始化 git：`git status` 返回 `fatal: not a git repository`，因此无法直接执行 `git add/commit`。
- 建议在项目根目录初始化后执行：
  - `git init`
  - `git add 1_project_files/cooking-ai-planner 2_coding_documentation/08_v2_upgrade 2_coding_documentation/03_git_records/commit_index.md`
  - `git commit -m \"[step-2.0-01][feat] add desktop layout shell (side nav + top bar)\"`

## 问题与反思

- 桌面框架通过 media query 隐藏移动端 header/tabbar，属于“壳层增强”，但仍需人工在浏览器中核对布局细节与可用性。
- 现有代码库中文字符串存在乱码风险（历史遗留），本轮未集中修复，避免超出 Step 2.0-01 范围。

## 下一轮建议

- 进入 Step 2.0-02：在 HomePage 基础上重构 **Hero 区 + 右侧辅助区**（不破坏现有 mock 生成与 params 结构）。
