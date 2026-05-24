# Step 4.0-16 Prompt Log - Online Test Checklist

Date: 2026-05-24

## User Request

执行 step16。

## Step Goal

生成小饭桌 4.0 上线后测试清单，方便用户在 Vercel 线上逐项验收。

## Requirements From Manual

- 新增 `docs/ai-deployment-test-checklist.md`。
- 内容包括：
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
- 完成后运行 `npm run build`。
- 在 `records/step-16-online-test-checklist.md` 中生成执行记录。
- record 包含新增测试清单、build 结果、当前是否达到 4.0 验收标准和下一步建议。

## Execution Notes

- 新增独立上线后测试清单，覆盖 demo 模式与真实 AI 模式。
- README 顶部补充上线后测试清单入口。
- 本步骤不修改业务逻辑。
- `npm.cmd run build` 已通过。
