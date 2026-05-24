# Step 8 执行记录：接入“开始做饭”页面

日期：2026-05-23

## 执行目标

将首页“开始做饭”主输入区接入 `askAI(userMessage, context)` 服务，让用户输入需求后可以触发 4.0 AI/demo 生成流程，并在首页展示 `answer`、`recipes`、`cookingSteps` 和 `tips`。

## 实际修改

- 在 `HomePage.jsx` 中引入 `askAI()`。
- 新增首页 AI 状态：
  - `aiStatus`
  - `aiResult`
  - `aiError`
- 新增 `buildHomeAIContext()`，从页面已有条件整理 context：
  - 人数
  - 预算
  - 可用时间
  - 厨具条件
  - 上传照片占位信息
  - 本月预算摘要
- 新增 `AIResultPanel`，用于显示：
  - loading：`AI 正在生成做饭建议…`
  - demo 模式标签
  - `answer`
  - `recipes`
  - `cookingSteps`
  - `tips`
  - error 友好提示
- 保留原有 mock 菜谱生成调用 `generate()`，用于维持既有 mock 状态和随机菜逻辑。
- 更新首页输入提示文案，说明无 API Key 时自动使用演示数据。
- 新增 AI 结果卡片样式，保持当前浅暖色 UI 风格。

## 涉及文件

- `src/pages/HomePage.jsx`
- `src/components/home/HomeHero.jsx`
- `src/styles/app.css`
- `src/services/aiService.js`
- `records/step-08-start-cooking-ai.md`
- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-08-start-cooking-ai.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-08-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-08-start-cooking-ai.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## 新增状态

- `aiStatus`: `idle | loading | success | demo | error`
- `aiResult`: 保存 `askAI()` 返回的统一 AI 响应
- `aiError`: 保存首页可显示的错误提示

## AI 调用流程

1. 用户在首页输入需求。
2. 点击“生成菜谱”或按 Enter。
3. 首页整理 context。
4. 并行调用：
   - `askAI(inputText, context)`
   - 原有 `generate()` mock 菜谱生成
5. `askAI()` 成功后展示 AI 建议。
6. 如果返回 `demoMode: true`，页面显示“演示模式”标签。
7. 如果调用异常，页面显示友好错误提示，不白屏。

## loading 和 error 处理

- loading 文案：`AI 正在生成做饭建议…`
- 按钮 loading 文案：`AI 生成中…`
- error 文案：`AI 生成失败，请稍后再试。`
- 失败时保留页面结构，不影响右侧工具区和推荐任务区。

## 测试结果

- 已运行：`npm.cmd run build`
- 结果：通过
- 已运行：Node 直接调用 `askAI()` 无 `/api/ai` 场景
- 结果：返回 `demoMode: true`、`fallbackReason: request_failed`，且 `recipes` 为数组
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-Cr9N7Gq8.css`
  - `dist/assets/index-DULMG0SQ.js`
- 构建耗时：约 783ms

## 当前状态

Step 8 已完成。首页已能调用 `askAI()` 并展示 AI/demo 结果；待购清单和收藏页联动尚未接入。

## 下一步建议

等待用户确认后，再执行 Step 9：接入“待购清单”页面，让 AI 返回的 `shoppingList` 同步到 localStorage。
