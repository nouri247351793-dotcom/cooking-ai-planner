# Step 3.0-03 Report - Right Tools And Timer

Date: 2026-05-22

## 本轮目标

重构首页右侧工具区，明确“计时器 / 随机一道菜 / 做饭小贴士 / 省钱计划”的优先级，并优先实现可编辑倒计时器。

## AI 输出方案摘要

- 在右侧工具区顶部新增深底 `CookingTimerCard`。
- 计时器支持默认态、编辑态、计时中、结束态。
- 时间输入使用 `MM:SS` 格式，点击时间框可编辑，点击“开始计时”后开始倒计时。
- 随机一道菜、做饭小贴士、省钱计划保留浅底辅助卡层级。

## 文件级改动说明

- `1_project_files/cooking-ai-planner/src/components/home/CookingTimerCard.jsx`
  - 新增计时器组件。
  - 实现 MM:SS 解析、格式化、开始/暂停、重置、结束状态。
- `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
  - 将 `CookingTimerCard` 放在右侧工具区顶部。
  - 保留原有随机一道菜、贴士、省钱计划模块。
- `1_project_files/cooking-ai-planner/src/styles/app.css`
  - 新增 `timerCard` 深底卡样式。
  - 统一右侧卡片圆角、留白、按钮尺寸。
- `2_coding_documentation/09_v3_upgrade/...`
  - 新增本轮 prompt log、step report、flowchart、after 截图，并更新 issue/reflection/current status。

## 产品级改动说明

- 右侧工具区现在有明确优先级：计时器最高，其余三个工具为辅助。
- 计时器放在顶部，符合做饭场景中“看时间 / 设时间”的高频需求。
- 随机菜、贴士、省钱计划继续作为轻量入口，不抢主工具的视觉层级。

## 代码级改动说明

- 新增局部状态：`remainingSeconds`、`draftTime`、`timerState`。
- `timerState` 支持 `idle / editing / running / ended`。
- 使用 `window.setInterval` 每秒扣减时间，并在归零时进入结束态。
- 没有改动菜谱生成、随机菜、预算弹窗、收藏、购物清单等业务逻辑。

## 运行与验证

- `npm.cmd run build`: passed
- Vite preview 页面可访问：`http://127.0.0.1:4173/cooking-ai-planner/`
- 已保存 after 截图：
  - `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_after/step-3.0-03-home.png`

## 本轮验收

- 计时器可编辑时间并启动。
- 右侧工具区层级清楚：计时器为深底主工具，其余模块为浅底辅助工具。
- 计时器支持默认、编辑、计时中、结束状态。

## Git 记录

Planned commit message:

```text
[step-3.0-03][feat] add right rail timer tool
```

## 下一步建议

执行 Step 3.0-04：将首页下方原“今日灵感/推荐菜谱”区域替换为“推荐任务”面板，并建立等级/阶段/进度头部框架。

