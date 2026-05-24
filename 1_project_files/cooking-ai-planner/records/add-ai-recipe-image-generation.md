# Record：新增菜谱图片 AI 生成能力

日期：2026-05-24

## 本轮目标

为小饭桌菜谱详情页接入 SiliconFlow 图片生成能力，替换原先只显示 mock 辅助图的实现。

## 操作摘要

- 新增后端图片生成 API：`api/image.js`。
- 前端菜谱详情页通过后端 `/api/image` 请求图片，不直接调用第三方 API。
- 菜谱封面图根据菜名、核心食材、步骤摘要生成 prompt。
- 步骤辅助图根据菜名、核心食材、当前步骤文字生成 prompt。
- 图片生成成功后替换 mock 图；失败时继续显示 mock 占位，不阻断页面使用。
- 使用 `localStorage` 缓存生成结果，key 为 `xiaofanzhuo_ai_recipe_images`。
- 图片加载中显示“正在生成辅助图...”。

## 文件级改动说明

- `api/image.js`
  - 新增 SiliconFlow 图片生成代理 API。
  - 请求地址：`/images/generations`。
  - 环境变量：`AI_API_KEY`、`IMAGE_MODEL`、`IMAGE_BASE_URL`。
  - 默认模型：`Qwen/Qwen-Image`。
  - 默认 baseURL：`https://api.siliconflow.cn/v1`。
  - 失败时返回 mock fallback 信息，不暴露完整 API Key。
- `src/services/stepImageService.js`
  - 从纯 mock 改为优先调用 `/api/image`。
  - 新增菜谱封面图生成方法 `generateRecipeCoverImage()`。
  - 保留步骤图生成方法 `generateStepImage()`。
  - 新增缓存 key：`xiaofanzhuo_ai_recipe_images`。
- `src/pages/RecipeDetailPage.jsx`
  - 菜谱详情 hero 图接入 AI 封面图生成。
  - 步骤图传入核心食材，并在 loading 时显示“正在生成辅助图...”。
- `src/styles/app.css`
  - 为详情页封面图增加 loading 浮层样式。
- `.env.example`
  - 新增 `IMAGE_MODEL=Qwen/Qwen-Image`。
  - 新增 `IMAGE_BASE_URL=https://api.siliconflow.cn/v1`。

## 代码级改动说明

- API Key 只在后端 `api/image.js` 中通过 `process.env.AI_API_KEY` 读取。
- 前端只调用项目自己的 `/api/image`，不存在前端直连 SiliconFlow 或暴露 key。
- 图片生成失败、缺少 key、上游异常、JSON 解析失败均返回可用 fallback，不影响页面。
- 成功生成的图片会写入 localStorage，避免重复打开详情页时立即重复生成。

## 验证结果

```bash
npm.cmd run build
```

结果：通过。

构建产物：

- `dist/index.html`
- `dist/assets/index-B09MlxJT.css`
- `dist/assets/index-C-FbFwkC.js`

## 后续注意

- Vercel 需要配置 `AI_API_KEY`、`IMAGE_MODEL`、`IMAGE_BASE_URL` 后，线上图片生成才会真实调用 SiliconFlow。
- 如果 SiliconFlow 返回的图片 URL 有有效期，缓存会在约 50 分钟后过期并重新生成。
