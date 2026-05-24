# Step 4 执行记录：新增前端 AI 服务层

日期：2026-05-23

## 执行目标

新增前端 AI 服务层，让页面后续统一通过 `askAI(userMessage, context)` 调用项目内部接口 `/api/ai`，并在接口不存在、请求失败、超时或返回格式错误时自动回退到 mock 数据。

## 实际修改

- 新增 `src/services/aiService.js`。
- 导出 `askAI(userMessage, context, options)`。
- 默认请求项目内部接口 `/api/ai`。
- 请求方法使用 `POST`。
- 请求体包含：
  - `userMessage`
  - `context`
- 新增超时控制，默认 `12000ms`。
- 新增 mock 回退能力，回退数据来自 `src/data/mockAIResponse.js`。
- 未修改页面 UI。
- 未在页面组件中写入真实 AI API 请求。
- 未写入任何 API Key。

## 涉及文件

- `src/services/aiService.js`
- `src/services/aiTypes.js`
- `src/data/mockAIResponse.js`
- `records/step-04-ai-service.md`
- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-04-ai-service.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-04-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-04-ai-service.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## askAI 调用方式

```js
import { askAI } from './services/aiService.js'

const result = await askAI('我只有 20 分钟，想做一人份晚饭', {
  budget: 'low',
  servings: 1,
  equipmentLimit: 'dormPot',
})
```

返回结果至少包含统一 AI 数据字段：

- `answer`
- `recipes`
- `shoppingList`
- `cookingSteps`
- `estimatedTime`
- `tips`

服务层还会保留轻量元信息：

- `demoMode`
- `source`
- `fallbackReason`

## 回退逻辑说明

以下情况会自动返回 mock 数据，并标记 `demoMode: true`：

- 当前环境没有 `fetch`
- `/api/ai` 请求失败
- HTTP 状态码非 2xx
- 请求超时
- 响应不是合法 JSON
- 响应结构不符合 Step 3 的 AI 数据结构

## 测试结果

- 已运行：`npm.cmd run build`
- 结果：通过
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-yYwa312i.css`
  - `dist/assets/index-gaH9Lqu3.js`
- 构建耗时：约 791ms

## 当前状态

Step 4 已完成。前端 AI 服务层已建立，但页面尚未接入该服务，Vercel Serverless API 也尚未创建。

## 下一步建议

等待用户确认后，再执行 Step 5：新增 Vercel Serverless API 接口 `api/ai.js`。
