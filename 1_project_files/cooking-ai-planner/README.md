# 小饭桌 Cooking AI Planner

> Vercel 部署细节见：`docs/vercel-deployment-guide.md`
> 上线后测试清单见：`docs/ai-deployment-test-checklist.md`

小饭桌是一个面向新手和学生场景的做饭规划网页应用。当前 4.6 版本在 4.5 功能优化基础上，继续打磨界面文案、主页布局、推荐任务空状态、侧边栏版本显示与轻量微动效，让整体体验更接近正式产品。

## 核心功能

- 首页输入做饭需求，生成 AI/demo 做饭建议。
- 展示推荐菜谱、整体做饭步骤、小贴士和预估时间。
- AI 生成的 `shoppingList` 可按菜谱分组同步到待购清单。
- AI 推荐菜谱以卡片形式展示，可进入详情页，也可收藏并在“我的收藏”页面查看。
- 推荐任务支持完成后刷新候选任务，XP 达标后自动升级。
- 省钱计划支持预算记录的新增、编辑和删除。
- 做饭计时开始后支持全局悬浮计时器，并可收纳到页面侧边。
- 随机一道菜会保留最近记录，可点击再次打开详情。
- 无 API Key 或接口失败时自动进入 demo 模式，不影响页面使用。
- 本地保留待购清单、收藏、最近做过、预算账本等记录。

## 技术栈

- Vite
- React
- React Router
- JavaScript
- LocalStorage
- Vercel Serverless Function：`api/ai.js`

## 项目结构

```text
1_project_files/cooking-ai-planner
├─ api/                  # Vercel Serverless API
├─ public/               # 静态资源
├─ records/              # 4.0 / 4.5 执行记录
├─ src/
│  ├─ components/         # 页面组件
│  ├─ data/               # mock / 示例数据
│  ├─ hooks/              # React hooks
│  ├─ pages/              # 路由页面
│  ├─ services/           # AI、收藏、待购清单等服务
│  ├─ store/              # 全局本地状态
│  └─ styles/             # UI 样式与 token
├─ .env.example
├─ package.json
└─ vite.config.js
```

## 本地运行

进入项目目录：

```bash
cd 1_project_files/cooking-ai-planner
npm install
npm run dev
```

Windows PowerShell 如遇脚本策略问题，可使用：

```bash
npm.cmd install
npm.cmd run dev
```

本地默认访问：

```text
http://localhost:5173/
```

## 构建

```bash
npm run build
```

构建产物输出到：

```text
dist/
```

`dist/` 不需要提交到 Git。

## Vercel 部署

从 GitHub 导入仓库后，建议在 Vercel 中配置：

- Root Directory：`1_project_files/cooking-ai-planner`
- Framework Preset：`Vite`
- Build Command：`npm run build`
- Output Directory：`dist`

需要在 Vercel Project Settings → Environment Variables 中配置：

- `AI_API_KEY`：填写真实 API Key，仅配置在 Vercel 后台
- `AI_MODEL`：例如 `gpt-4o-mini`
- `AI_BASE_URL`：例如 `https://api.openai.com/v1`

不要把真实 API Key 写入前端代码，也不要提交 `.env` 或 `.env.local`。

## 4.0 AI 说明

前端只请求项目内的 `/api/ai`，真实 AI Key 只在 Vercel Serverless API 中读取：

```text
前端页面 → /api/ai → AI 服务商
```

如果未配置 `AI_API_KEY`，或 AI 请求失败、超时、返回格式异常，应用会自动回退到 demo/mock 数据，并显示：

```text
当前为演示模式，AI 内容由示例数据生成。
```

demo 模式下仍可查看推荐菜谱、生成待购清单、收藏 AI 推荐菜谱。

## 4.5 更新摘要

4.5 版本主要围绕 AI 做饭流程后的可用性做优化：

- 推荐任务：修复任务完成后不刷新、XP 满后不升级的问题。
- 省钱计划：支持开支记录编辑和删除。
- AI 菜谱：生成结果卡片化，并复用现有菜谱详情页。
- 待购清单：移除独立“AI 生成清单”模块，AI 食材按对应菜谱分组。
- 做饭过程：新增全局悬浮计时器与步骤图片生成预留能力。
- 随机菜谱：保留最近随机记录，可再次打开详情。
- UI 体验：修复弹窗按钮布局，减少移动端和窄屏下的明显溢出风险。

## 4.6 更新摘要

4.6 版本主要围绕界面文案、页面布局和微交互动效进行优化：

- 首页输入区：删除开发阶段占位文案、demo/API Key 提示和识别占位说明。
- 推荐任务：优化任务完成后的空状态，并提供“刷新推荐任务”入口。
- 主页布局：统一桌面端主内容容器的上、右、下、左边距。
- 侧边导航：版本号改为从统一配置读取，当前显示为 `4.0`。
- 微动效：为导航、悬浮计时器、按钮、卡片和弹窗补充轻量过渡反馈。

## 当前版本

- 当前阶段：4.6 文字布局与微动效优化完成
- AI 接入方式：Vercel Serverless API
- 数据持久化：浏览器 LocalStorage
- 未包含：用户登录、数据库、真实图片识别、RAG 知识库

## GitHub Pages 说明

项目仍保留 GitHub Pages 静态预览兼容配置。GitHub Pages 只能运行前端静态页面，不能运行 `api/ai.js`；因此 Pages 环境会使用 demo/mock 模式。需要真实 AI 能力时，请使用 Vercel 部署。
