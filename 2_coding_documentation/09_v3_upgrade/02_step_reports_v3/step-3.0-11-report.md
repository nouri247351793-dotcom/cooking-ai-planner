# Step 3.0-11 Report - Warm Light UI Token Retune

Date: 2026-05-23

## 本轮目标

将当前 3.0 UI 从深色大底块口径统一调整为浅暖灰白 token 体系，并把颜色、圆角、间距、按钮状态集中到 `tokens.css` 管理。

## 操作摘要

- 将页面主背景设为 `#F6F3EE`，主容器背景设为 `#F2EFE9`。
- 将首页输入主面板改为 `#EDE9E0`，输入框内部改为 `#FAF8F4`。
- 将计时器卡片改为浅暖灰 `#ECE7DD`，计时数字区使用 `#2E1F19`。
- 将主按钮 token 改为 `#F29A4A / #EA8C37 / #DF7F28` 三态。
- 将主容器、主模块、普通卡、输入框、主按钮圆角统一为 token。
- 将三栏间距、大模块间距、普通模块间距、卡片内部间距抽为 token。
- 将首页右侧标题前的 emoji 从行内装饰改为独立 `titleWithIcon` 图标位。

## 文件级改动说明

- `1_project_files/cooking-ai-planner/src/styles/tokens.css`
  - 新增/调整浅暖灰白颜色 token：`--c-page-bg`、`--c-main-container`、`--c-home-panel`、`--c-input-bg`、`--c-timer-bg`。
  - 新增按钮三态 token：`--c-primary`、`--c-primary-hover`、`--c-primary-active`。
  - 新增圆角 token：`--r-main-container`、`--r-module`、`--r-card`、`--r-input`、`--r-button`。
  - 新增间距 token：`--gap-columns`、`--gap-module-lg`、`--gap-module`、`--gap-card-inner`。
- `1_project_files/cooking-ai-planner/src/styles/app.css`
  - 将 dashboard shell、首页 hero、筛选面板、计时器、任务面板、按钮与表单控件改为读取统一 token。
  - 移除首页主操作区和计时器的大面积深色底块。
  - 统一主按钮 hover/active 表现。
  - 新增 `titleWithIcon` 与 `titleWithIcon__icon`，用于标题左侧图标位。
- `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
  - 随机一道菜、小贴士、省钱计划标题改为独立图标位结构。

## 代码级改动说明

无业务逻辑改动。未修改路由、hooks、services、localStorage schema、任务 XP、预算账本、菜谱生成、收藏、清单或最近做过逻辑。  
本轮仅调整样式 token、CSS 规则和标题展示结构。

## 验证结果

- `npm.cmd run build`: passed
- `git diff --check`: passed
- 备注：`git diff --check` 仅输出 LF/CRLF 工作区提示，不是样式或语法错误。

## Git 记录

Planned commit message:

```text
[step-3.0-11][style] retune v3 warm light UI tokens
```

当前状态：

- 本轮改动尚未提交。
- 本轮改动尚未 push。
- 当前分支在执行本轮前已处于 `main...origin/main [ahead 11]`。

## 本轮验收

- 浅暖灰白体系已集中落到 `tokens.css`。
- 首页输入主面板不再使用深色大底块。
- 输入框、计时器、主按钮、圆角和间距均已按指定 token 对齐。
- 标题左侧图标已作为图标位处理，不再只是行内装饰。
