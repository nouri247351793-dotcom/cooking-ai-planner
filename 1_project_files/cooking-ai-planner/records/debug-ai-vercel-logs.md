# Debug 记录：Vercel Logs AI 请求排查

日期：2026-05-24

## 本轮目标

为真实 AI 请求链路补充 Vercel Logs 可见的 debug/error 日志，方便排查页面为什么回退到演示模式。

## 操作摘要

- 在后端请求 AI 前输出环境检查日志。
- 在后端收到上游响应后输出 upstream status。
- 在上游失败、JSON 解析失败、请求异常时输出结构化错误日志。
- 保留 mock fallback，并在 fallback 返回中增加 `debugMessage`。
- 前端 fallback 也补充 `debugMessage`，但不暴露 API Key。
- AI 请求 timeout 调整为 60000ms。

## 文件级改动说明

- `api/ai.js`
  - 新增 `[AI DEBUG] env check`，输出 `hasApiKey`、短 key 预览、`AI_MODEL`、`AI_BASE_URL`。
  - 新增 `[AI DEBUG] upstream status`，输出真实上游 HTTP 状态码。
  - 新增 `[AI ERROR] upstream failed`，输出上游失败状态、状态文本和响应正文。
  - 新增 `[AI ERROR] JSON parse failed`，输出解析失败的原始内容片段和错误信息。
  - 新增 `[AI ERROR] request failed`，输出请求异常 message 和 stack。
  - mock fallback 返回增加 `debugMessage`。
- `src/services/aiService.js`
  - 前端 mock fallback 返回增加 `debugMessage`。
  - 保持前端请求 timeout 为 60000ms。

## 代码级改动说明

- 不打印完整 API Key，只打印 `slice(0, 6)` 与末尾 4 位组成的短预览。
- API Key 仍只在 `api/ai.js` 后端函数中通过 `process.env.AI_API_KEY` 读取。
- 前端 `src/services/aiService.js` 不读取、不打印、不传递完整 API Key。
- 后端真实 AI 请求成功时继续返回真实结果，不触发 mock fallback。
- 后端真实 AI 请求失败时保留 mock fallback，并通过 `debugMessage` 提醒查看 Vercel Logs。

## 验证结果

```bash
npm.cmd run build
```

结果：通过。

构建产物：

- `dist/index.html`
- `dist/assets/index-BiXBM7Dk.css`
- `dist/assets/index-Stk-dxfJ.js`

## 后续排查建议

- 部署到 Vercel 后，在 Functions / Runtime Logs 中搜索 `[AI DEBUG]` 和 `[AI ERROR]`。
- 优先检查：
  - `hasApiKey` 是否为 `true`
  - `model` 是否为预期模型
  - `baseUrl` 是否为硅基流动兼容 OpenAI 的接口地址
  - `upstream status` 是否为 200
  - `upstream failed.body` 是否提示鉴权、模型名、额度或参数问题
