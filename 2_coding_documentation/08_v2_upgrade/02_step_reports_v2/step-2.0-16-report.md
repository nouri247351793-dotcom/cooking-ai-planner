# Step 2.0-16 Report（随机一道菜弹窗：轻量彩带/纸屑庆祝动效）
日期：2026-04-21  
范围：Step 2.0-16（小范围增强；不重建项目；不新增业务逻辑；不接真实 AI/云端能力；不引入重动画库）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-16-random-modal-confetti.md`

## 本轮目标

- 在“随机一道菜”弹窗出现时播放一次短时彩带/纸屑飞落动效
- 支持“再摇一次”再次触发一次短动画
- 动效不遮挡主要信息，不影响关闭/再摇一次/查看详情交互
- 动效结束自动清理，不残留 DOM

## 为什么要加轻量庆祝动效

- “随机抽中一道菜”是情绪价值很强的时刻；轻量庆祝能强化惊喜与反馈，让功能更有完成度与可演示性。
- 动效保持短时/克制，不抢内容，不让页面变“噪音”。

## 触发时机（规则对齐）

- 弹窗从关闭到打开：触发 1 次
- 点击“再摇一次”：触发 1 次
- 不循环播放；弹窗静止展示期间不持续飘
- 每次触发都会自动在约 1.45s 后自清理

## 如何避免遮挡与干扰交互

- 动效层 `pointer-events: none`，不会拦截按钮点击
- 动效层高度限制在弹窗上半区（`min(46vh, 260px)`），不会覆盖底部按钮区
- 通过 `z-index` 与 `isolation` 把动效放在内容背后：内容保持可读

## 颜色与风格选择

- 纸屑颜色取暖中性色 + 橙色主强调：`#ff7c24`、浅黄色、浅米色，少量浅绿/浅粉做点缀
- 避免高饱和霓虹与“夜店风”

## 修改文件清单（按类型区分）

### 文件级改动
- 修改：`1_project_files/cooking-ai-planner/src/components/home/RandomRecipeModal.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/styles/app.css`

### 代码级改动
- `RandomRecipeModal` 内新增 `ConfettiBurst`：生成少量纸屑元素（16 个），按随机参数下落并在 1.45s 后消失
- open 时与点击“再摇一次”时，递增 `burstKey` 触发一次性 burst
- 支持 `prefers-reduced-motion: reduce` 自动降级为无动效

### 动效级改动
- CSS `@keyframes confettiFall`：短时下落 + 横向漂移 + 旋转
- 不循环、不常驻

## before / after 截图说明位置

- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-16-random-modal-confetti/before/`
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-16-random-modal-confetti/after/`

## 最小验证（已执行）

- `npm.cmd run build`：通过
- dev server smoke：`http://127.0.0.1:5174/` 返回 200

建议你人工核对：
- 点击“随机一道菜”弹窗出现时：有一次彩带/纸屑飞落
- 点击“再摇一次”：可再次触发一次
- 关闭/查看详情/再摇一次点击不受影响
- 多次触发不会出现残留或越来越卡

## 本轮建议 git 记录

- Commit message（建议）：
  - `[step-2.0-16][ux] add lightweight confetti burst for random modal`

## 下一轮建议（不在本轮执行）

1) Step 2.0-17：集成/课堂演示打包（截图补齐、验收 checklist、演示脚本）

