# Step 15 执行记录：Vercel 部署说明生成

日期：2026-05-24

## 执行目标

新增独立 Vercel 部署说明文档，让当前 4.0 版本上传 GitHub 后，可以按照明确步骤导入 Vercel、配置构建参数、配置 AI 环境变量并完成线上测试。

## 新增文档

- `1_project_files/cooking-ai-planner/docs/vercel-deployment-guide.md`

## 部署配置摘要

Vercel 推荐配置：

- Root Directory：`1_project_files/cooking-ai-planner`
- Framework Preset：`Vite`
- Install Command：`npm install`
- Build Command：`npm run build`
- Output Directory：`dist`

环境变量：

- `AI_API_KEY`：真实 AI Key，只配置在 Vercel 后台，不写入仓库
- `AI_MODEL`：模型名，例如 `gpt-4o-mini`
- `AI_BASE_URL`：OpenAI 兼容接口地址，例如 `https://api.openai.com/v1`

安全说明：

- 不使用 `VITE_AI_API_KEY` 保存真实密钥。
- 前端只请求 `/api/ai`。
- 真实密钥只由 Vercel Serverless API 从 `process.env.AI_API_KEY` 读取。
- 未配置 API Key 或请求失败时进入 demo/mock 模式。

## 实际修改

- 新增 `docs/vercel-deployment-guide.md`。
- 在 `README.md` 顶部增加独立部署指南入口。
- 新增 Step 15 prompt log、step report、flowchart 与主 record。
- 更新 v4 当前状态、宏观流程、问题记录、复盘记录和 commit index。

## 是否修改业务代码

无业务代码改动，仅新增/更新部署说明与归档记录。

## build 结果

命令：

```bash
npm.cmd run build
```

结果：

- build：通过
- 输出目录：`dist/`
- 输出文件：
  - `dist/index.html`
  - `dist/assets/index-CB7RBL7r.css`
  - `dist/assets/index-CbaJnyou.js`
- 构建耗时：约 932ms

## 当前状态

Step 15 已完成。项目具备 GitHub 上传后导入 Vercel 的文档说明。

## 下一步建议

执行 Step 16：生成上线后测试清单，用于 Vercel 部署完成后的逐项验收。
