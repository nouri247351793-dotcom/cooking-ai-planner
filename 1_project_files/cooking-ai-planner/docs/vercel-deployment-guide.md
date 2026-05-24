# 小饭桌 4.0 Vercel 部署指南

本文用于把 GitHub 上的“小饭桌”项目部署到 Vercel，并启用 4.0 的 AI 做饭建议能力。

## 适用版本

- 项目：小饭桌 Cooking AI Planner
- 当前阶段：4.0 AI 接入与 Vercel 部署准备
- 前端框架：Vite + React
- 后端接口：Vercel Serverless Function `api/ai.js`

## 一、从 GitHub 导入 Vercel

1. 登录 Vercel。
2. 点击 `Add New...` → `Project`。
3. 选择 GitHub 账号，并导入 `cooking-ai-planner` 仓库。
4. 如果 Vercel 没有显示仓库，先确认 GitHub 授权里已经允许 Vercel 访问该仓库。

## 二、项目构建配置

因为应用源码在仓库子目录内，Vercel 项目需要按下面配置：

| 配置项 | 值 |
|---|---|
| Root Directory | `1_project_files/cooking-ai-planner` |
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

确认后点击 `Deploy`。

## 三、配置 AI 环境变量

进入 Vercel 项目：

`Project Settings` → `Environment Variables`

新增以下变量：

| 变量名 | 是否必填 | 示例 | 说明 |
|---|---:|---|---|
| `AI_API_KEY` | 是 | 不要写入仓库 | 真实 AI 服务密钥，只能配置在 Vercel 后台 |
| `AI_MODEL` | 否 | `gpt-4o-mini` | 使用的模型名称，未配置时后端会使用默认值 |
| `AI_BASE_URL` | 否 | `https://api.openai.com/v1` | OpenAI 兼容接口地址 |

配置后建议重新部署一次：

1. 打开 Vercel 项目的 `Deployments`。
2. 找到最新部署。
3. 点击 `Redeploy`。

## 四、不要把真实密钥放到前端

不要使用下面这种方式保存真实密钥：

```text
VITE_AI_API_KEY=真实密钥
```

原因：

- `VITE_` 开头的变量会被 Vite 暴露到前端构建产物里。
- GitHub 仓库公开后，前端代码和构建文件都可能被直接查看。
- 本项目的正确方式是：前端只请求 `/api/ai`，真实密钥只由 Vercel Serverless API 从 `process.env.AI_API_KEY` 读取。

本地和仓库里只保留 `.env.example`，不要提交 `.env` 或 `.env.local`。

## 五、无 API Key 时的 demo 模式

如果没有配置 `AI_API_KEY`，或者 AI 服务请求失败，应用不会直接报错停止。

当前逻辑会自动进入 demo/mock 模式：

- 首页仍会显示做饭建议。
- 推荐菜谱仍会展示。
- `shoppingList` 仍可同步到待购清单。
- AI 推荐菜谱仍可收藏。
- 页面会提示“当前为演示模式，AI 内容由示例数据生成。”

这方便先完成线上预览，再补充真实 AI Key。

## 六、部署后测试

部署成功后，打开 Vercel 分配的网址，按下面顺序检查：

1. 打开首页，确认页面样式和 logo 正常显示。
2. 进入“开始做饭”。
3. 输入需求，例如：`我只有 15 分钟，预算 10 元，想做简单晚饭。`
4. 点击“生成菜谱”。
5. 检查是否出现 loading。
6. 检查 AI 结果是否展示：
   - 回答摘要
   - 推荐菜谱
   - 做饭步骤
   - 小贴士
7. 检查推荐结果中的待购清单是否同步到“待购清单”页面。
8. 点击收藏 AI 推荐菜谱，检查“我的收藏”页面是否显示。
9. 刷新页面，检查 localStorage 数据是否保留。
10. 如果未配置 `AI_API_KEY`，确认 demo 模式提示正常出现。
11. 如果已配置 `AI_API_KEY`，确认结果不是固定 mock 内容。

## 七、常见问题

### 页面能打开，但 AI 一直是 demo 模式

优先检查：

- Vercel 是否配置了 `AI_API_KEY`。
- 环境变量是否应用到了当前部署环境。
- 配置变量后是否重新部署。
- `AI_BASE_URL` 是否是 OpenAI 兼容接口。

### 页面资源 404 或样式丢失

优先检查：

- Vercel 的 `Root Directory` 是否为 `1_project_files/cooking-ai-planner`。
- 是否使用了当前版本的 `vite.config.js`。
- 是否重新部署了最新 GitHub commit。

### GitHub Pages 能打开，但没有真实 AI

这是预期行为。

GitHub Pages 只能托管静态前端，不能运行 `api/ai.js`。需要真实 AI 能力时，请使用 Vercel 部署。

## 八、上线前建议

- 先提交并推送当前 4.0 代码到 GitHub。
- 确认 `.env`、`.env.local`、`node_modules`、`dist` 未被提交。
- 在 Vercel 中配置环境变量，不要把真实 key 写进代码。
- 部署后使用测试清单逐项验收。
