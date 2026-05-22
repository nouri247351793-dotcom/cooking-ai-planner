# Step 3.0-06 Report - Budget Ledger Modal

Date: 2026-05-23

## 本轮目标

把右侧“省钱计划”从 mock 展示升级为可设置预算、可记录本月做饭开支、可自动计算开支进度的本地轻账本。

## AI 输出方案摘要

- 首页预算卡只保留摘要：本月预算、本月已花、进度条。
- 新增预算账本 hook，统一管理预算、开支记录和统计结果。
- 省钱计划弹窗支持首次设置预算、后续修改预算、新增本次做饭开支。
- 弹窗自动展示本月预算、本月已花、剩余预算、当前状态和本月项目记录。
- 数据存储在 localStorage，暂不接真实支付、AI 判断或远端数据库。

## 文件级改动说明

- `1_project_files/cooking-ai-planner/src/hooks/useBudgetLedger.js`
  - 新增预算账本状态、统计推导、预算更新和开支新增逻辑。
- `1_project_files/cooking-ai-planner/src/components/home/BudgetPlanModal.jsx`
  - 将原 mock 弹窗改为可交互预算账本弹窗。
- `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
  - 首页预算卡接入预算账本摘要；不再展示剩余预算和状态。
- `1_project_files/cooking-ai-planner/src/store/storageKeys.js`
  - 新增 `budgetLedger` localStorage key。
- `1_project_files/cooking-ai-planner/src/styles/app.css`
  - 新增预算设置、表单、记录列表和预算弹窗样式。
- `2_coding_documentation/09_v3_upgrade/...`
  - 新增本轮 prompt log、step report、flowchart、after 截图，并更新 issue/reflection/current status。

## 代码级改动说明

- 预算账本 localStorage key：`cooking_ai_planner.v3.budget_ledger.v1`。
- 状态结构：

```js
{
  monthlyBudget: number | '',
  expenses: [
    {
      id: string,
      amount: number,
      note: string,
      date: string
    }
  ],
  updatedAt: string
}
```

- 自动推导：
  - `spent`：当前月份开支总额
  - `remaining`：本月预算减本月已花
  - `usagePercent`：本月已花 / 本月预算
  - `status`：未设置预算 / 预算稳定 / 接近预算上限 / 已超出预算
- 首页只展示摘要，是为了保持右侧工具区轻量；开支录入、状态解释和记录列表属于二级弹窗信息。
- 预算系统与任务系统解耦：任务系统记录成长 XP，预算系统记录真实开支，两者数据含义不同，不能混在同一个状态模型里。

## 运行与验证

- `npm.cmd run build`: passed
- Vite preview 访问地址：`http://127.0.0.1:4173/cooking-ai-planner/`
- 已保存 after 截图：
  - `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_after/step-3.0-06-home.png`
  - `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_after/step-3.0-06-budget-modal.png`

## Git 记录

Planned commit message:

```text
[step-3.0-06][feat] add monthly budget modal and expense record logic
```

## 本轮验收

- 首页省钱计划卡只显示预算摘要和进度条。
- 未设置预算时，弹窗优先要求填写本月预算。
- 已设置预算后，弹窗显示概览、修改预算、新增开支和本月记录列表。
- 每条开支记录包含 `id / amount / note / date`。
- 本月总开支、剩余预算和使用比例由系统自动计算。

## 下一步建议

执行 Step 3.0-07 时，可以继续统一随机一道菜、做饭小贴士和已有一级页面的 3.0 UI 规范。
