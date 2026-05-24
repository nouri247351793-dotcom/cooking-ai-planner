# Step 5 执行记录：新增 Vercel Serverless API 接口

日期：2026-05-23

## 执行目标

新增 Vercel Serverless API 接口，让前端后续通过 `/api/ai` 访问服务端代理，由服务端读取环境变量并调用 AI，避免 API Key 暴露在浏览器和 GitHub 仓库中。

## 实际修改

- 新增 `api/ai.js`。
- 接口只接受 `POST` 请求，`OPTIONS` 用于预检响应。
- 接收前端传入的：
  - `userMessage`
  - `context`
- 从服务端环境变量读取：
  - `AI_API_KEY`
  - `AI_MODEL`
  - `AI_BASE_URL`
- 未写入真实 API Key。
- 未修改页面 UI。

## 涉及文件

- `api/ai.js`
- `src/data/mockAIResponse.js`
- `src/services/aiTypes.js`
- `records/step-05-vercel-api-ai.md`
- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-05-vercel-api-ai.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-05-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-05-vercel-api-ai.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## 环境变量读取方式

接口通过 `process.env` 读取服务端环境变量：

- `process.env.AI_API_KEY`
- `process.env.AI_MODEL`
- `process.env.AI_BASE_URL`

默认值：

- `AI_MODEL` 未配置时使用 `gpt-4o-mini`
- `AI_BASE_URL` 未配置时使用 `https://api.openai.com/v1`

真实变量应在 Vercel Project Settings → Environment Variables 中配置，不应写入前端代码或 `.env` 提交到 GitHub。

## demoMode 处理方式

当 `AI_API_KEY` 未配置时，接口直接返回 `mockAIResponse`，并附加：

- `demoMode: true`
- `source: "mock"`
- `fallbackReason: "missing_api_key"`

## 错误处理方式

以下情况会回退 mock 数据，并返回可被前端识别的错误信息：

- AI provider HTTP 请求失败
- AI provider 返回非 2xx
- AI 返回内容无法解析为 JSON
- AI 返回 JSON 不符合 Step 3 的结构
- 服务端调用过程抛出异常

回退响应会附加：

- `demoMode: true`
- `source: "mock"`
- `fallbackReason`
- `error.code`

## JSON 解析策略

- 优先读取 OpenAI-compatible `chat/completions` 的 `choices[0].message.content`。
- 如果内容包含 ```json 代码块，会提取代码块内部。
- 如果内容是混合文本，会尝试截取第一个 `{` 到最后一个 `}` 之间的 JSON。
- 解析后使用 `isAIResponse()` 校验结构，再通过 `normalizeAIResponse()` 规范化输出。

## 测试结果

- 已运行：`npm.cmd run build`
- 结果：通过
- 已运行：`node --check api\ai.js`
- 结果：通过
- 已运行：无 `AI_API_KEY` 场景下直接调用 `api/ai.js` handler
- 结果：返回 HTTP `200`，响应包含 `demoMode` 与 `missing_api_key`
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-yYwa312i.css`
  - `dist/assets/index-gaH9Lqu3.js`
- 构建耗时：约 777ms

## 当前状态

Step 5 已完成。项目已有 `/api/ai` Serverless 接口，但真实 AI 调用需要在 Vercel 环境变量中配置 `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL`。

## 下一步建议

等待用户确认后，再执行 Step 6：新增 `.env.example`，并确认 `.gitignore` 对真实环境变量文件的保护。
