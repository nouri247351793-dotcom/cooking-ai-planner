# Step 4.0-05 Prompt Log - Vercel Serverless API

Date: 2026-05-23

## User Prompt

执行step5

## Step Source

来自新版《小饭桌4.0 Codex × GitHub × Vercel AI部署 Record版执行手册》：

- Step 5：新增 Vercel Serverless API 接口
- 新增 `api/ai.js`
- 只接受 POST 请求
- 从服务端环境变量读取 `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL`
- 无 API Key 时返回 mock 并标记 `demoMode: true`
- AI 请求失败时返回可被前端识别的错误信息
- 尽量解析 AI 输出 JSON
- 完成后运行 `npm run build`
- 生成 `records/step-05-vercel-api-ai.md`

## Execution Notes

- 新增 `1_project_files/cooking-ai-planner/api/ai.js`
- API 文件放在 Vite 应用根目录下，匹配后续 Vercel Root Directory 预期
- 未写入真实 API Key
- build 与语法检查通过

## Next Step

等待用户确认后执行 Step 6：新增 `.env.example`。
