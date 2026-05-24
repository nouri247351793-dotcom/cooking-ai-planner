# Step 4.0-07 Prompt Log - AI Prompt

Date: 2026-05-23

## User Prompt

执行step7

## Step Source

来自新版《小饭桌4.0 Codex × GitHub × Vercel AI部署 Record版执行手册》：

- Step 7：设计 AI Prompt
- 在 `api/ai.js` 中为“小饭桌”设计系统 Prompt
- AI 角色：面向大学生的做饭规划助手
- 输出必须是 JSON
- JSON 必须包含 `answer`、`recipes`、`shoppingList`、`cookingSteps`、`estimatedTime`、`tips`
- 完成后运行 `npm run build`
- 生成 `records/step-07-ai-prompt.md`

## Execution Notes

- 更新 `api/ai.js` 的系统 Prompt
- 新增 `buildUserPrompt()` 整理用户输入和 context
- 添加 `response_format: { type: 'json_object' }`
- build、语法检查和无 Key fallback handler 调用均通过

## Next Step

等待用户确认后执行 Step 8：接入“开始做饭”页面。
