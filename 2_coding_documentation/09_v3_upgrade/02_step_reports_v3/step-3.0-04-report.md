# Step 3.0-04 Report - Recommended Task Panel

Date: 2026-05-22

## 本轮目标

把首页下方原“今日灵感/推荐菜谱”区替换为 3.0 的“推荐任务”面板，并建立等级、阶段、经验进度条和难度切换框架。

## AI 输出方案摘要

- 新增 `RecommendedTasksPanel` 组件。
- 首页下方不再直接展示推荐菜谱卡片，改为任务面板。
- 任务面板包含标题图标位、难度切换、当前等级、阶段名称、XP 进度条和占位任务卡。
- 保留生成菜谱结果页、随机一道菜、收藏、最近做过等既有菜谱能力。

## 文件级改动说明

- `1_project_files/cooking-ai-planner/src/components/home/RecommendedTasksPanel.jsx`
  - 新增推荐任务面板。
  - 固定阶段映射：Lv.1–10 小试灶台、Lv.11–20 渐入佳境、Lv.21+ 熟能生巧。
  - 提供易 / 中 / 难切换和占位任务卡。
- `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
  - 移除首页下方原推荐菜谱网格。
  - 接入 `RecommendedTasksPanel`。
  - 清理首页不再使用的 `RecipeCard` 与收藏切换依赖。
- `1_project_files/cooking-ai-planner/src/styles/app.css`
  - 新增推荐任务面板、等级进度、难度切换、任务卡样式。
- `2_coding_documentation/09_v3_upgrade/...`
  - 新增本轮 prompt log、step report、flowchart、after 截图，并更新 issue/reflection/current status。

## 产品级改动说明

- 原推荐菜谱区：重点是“看几道可做的菜”，用户目标偏内容浏览。
- 新推荐任务区：重点是“完成一个练习任务并获得成长反馈”，用户目标偏学习推进。
- 阶段是长期成长状态，由等级决定；难度是本次任务筛选维度，由用户在面板上切换。
- 本轮任务卡仍是占位框架，不进入详情页、不发放 XP；完整闭环放到 Step 3.0-05。

## 代码级改动说明

- 新增局部 `difficulty` 状态，控制易 / 中 / 难任务列表展示。
- 当前等级、XP、阶段为静态框架数据，用于建立 UI 和信息结构。
- 删除首页下方 `defaultRecipes.map(...RecipeCard)` 展示，不删除菜谱 catalog 和结果页能力。
- 随机一道菜仍使用 `defaultRecipes` 或最近生成结果作为候选池。

## 运行与验证

- `npm.cmd run build`: passed
- Vite preview 页面可访问：`http://127.0.0.1:4173/cooking-ai-planner/`
- 已保存 after 截图：
  - `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_after/step-3.0-04-home.png`

## 本轮验收

- 首页下方不再是菜谱推荐区。
- 推荐任务面板基本框架已建立。
- 等级 / 阶段 / 进度条展示存在。
- 难度切换易 / 中 / 难可点击切换占位任务。

## Git 记录

Planned commit message:

```text
[step-3.0-04][feat] add recommended task panel framework
```

## 下一步建议

执行 Step 3.0-05：实现任务卡详情页、小教程页、“我做了”确认和 XP/等级更新闭环。

