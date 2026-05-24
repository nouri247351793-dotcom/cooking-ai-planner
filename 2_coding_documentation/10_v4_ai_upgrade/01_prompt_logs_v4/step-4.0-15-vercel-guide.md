# Step 4.0-15 Prompt Log - Vercel Deployment Guide

Date: 2026-05-24

## User Request

执行 step15。

## Step Goal

新增或更新 Vercel 部署说明文档，让项目上传 GitHub 后可以按照说明完成 Vercel 部署和 AI 环境变量配置。

## Requirements From Manual

- 新增或更新 `docs/vercel-deployment-guide.md`。
- 说明如何将 GitHub 仓库导入 Vercel。
- Framework Preset 使用 `Vite`。
- Build Command 使用 `npm run build`。
- Output Directory 使用 `dist`。
- 说明 Vercel 环境变量：
  - `AI_API_KEY`
  - `AI_MODEL`
  - `AI_BASE_URL`
- 明确不要使用 `VITE_AI_API_KEY` 存放真实密钥。
- 说明无 API Key 时进入 demo 模式。
- 说明部署完成后的测试路径。
- 完成后运行 `npm run build`。
- 在 `records/step-15-vercel-guide.md` 中生成执行记录。

## Execution Notes

- 新增独立部署指南，覆盖 GitHub 导入、Vercel 构建设置、AI 环境变量、安全边界、demo 模式和部署后测试。
- README 顶部补充部署指南入口。
- 本步骤不修改业务逻辑。
- `npm.cmd run build` 已通过。
