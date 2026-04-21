# Step 2.0-15 Report（首页氛围 + 右侧辅助卡片改版 + 省钱计划弹窗）
日期：2026-04-21  
范围：Step 2.0-15（增量修正；不重建项目；不新增真实预算计算；不接真实 AI/云端能力；保留 mock provider 主路线）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-15-home-atmosphere-cards.md`

## 本轮目标

1) 首页与少量页面适度增加 emoji / 轻符号（克制、只点缀标题与列表项）  
2) 右侧“学做饭小贴士”改为更像“经验便签卡”  
3) 右侧“省钱计划”改为“学生生活预算卡”，并支持点击弹出预算详情弹窗（mock）  

## 为什么首页还不够有食欲/生活感不足

- 右侧辅助区目前更像普通说明文字块，缺少“可扫读的经验提示”和“生活化预算信息”的视觉结构。
- 适量的轻符号能在不改变配色/版式主系统的前提下，补上“做饭氛围”与“年轻化气质”。

## 我在哪些位置加入了 emoji / 轻符号（以及为什么不会杂乱）

策略：**只点缀标题（每块最多 1 个）+ 列表项用小图标引导扫读**；不在正文段落堆叠。

- 首页右侧卡片标题：贴士卡、预算卡
- 贴士卡每条建议前：用小 emoji 作为“提示符”
- 预算弹窗：标题与少量鼓励语使用 💰/✨/🥦/🍱（克制）

## 为什么“学做饭小贴士”需要改成提示卡

- 用户阅读场景是“快速扫一眼就能记住”：短句 + 图标引导比段落式说明更适合右侧辅助区。
- 视觉上用“虚线边框 + 便签 badge”增加“经验便签”识别度，仍保持暖中性色基调。

## 为什么“省钱计划”需要改成预算卡

- 数字信息（预算/已用/预计还能省）应该在卡片内直接被看到，才能形成“生活账本”的直觉。
- 进度条让用户一眼感知“用掉多少”，但仍然保持克制，不做金融后台风格。

## 省钱计划弹窗的内容结构与设计思路

- 沿用现有 modal 体系（遮罩 + 卡片容器 + 顶部关闭 + 底部按钮）
- 内容完全 mock，但按“概览 → 拆分 → 建议 → 本周思路 → 关闭”组织，层级清晰且可课堂讲解

## 修改文件清单（按类型区分）

### 文件级改动
- 新增：`1_project_files/cooking-ai-planner/src/components/home/BudgetPlanModal.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/styles/app.css`

### 代码级改动
- HomePage：新增 `budgetOpen` 状态；点击“省钱计划”打开弹窗；弹窗支持遮罩点击/ESC/右上角关闭

### 视觉样式级改动
- 贴士卡：`noteCard/noteList` 便签风排版（虚线边框、badge、小图标提示）
- 预算卡：`budgetCard/budgetMini` 预算卡排版（数字层级 + 进度条 + 轻量橙色点缀）
- 弹窗：复用 `modalOverlay/modalCard`，新增预算区块样式 `budgetModal__*`

### 交互级改动
- “省钱计划”卡片变为可点击按钮并弹窗展示（mock）

## before / after 截图说明位置

- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-15-home-atmosphere-cards/before/`
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-15-home-atmosphere-cards/after/`

## 最小验证（已执行）

- `npm.cmd run build`：通过
- dev server smoke：`http://127.0.0.1:5174/` 返回 200

建议你人工核对（验收点）：
- 首页右侧两张卡片排版更“便签/预算卡”
- 点击“省钱计划”可弹出弹窗，内容完整且可关闭
- 未破坏首页主流程（生成菜谱、随机一道菜等）

## 本轮建议 git 记录

- Commit message（建议）：
  - `[step-2.0-15][ux] redesign home aside cards + add budget plan modal (mock)`

## 下一轮建议（不在本轮执行）

1) 做 Step 2.0-16：集成/课堂演示打包（截图补齐、演示脚本、验收 checklist）
2) 若要更“食欲感”：优先补轻量插画素材位，而不是继续加 emoji

