# Step 2.0-03 Report（菜谱结果页 + 首页生成跳转链路）

日期：2026-04-20  
范围：Step 2.0-03（在现有 1.0 基础上增量升级；不接真实 AI / 不接后端）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-03-recipe-results.md`

## AI 输出方案摘要

- 新增独立的结果页 `RecipeResultsPage`，用于承载“条件摘要 + 结果卡片 + 重新生成”
- 首页点击“生成菜谱”后：先进入 loading（按钮态 / skeleton），成功后跳转到 `#/results`
- 结果页卡片复用既有 `RecipeCard`，点击进入详情页
- 返回首页后，尽量保留输入与筛选：继续使用既有 `cooking_ai_planner.recipe_generator.state.v1` 持久化结构
- 保持 mock provider / 本地 RAG-ready 链路不变：仍走 `services/ai/recipeGenerationService.generateRecipes()`

## 为什么“结果页”是 2.0 的关键中间层

- 2.0 首页首屏更像“意图输入 + 快速约束 + CTA”，不适合承载长列表与多状态（加载/空/错误/成功）
- 结果页把“列表展示、重新生成、返回改条件”统一到一个可复用页面，首页更清晰、路径更可演示
- 这也为后续 2.0 的“筛选迭代、对比多候选、二次追问”留出空间，而不挤压首页首屏体验

## 它解决了首页什么问题

- 解决“生成后结果放哪里看”的困惑
- 让首页只负责触发生成与保留状态，结果展示与再生成交给结果页，降低首屏信息密度

## 文件级改动说明

| 类型 | 文件 | 说明 |
|---|---|---|
| 新增 | `1_project_files/cooking-ai-planner/src/pages/RecipeResultsPage.jsx` | 新结果页（标题、摘要、skeleton、空/错态、结果卡片、返回入口、重新生成） |
| 修改 | `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx` | 首页“生成菜谱”改为：loading → 成功后跳转 `#/results` |
| 修改 | `1_project_files/cooking-ai-planner/src/store/appData.js` | `generate()` 返回结构化结果（success/empty/error），便于页面跳转决策 |
| 修改 | `1_project_files/cooking-ai-planner/src/components/home/RecipeCard.jsx` | 卡片点击携带 `state.from`，支持详情页返回来源页 |
| 修改 | `1_project_files/cooking-ai-planner/src/components/AppLayout.jsx` | 为 `/results` 配置 layout meta；详情页 backTo 优先取 `state.from` |
| 修改 | `1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx` | 修复/统一中文文案；逻辑不变 |
| 修改 | `1_project_files/cooking-ai-planner/package.json` | `dev/build/preview` 增加 `--configLoader native`（适配当前 Windows 权限环境） |
| 修改 | `1_project_files/cooking-ai-planner/vite.config.js` | `build.emptyOutDir=false`（避免清空 `dist` 触发 EPERM） |
| 修复 | `1_project_files/cooking-ai-planner/src/components/TopBar.jsx` 等 | 修正文案乱码（不改业务逻辑，仅文本与图标） |

## 代码级改动说明

- `useRecipeGeneratorState().generate()`：除了更新 Context state，也返回 `{ status, recipes, ... }`，让 HomePage 可以“等待生成完成后再跳转”
- HomePage：`handleGenerate` 等待 `generate()` 完成后 `navigate('/results')`
- RecipeResultsPage：根据 `status` 展示 skeleton / 错误 / 空结果 / 成功网格；摘要直接读 `inputText + filters`
- RecipeCard：通过 `Link state` 传递 `{ recipe, from }`，详情页返回更自然（结果页 → 详情 → 返回结果页）

## 自测结果

- `npm.cmd run build`：通过（已在本机执行）
- `npm.cmd run dev`：如遇 5173 被占用，可改用 `npm.cmd run dev -- --port 5174`

## 已知问题与风险

- 当前环境下 `dist` 目录清空可能触发 `EPERM`，本轮通过 `emptyOutDir=false` 规避；风险是 `dist` 可能残留旧文件（但产物有 hash，课堂 MVP 可接受）
- 本机可能存在端口占用（5173），需手动换端口或关闭占用进程

## 截图归档

路径：
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-03-results/before/`
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-03-results/after/`

说明：当前环境的自动截图能力不稳定，本轮按 README 指引手动补齐。

## 问题与反思

- 把“结果展示”从首页拆出去，是让 2.0 信息架构更像 Web 应用的关键一步；同时也更利于课堂演示路径（首页输入 → 结果对比 → 详情学习）
- 受限环境（脚本策略、权限、端口占用）会影响可复现性，需要在文档里把“可运行命令”和“替代命令”写清楚

## 下一轮建议（不在本轮实施）

- Step 2.0-04：在结果页补齐“随机一道菜弹窗 + 成功提示（toast）”与更明确的入口引导
- Step 2.0-05：详情页视觉对齐 2.0，并把“加入待购清单”做成更可见的操作反馈
- Step 2.0-06：待购清单页在桌面布局下的分组与进度展示对齐高保真

