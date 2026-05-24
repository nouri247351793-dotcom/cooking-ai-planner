# Step 4.0-12 Prompt Log - Error Handling

Date: 2026-05-23

## User Request

执行 step12。

## Step Goal

为小饭桌 4.0 AI 接入做完整容错检查，确保 API 失败、JSON 失败、本地存储失败等场景下页面不崩溃。

## Requirements From Manual

- 检查并修复 AI API 请求失败。
- 检查并修复 API 请求超时。
- 检查并修复 AI 返回非 JSON 文本。
- 检查并修复 AI 返回字段不完整。
- 检查并修复 localStorage 读取失败。
- 检查并修复 localStorage 写入失败。
- 检查并修复用户输入为空。
- 检查并修复网络异常。
- 检查并修复 Vercel 环境变量未配置。
- 所有异常都必须不白屏、不导致页面崩溃、给用户友好提示、尽可能回退到 mock 数据。
- 完成后运行 `npm run build`。
- 生成 `records/step-12-error-handling.md`。

## Execution Notes

- 保留既有 mock fallback 主线。
- 补充 fallback reason 透传和前端友好提示。
- 增加 provider 请求超时兜底。
- 增加 AI shopping 原始 localStorage 写入失败兜底。
