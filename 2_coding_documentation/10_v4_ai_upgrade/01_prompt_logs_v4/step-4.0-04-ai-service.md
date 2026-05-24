# Step 4.0-04 Prompt Log - Frontend AI Service

Date: 2026-05-23

## User Prompt

执行step4

## Step Source

来自新版《小饭桌4.0 Codex × GitHub × Vercel AI部署 Record版执行手册》：

- Step 4：新增前端 AI 服务层
- 新增 `src/services/aiService.js`
- 导出 `askAI(userMessage, context)`
- 默认 POST 请求 `/api/ai`
- 失败、超时或格式错误时回退 `mockAIResponse`
- 不改动页面 UI
- 完成后运行 `npm run build`
- 生成 `records/step-04-ai-service.md`

## Execution Notes

- 新增 `src/services/aiService.js`
- 使用 `normalizeAIResponse()` 和 `isAIResponse()` 保证返回结构稳定
- 使用 `AbortController` 做请求超时控制
- 保留 `demoMode`、`source`、`fallbackReason` 元信息
- build 通过

## Next Step

等待用户确认后执行 Step 5：新增 Vercel Serverless API 接口。
