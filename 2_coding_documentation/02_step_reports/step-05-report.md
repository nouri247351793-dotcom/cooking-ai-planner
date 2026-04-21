# Step 05 - shopping-group-crud（Step Report）

## 本轮目标

- ShoppingListPage：按菜谱分组展示待购清单卡片（缩略图/总数/进度）
- ShoppingDetailPage：按“食材/调料/器具”分类展示，并支持 CRUD + 勾选完成
- 数据持久化：所有清单状态保存在 `localStorage`
- 数据结构：预留 `source` 字段，支持未来 AI 自动生成待购清单

## Prompt 设计理由

- “按菜谱分组”的清单更贴近学习规划：每次练一道菜 → 一次性准备该菜所需清单 → 执行与复盘
- 提前把 `source`（manual/recipe_generated/ai_generated）纳入数据结构，有利于后续 AI 自动生成与可追踪管理

## AI 输出方案摘要

- 定义 `ShoppingItem` 结构约定（JSDoc），并在 services 层做“迁移/分组/标题”等纯逻辑函数
- ShoppingListPage 仅负责渲染分组卡片列表；ShoppingDetailPage 负责分类渲染与 CRUD UI
- 旧 localStorage 数据通过 `migrateShoppingItems` 自动补齐缺失字段（category/source/updatedAt）

## 文件级改动说明

- 新增：`1_project_files/cooking-ai-planner/src/utils/shoppingModel.js`
- 新增：`1_project_files/cooking-ai-planner/src/services/shoppingService.js`
- 更新：`1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`
- 更新：`1_project_files/cooking-ai-planner/src/pages/ShoppingDetailPage.jsx`
- 更新：`1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`（加入待购时写入 category/source，并补齐器具类）
- 更新：`1_project_files/cooking-ai-planner/src/styles/app.css`（分组卡片/列表项/悬浮新增按钮/弹窗样式）
- 更新：`2_coding_documentation/04_issue_reviews/issue-log.md`
- 更新：`2_coding_documentation/03_git_records/commit_index.md`
- 更新：`2_coding_documentation/05_flowcharts/macro_flow.mmd`

## 代码级改动说明

- `ShoppingItem` 字段：`category`（ingredient/condiment/equipment）+ `source`（manual/recipe_generated/ai_generated）+ `fromRecipeId`（用于分组）
- `migrateShoppingItems`：对旧数据做兼容迁移，保证页面逻辑与未来扩展稳定
- `groupShoppingItemsByRecipe`：生成分组卡片需要的统计（总数/完成数/进度）
- 详情页 CRUD：
  - 新增：悬浮 `+` 打开弹窗，默认 `source=manual`
  - 编辑：更新 name/qty/category（保留 source）
  - 删除：移除 item
  - 勾选：切换 `checked` 并更新时间戳

## 自测结果

- [x] `npm.cmd run dev` 可启动，页面非空白（HTTP 200）
- [x] 清单分组卡片正确显示（缩略图/总数/进度）
- [x] 详情页新增/编辑/删除/勾选可用（悬浮 `+`）
- [x] 刷新后 localStorage 持久化仍在（手动验证：新增/勾选后刷新浏览器）
- [x] `npm.cmd run build` 构建成功
- [x] 文档已归档（prompt log / step report / commit index / flowchart）

## AI 输出评估

- 可用：把“数据结构 + services 纯逻辑”先固定，后续 AI 自动生成只需要写入同结构即可复用 UI 与持久化

## 人工修正/二次指令

- 约束：不接后端；所有状态先落 localStorage；mock/迁移逻辑集中在 services

## 本轮知识点与反思

- `source` 字段的价值：把“谁生成的清单”变成可追踪的元数据，便于解释与扩展

## 发现的问题

- `manual` 分组为空时的入口：已在列表空状态提供“手动清单”入口

## 下一轮建议

- Step 06：把 SettingsPage 的模型配置占位与 services 连接，并尝试把 `ai_generated` 的清单写入链路跑通（仍可 mock）

## 为什么要预留 source 字段（本轮特别要求 11）

- **可解释性**：用户能区分“我手动加的”vs“来自菜谱一键加入”vs“AI 自动生成”，课堂展示也更好讲清楚
- **可回滚/可重试**：未来 AI 生成出错，可按 `source=ai_generated` 批量撤销/重生成，不影响手动清单
- **可评估**：可以统计 AI 生成项的勾选完成率/被删除率，作为 AI 输出质量指标

## 建议 git commit（本轮）

- Commit message：`[step-05][feat] shopping grouped list and crud`


