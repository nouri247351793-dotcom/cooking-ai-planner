# Step 3.0-08 Report - UI Tokens And Component Spec

Date: 2026-05-23

## 本轮目标

把 3.0 UI 升级从“页面级零散样式”整理为可复用的 token 与组件规范，减少后续继续堆叠一次性 CSS 的风险。

## AI 输出方案摘要

- 扩展 `tokens.css`，补齐 3.0 所需 spacing、radius、surface、button、badge、motion token。
- 统一默认 `card` 的圆角、边框、内边距和浅底层级。
- 新增 `card--soft / card--primary / card--deep` 三类卡片变体。
- 统一 `primaryBtn / secondaryBtn / ghostBtn / miniBtn` 的高度、圆角、字重和动效 token。
- 将 `v3PageHero`、`v3EmptyState` 等一级页规范与 token 对齐。
- 新增 `ui-spec-v3.md` 作为后续页面和组件的维护依据。

## 文件级改动说明

- `1_project_files/cooking-ai-planner/src/styles/tokens.css`
  - 新增 3.0 UI token：surface、border、radius、spacing、button height、badge、motion。
- `1_project_files/cooking-ai-planner/src/styles/app.css`
  - 默认卡片、按钮、一级页 hero 与 token 对齐。
  - 新增卡片变体：`card--soft / card--primary / card--deep`。
- `2_coding_documentation/09_v3_upgrade/ui-spec-v3.md`
  - 新增 3.0 UI 规范文档。
- `2_coding_documentation/09_v3_upgrade/...`
  - 新增本轮 prompt log、step report、flowchart，并更新 issue/reflection/current status。

## 代码级改动说明

- 无业务逻辑改动。
- 未修改路由、localStorage 数据结构、任务 XP、预算账本、菜谱生成、收藏、清单等业务状态。
- 本轮仅调整样式 token 和可复用 CSS 类。

## UI 规范落地说明

- 页面间距：
  - `--page-gap` 管理页面内主要区块间距。
  - `--module-gap` 管理卡片组间距。
- 卡片：
  - 默认 `card` 是浅底信息卡。
  - `card--deep` 用于主操作卡，例如输入区、计时器。
  - `card--primary` 用于需要轻强调的内容模块。
- 按钮：
  - `primaryBtn`：明确提交动作。
  - `secondaryBtn`：次级但可见的操作。
  - `ghostBtn`：返回、关闭、辅助导航。
  - `miniBtn`：局部轻操作。
- 主操作卡与浅底信息卡：
  - 主操作卡使用深底或更强阴影，承载用户当前要做的动作。
  - 浅底信息卡强调可扫读和复盘，不抢主操作焦点。

## 运行与验证

- `npm.cmd run build`: passed
- 截图状态：
  - before：参考 Step 3.0-07 已归档页面状态。
  - after：当前环境 headless Edge/Chrome 截图仍受 Crashpad 权限限制影响，未生成新截图；本轮在报告中记录原因。

## Git 记录

Planned commit message:

```text
[step-3.0-08][style] normalize v3 ui tokens and component rules
```

## 本轮验收

- spacing tokens、radius tokens、color tokens 已扩展。
- button styles 已按主按钮、次按钮、轻按钮、小按钮收敛。
- card variants 已形成。
- 主操作卡和浅底信息卡的区分已写入规范。
- `ui-spec-v3.md` 已建立。

## 下一步建议

执行 Step 3.0-09，集中检查 3.0 归档完整性、流程图和最终导出建议。
