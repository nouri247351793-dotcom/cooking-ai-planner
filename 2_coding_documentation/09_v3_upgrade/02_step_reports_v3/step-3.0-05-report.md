# Step 3.0-05 Report - Task Detail And XP Loop

Date: 2026-05-22

## 本轮目标

把 Step 3.0-04 的推荐任务面板从“展示框架”推进为可点击、可学习、可手动完成、可获得 XP 的任务闭环。

## AI 输出方案摘要

- 新增固定任务目录，按简单 / 中等 / 困难组织任务。
- 首页推荐任务卡接入真实任务数据，显示难度、XP、预计时间、阶段和小教程入口。
- 新增任务详情页，展示目标、教程步骤和完成标准。
- 新增本地任务进度状态，用户点击“我做了”后写入已完成任务并增加 XP。
- 等级和阶段由 XP 自动推导，刷新页面后仍保留状态。

## 文件级改动说明

- `1_project_files/cooking-ai-planner/src/data/taskCatalog.js`
  - 新增 `TASK_DIFFICULTIES`、`TASK_CATALOG`、任务查询函数和难度元信息。
- `1_project_files/cooking-ai-planner/src/hooks/useTaskProgress.js`
  - 新增任务进度 hook，负责 XP、等级、阶段、已完成任务和 localStorage 写入。
- `1_project_files/cooking-ai-planner/src/components/home/RecommendedTasksPanel.jsx`
  - 从占位任务升级为真实任务卡，并加入任务详情入口。
- `1_project_files/cooking-ai-planner/src/pages/TaskDetailPage.jsx`
  - 新增任务详情 / 小教程页和“我做了”确认入口。
- `1_project_files/cooking-ai-planner/src/App.jsx`
  - 新增 `/tasks/:taskId` 路由。
- `1_project_files/cooking-ai-planner/src/components/AppLayout.jsx`
  - 为任务详情页补充页面标题与返回行为。
- `1_project_files/cooking-ai-planner/src/store/storageKeys.js`
  - 新增 `taskProgress` 本地存储 key。
- `1_project_files/cooking-ai-planner/src/styles/app.css`
  - 新增任务卡完成态、详情页、信息网格和完成确认卡样式。
- `2_coding_documentation/09_v3_upgrade/...`
  - 新增本轮 prompt log、step report、flowchart、after 截图，并更新 issue/reflection/current status。

## 代码级改动说明

- 任务难度固定映射为：简单 +5 XP，中等 +10 XP，困难 +15 XP。
- 任务进度 localStorage key：`cooking_ai_planner.v3.task_progress.v1`。
- 状态结构：

```js
{
  totalXp: number,
  completedTaskIds: string[],
  updatedAt: string
}
```

- 等级规则：`Math.floor(totalXp / 50) + 1`。
- 阶段规则：
  - Lv.1-Lv.10：小试灶台
  - Lv.11-Lv.20：渐入佳境
  - Lv.21+：熟能生巧
- 完成逻辑为手动确认，不做真实识别；同一任务重复点击不会重复发放 XP。

## 运行与验证

- `npm.cmd run build`: passed
- Vite preview 访问地址：`http://127.0.0.1:4173/cooking-ai-planner/`
- 已保存 after 截图：
  - `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_after/step-3.0-05-home.png`
  - `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_after/step-3.0-05-task-detail.png`

## Git 记录

Planned commit message:

```text
[step-3.0-05][feat] implement task tutorial page and XP flow
```

## 本轮验收

- 首页推荐任务卡可按难度展示真实任务。
- 每张任务卡可进入任务详情 / 小教程页。
- 任务详情页包含目标、步骤、标准和奖励信息。
- “我做了”按钮可手动完成任务并发放 XP。
- 已完成任务不会重复发放 XP。
- 等级、阶段、XP 进度会根据本地状态更新。

## 下一步建议

执行 Step 3.0-06 时，可继续扩展预算账本、任务推荐策略或任务完成后的复盘记录；不要在当前 3.0-05 中接入真实 AI 判断。
