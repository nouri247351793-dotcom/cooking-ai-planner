# Step 4.0-14 Prompt Log - GitHub Ready Check

Date: 2026-05-23

## User Request

执行 step14。

## Step Goal

执行 GitHub 上传前最终检查，确认项目干净、安全、可构建，并根据需要补充 README 部署说明。

## Requirements From Manual

- 运行 `npm run build`。
- 检查是否存在真实 API Key。
- 检查 `.env` 是否被 Git 跟踪。
- 检查 README 是否需要补充部署说明。
- 如果 README 缺少部署说明，补充本地运行方式、Vercel 环境变量配置、AI demo 模式说明。
- 在 `records/step-14-github-ready-check.md` 中生成执行记录。

## Execution Notes

- README 原有内容较旧且乱码，缺少 4.0 Vercel / demo 模式说明，因此已重写为当前 4.0 状态。
- Vite production base 原本偏向 GitHub Pages，已补充 Vercel 环境判断，避免 Vercel 根路径部署资源路径错误。
- 本步骤未执行 commit / push。
