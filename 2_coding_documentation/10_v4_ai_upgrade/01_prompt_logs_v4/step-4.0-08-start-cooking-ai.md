# Step 4.0-08 Prompt Log - Start Cooking AI Hookup

Date: 2026-05-23

## User Prompt

执行step8

## Step Source

来自新版《小饭桌4.0 Codex × GitHub × Vercel AI部署 Record版执行手册》：

- Step 8：接入“开始做饭”页面
- 用户输入需求后调用 `askAI(userMessage, context)`
- 请求过程中显示 `AI 正在生成做饭建议…`
- 成功后显示 `answer`、`recipes`、`cookingSteps`、`tips`
- 返回 demo/mock 数据时轻量提示演示模式
- 请求失败不能白屏
- 保留原有页面结构和视觉风格
- 不删除原有 mock 菜谱卡片
- 完成后运行 `npm run build`
- 生成 `records/step-08-start-cooking-ai.md`

## Execution Notes

- 首页引入 `askAI()`
- 新增首页 AI 状态与结果面板
- 保留原有 `generate()` 调用以维持既有 mock 菜谱状态
- 新增 AI 结果卡片样式
- build 和 askAI mock fallback 检查通过

## Next Step

等待用户确认后执行 Step 9：待购清单同步。
