# Debug 记录：AI 请求超时排查

日期：2026-05-24

## 本轮目标

排查 Vercel 已配置 `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL` 后，页面仍显示“AI 请求超时，已自动切换到示例数据”的问题，并延长前后端 AI 请求超时时间。

## 问题判断

- 后端 `api/ai.js` 原 AI provider 请求超时时间为 15000ms，部分模型或网络环境下可能不足。
- 前端 `src/services/aiService.js` 原 `askAI()` 请求超时时间为 12000ms，会比后端更早主动中断请求。
- 前端先超时会直接进入 mock/demo fallback，即使后端稍后可能拿到真实 AI 结果。

## 文件级改动说明

- `api/ai.js`
  - 将后端 AI provider 请求超时时间调整为 60000ms。
  - 增加 AI 上游失败日志，覆盖 upstream status、upstream response text、error message、`AI_MODEL`、`AI_BASE_URL`、API Key 是否存在。
  - API Key 日志只输出存在状态和短预览，不输出完整 key。
  - 保持真实 AI 请求成功时返回 `demoMode: false`、`source: 'ai'`，不回退 mock。
- `src/services/aiService.js`
  - 将前端 `askAI()` 请求超时时间调整为 60000ms。
  - 增加前端请求失败日志，覆盖请求端点、HTTP 状态、响应文本和错误信息。
  - 前端日志不包含 API Key，API Key 仍只在后端读取。

## 代码级改动说明

- 统一将前后端 AI 请求超时时间上调到 60000ms。
- 后端读取 provider 响应时先读取 `response.text()`，失败时可记录完整上游响应文本，再按 JSON 解析。
- 后端仅在缺少 key、provider HTTP 错误、provider 超时、JSON 解析失败或响应结构不合法时返回 mock/demo fallback。
- 后端真实 AI 返回结构合法时继续返回真实结果，不触发 mock fallback。

## 验证结果

```bash
npm.cmd run build
```

结果：通过。

构建产物：

- `dist/index.html`
- `dist/assets/index-BiXBM7Dk.css`
- `dist/assets/index-Bxc_biM9.js`

## 后续排查建议

- 如果 Vercel 上仍出现 timeout，请优先查看 Vercel Function 日志中的 `[xiaofanzhuo ai] upstream request failed`。
- 重点确认上游状态码、上游响应文本、实际 `AI_MODEL`、实际 `AI_BASE_URL` 和 API Key 是否存在。
- 如果日志显示请求超过 60000ms，需继续检查 Vercel Function 最大执行时长、模型响应速度和上游 API 网关稳定性。
