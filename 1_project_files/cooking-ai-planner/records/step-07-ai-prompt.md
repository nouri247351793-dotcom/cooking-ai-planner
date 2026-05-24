# Step 7 执行记录：设计 AI Prompt

日期：2026-05-23

## 执行目标

在 `api/ai.js` 中为“小饭桌”设计更稳定的服务端 AI Prompt，让 AI 面向大学生做饭场景输出可被页面渲染的结构化 JSON。

## 实际修改

- 更新 `api/ai.js` 中的系统 Prompt。
- 明确 AI 角色：面向大学生的做饭规划助手。
- 明确用户场景：预算有限、时间有限、厨具有限，适配宿舍、出租屋和普通厨房。
- 明确上下文字段：已有食材、人数、预算、可用时间、口味偏好、忌口、厨具条件、用户输入内容。
- 明确输出 JSON 字段：`answer`、`recipes`、`shoppingList`、`cookingSteps`、`estimatedTime`、`tips`。
- 新增 `buildUserPrompt()`，将用户输入和 context 转成更清晰的提示内容。
- 请求体增加 `response_format: { type: 'json_object' }`，提高 OpenAI-compatible 服务返回 JSON 的概率。
- 未修改页面 UI。
- 未写入真实 API Key。

## 涉及文件

- `api/ai.js`
- `records/step-07-ai-prompt.md`
- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-07-ai-prompt.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-07-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-07-ai-prompt.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## Prompt 设计目标

- 优先生成省钱、省时间、易执行的新手做饭方案。
- 输出内容适合大学生宿舍、出租屋或普通厨房。
- 用户信息不足时仍生成合理默认方案。
- 避免推荐复杂、昂贵、需要特殊厨具的菜。
- 只返回 JSON，不返回 Markdown、代码块或解释性前后缀。

## 输出 JSON 字段

必须包含：

- `answer`
- `recipes`
- `shoppingList`
- `cookingSteps`
- `estimatedTime`
- `tips`

约束：

- `recipes` 至少 1 道，优先 2-3 道可搭配方案。
- `recipes.ingredients` 和 `recipes.steps` 必须是字符串数组。
- `shoppingList.checked` 必须为 `false`。
- `shoppingList.category` 建议使用“食材”“调味”“主食”“厨具”。
- 不添加 schema 之外的字段。

## 容错策略

- 继续保留 Step 5 的 JSON 提取逻辑。
- 继续使用 `isAIResponse()` 校验 AI 返回结构。
- 继续使用 `normalizeAIResponse()` 规范化结构。
- 如果 provider 返回失败、非 JSON 或结构错误，仍回退 `mockAIResponse`。

## 测试结果

- 已运行：`npm.cmd run build`
- 结果：通过
- 已运行：`node --check api\ai.js`
- 结果：通过
- 已运行：无 `AI_API_KEY` 场景下直接调用 `api/ai.js` handler
- 结果：返回 HTTP `200`，响应包含 `demoMode` 与 `answer`
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-yYwa312i.css`
  - `dist/assets/index-gaH9Lqu3.js`
- 构建耗时：约 3.95s

## 当前状态

Step 7 已完成。服务端 Prompt 已强化，后续可以在首页接入 `askAI()` 调用流程。

## 下一步建议

等待用户确认后，再执行 Step 8：接入“开始做饭”页面。
