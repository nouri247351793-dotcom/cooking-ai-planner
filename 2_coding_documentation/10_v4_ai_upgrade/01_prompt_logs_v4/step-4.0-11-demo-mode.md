# Step 4.0-11 Prompt Log - Demo Mode Notice

Date: 2026-05-23

## User Request

执行 step11。

## Step Goal

为小饭桌 4.0 增加 demo 模式提示，让没有配置 API Key 或 AI 请求失败时，用户能明确知道当前 AI 内容来自示例数据。

## Requirements From Manual

- 当后端返回 `demoMode: true` 时，页面轻量显示：`当前为演示模式，AI 内容由示例数据生成。`
- demo 模式不要阻断用户操作。
- demo 模式下仍然可以查看推荐菜谱、生成待购清单、收藏菜谱。
- 有真实 API Key 时不显示 demo 提示。
- 保持 UI 风格统一。
- 完成后运行 `npm run build`。
- 生成 `records/step-11-demo-mode.md`。

## Execution Notes

- 复用 Step 8 已接入的 `result.demoMode`。
- 只新增轻量说明条，不新增弹窗，不改变业务状态。
- 提示放在 AI 结果卡片标题区下方、正文上方。
