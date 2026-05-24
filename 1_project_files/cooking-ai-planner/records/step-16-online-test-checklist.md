# Step 16 执行记录：上线后测试清单

日期：2026-05-24

## 执行目标

生成小饭桌 4.0 上线后测试清单，方便项目部署到 Vercel 后逐项检查首页、AI 生成、待购清单、收藏、demo 模式、真实 AI、localStorage、移动端和控制台状态。

## 新增测试清单

- `1_project_files/cooking-ai-planner/docs/ai-deployment-test-checklist.md`

测试清单覆盖：

- 首页能否打开
- 开始做饭页面能否输入需求
- AI loading 是否出现
- AI answer 是否显示
- 推荐 recipes 是否显示
- shoppingList 是否同步到待购清单
- 收藏按钮是否有效
- 我的收藏页面是否显示收藏菜谱
- 无 API Key 时 demo 模式是否正常
- API Key 配置后真实 AI 是否正常
- 刷新页面后 localStorage 数据是否保留
- 手机尺寸下 UI 是否可用
- 控制台是否有明显报错

## 实际修改

- 新增 `docs/ai-deployment-test-checklist.md`
- 更新 `README.md`，增加上线后测试清单入口
- 新增 Step 16 prompt log、step report、flowchart 与主 record
- 更新 v4 当前状态、宏观流程、问题记录、复盘记录和 commit index

## 是否修改业务代码

无业务代码改动，仅新增/更新测试文档与归档记录。

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
- 构建耗时：约 650ms

## 当前是否达到 4.0 验收标准

本地代码与文档层面已达到 4.0 验收准备状态：

- 3.0 页面结构基本保留
- 开始做饭页面已接入 AI 服务层
- AI response 支持菜谱建议、待购清单、做饭步骤和 tips
- 待购清单页面可读取 AI 同步结果
- AI 推荐菜谱可收藏并在“我的收藏”展示
- 无 API Key / 请求失败时可进入 demo/mock 模式
- API 请求失败时页面有 fallback，不应白屏
- GitHub 上传前安全与构建检查已完成
- Vercel 部署说明已完成
- 每一步均有 record 文件
- `npm run build` 通过

仍需线上实际验证：

- GitHub 最终 commit / push
- Vercel 实际部署
- Vercel 环境变量配置后的真实 AI 调用
- 线上浏览器与手机尺寸测试

## 下一步建议

下一步建议执行 4.0 最终提交与推送前检查，并在用户明确授权后提交、推送到 GitHub，再按 Vercel 部署指南完成线上部署。
