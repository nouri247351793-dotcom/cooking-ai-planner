# Step 2.0-02 Report（首页重构：Hero / 快捷胶囊 / 右侧辅助区）

日期：2026-04-18  
范围：Step 2.0-02（仅重构 HomePage，不重写其它业务页）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-02-home-hero.md`

## AI 输出方案摘要

- 移除 1.0 的“今日练习氛围”独立板块；把 p5 装饰改为 Hero 内可开关的背景装饰，不遮挡主交互。
- 重构首屏 Hero：大标题 + 说明 + 大输入框 + 主按钮 + 输入辅助文案（Enter 发送 / Shift+Enter 换行）。
- 快捷筛选改为一排胶囊按钮（并保留“更多筛选”折叠面板，避免丢失原有筛选能力）。
- 首页推荐区改为“本周推荐”网格。
- 右侧新增辅助区（随机一道菜 / 学做饭小贴士 / 省钱计划），本轮不做弹窗，只做模块与入口。
- 保持 mock 生成链路与 params 结构不变：仍调用 `useRecipeGeneratorState().generate()`。

## 首页为什么不再承担完整结果列表

- 2.0 的信息架构更接近 Web 应用：首页应聚焦“意图输入 + 快速约束 + 触发生成”，而不是承载长列表。
- 结果列表会成为独立“结果页”（Step 2.0-03），便于：
  - 支持返回时保留筛选与输入
  - 统一结果卡片样式与二次筛选
  - 承载“再生成 / 重新生成”的交互而不挤压首页首屏

## 首页现在承担哪些职责

- 收集用户意图：输入框 + Enter 快捷触发
- 收集约束条件：快捷胶囊（时长/预算/设备/人数）+ 详细筛选（折叠）
- 触发生成：调用 mock provider 的 `generateRecipes(params, config)`（链路不变）
- 提供轻量引导与辅助：右侧模块（随机入口/贴士/省钱计划）+ “今天的灵感”小卡片
- 仅展示“生成状态与入口预留”：不展示完整结果列表

## 文件级改动说明

| 类型 | 文件 | 说明 |
|---|---|---|
| 新增 | `1_project_files/cooking-ai-planner/src/components/home/HomeHero.jsx` | 2.0 Hero 组件（含 Enter 触发与 p5 开关） |
| 重写 | `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx` | HomePage 2.0 布局：Hero/胶囊/本周推荐/右侧辅助区/灵感卡 |
| 重写 | `1_project_files/cooking-ai-planner/src/components/home/FiltersPanel.jsx` | 快捷胶囊行 + “更多筛选”折叠面板 |
| 修改 | `1_project_files/cooking-ai-planner/src/styles/app.css` | Home 2.0 布局与胶囊/右侧辅助区样式；新增 `appShell--wide` |
| 修改 | `1_project_files/cooking-ai-planner/src/components/AppLayout.jsx` | 首页使用 `appShell--wide`（桌面端为 Home 提供更宽的主内容区） |
| 修改 | `1_project_files/cooking-ai-planner/src/services/homeRecipeAgentService.js` | 扩展 `equipmentLimit` 枚举：支持 `dormPot/airfryer`（不破坏原值） |

## 代码级改动说明

| 位置 | 改动点 |
|---|---|
| `HomeHero` | `textarea` 支持 `Enter` 触发生成、`Shift+Enter` 换行；p5 装饰作为背景层，可开关 |
| `FiltersPanel` | 胶囊按钮按“点击应用/再次点击重置到默认”实现；保留原筛选 select 在 details 中 |
| `HomePage` | 生成结果仅展示状态与“预览入口”2 条（不承载完整结果列表）；右侧模块不再弹窗 |
| `applyFilters` | `dormPot` 过滤到包含 `pot` 的菜谱；`airfryer` 作为占位不做过滤（保证 mock 结果不为空） |

## 自测结果

- `npm.cmd run build`：通过
- `npm.cmd run dev`：可启动；`http://127.0.0.1:5173/#/` 可访问
- 手工点检建议：
  - Hero 输入后按 Enter 能触发“生成中”状态
  - 快捷胶囊可切换并影响生成结果（时长/预算/微波炉/宿舍小锅）
  - 桌面端宽度（>=900px）能看到右侧辅助区

## 截图归档

- before：`2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-02-home/before/home.png`
- after：由于自动截图能力不稳定，需要手动补齐，说明见 `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-02-home/after/README.md`

## 问题与反思

- “空气炸锅”筛选在当前 mock 数据中缺少对应设备字段，因此先作为占位（不做硬过滤），避免出现空结果影响课堂演示。
- 首页不展示完整结果列表后，需要在 Step 2.0-03 尽快补齐“结果页”，否则用户会觉得“生成了但去哪看”。

## 下一轮建议

- Step 2.0-03：新增 `RecipeResultsPage` 并把链路从 “首页生成直接在首页展示” 改成 “首页 → 结果页 → 详情页”，同时保持返回不丢输入与筛选状态。

