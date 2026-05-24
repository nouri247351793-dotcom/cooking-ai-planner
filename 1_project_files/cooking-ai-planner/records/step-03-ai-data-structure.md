# Step 3 执行记录：建立 AI 数据结构与 mock 回退数据

日期：2026-05-23

## 执行目标

为“小饭桌”4.0 新增统一 AI 返回数据结构与 mock 回退数据，保证后续无 API Key、API 失败或 Vercel API 尚未接入时，页面仍有稳定的数据格式可用。

## 实际修改

- 新增 `src/services/aiTypes.js`，定义 4.0 AI 返回结构的 JSDoc 类型、schema 版本、空响应创建函数、结构校验函数和规范化函数。
- 新增 `src/data/mockAIResponse.js`，提供符合大学生做饭场景的 mock AI 响应。
- 未修改页面 UI。
- 未接入真实 AI。

## 涉及文件

- `src/services/aiTypes.js`
- `src/data/mockAIResponse.js`
- `records/step-03-ai-data-structure.md`
- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-03-ai-data-structure.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-03-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-03-ai-data-structure.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## 数据结构说明

AI 返回结构统一为：

- `answer: string`
- `recipes: AIRecipe[]`
- `shoppingList: AIShoppingItem[]`
- `cookingSteps: string[]`
- `estimatedTime: string`
- `tips: string[]`

其中 `recipes` 每项包含：

- `id`
- `title`
- `description`
- `ingredients`
- `steps`
- `estimatedTime`
- `difficulty`
- `tags`

其中 `shoppingList` 每项包含：

- `id`
- `name`
- `amount`
- `category`
- `checked`

## mock 内容摘要

mock 回退数据提供一套适合大学生/新手做饭的方案：

- 主菜：番茄鸡蛋盖饭
- 配菜：蒜蓉青菜
- 待购清单：鸡蛋、番茄、青菜、蒜
- 做饭步骤：先备菜，再做主菜，再快炒青菜，最后装盘
- 小贴士：电煮锅替代、预算不足替换方案、番茄出汁技巧

## 测试结果

- 已运行：`npm.cmd run build`
- 结果：通过
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-yYwa312i.css`
  - `dist/assets/index-gaH9Lqu3.js`
- 构建耗时：约 735ms

## 当前状态

Step 3 已完成。AI 数据结构和 mock 回退数据已经建立，后续可以在 Step 4 新增前端 `askAI(userMessage, context)` 服务层并复用该结构。

## 下一步建议

等待用户确认后，再执行 Step 4：新增前端 AI 服务层。
