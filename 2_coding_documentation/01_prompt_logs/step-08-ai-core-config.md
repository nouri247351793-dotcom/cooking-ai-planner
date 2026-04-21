# Step 08 - ai-core-config（Prompt Log）

## 本轮输入 Prompt（原文）

请新增 AI core 的配置层和 service 抽象层，不接真实云端，只做本地架构占位。

目标：
让用户可以在前端进行模型配置，并为后续接入真实 LLM / OpenClaw / 其他 provider 做准备。

要求：
1）实现 SettingsPage 或 ModelConfigPanel：
   - provider 选择（mock / openai-compatible / custom）
   - model name 输入
   - temperature
   - max tokens
   - system prompt 占位
2）这些配置先保存在 localStorage；
3）新增 services/ai/
   - llmProvider.js
   - recipeGenerationService.js
   - retrievalService.js
   - promptBuilder.js
4）定义统一接口：
   - generateRecipes(params, config)
   - retrieveCookingKnowledge(query, filters)
   - buildRecipePrompt(userInput, retrievedDocs, config)
5）默认 provider 为 mock；
6）当前页面调用只允许接 mock provider；
7）所有真实 provider 仅保留接口注释和 TODO，不发起真实请求；
8）输出清晰的模块职责说明图。

文档要求：
9）在 step report 中写清：
   - 为什么先做 provider 抽象
   - 为什么当前阶段不用真 API
   - 将来替换真实服务时只需要改哪些文件

## 备注

- 本轮目标：提供“AI 配置 + AI service 抽象层”的本地架构占位，首页生成继续只走 mock。
- 风险点：用户选择非 mock provider 时的交互提示；确保不发生任何真实网络请求。
- 验证方法：`npm run build` 通过；dev server 可启动且 `#/settings` 可访问；切换 provider 后首页点击“生成菜谱”可提示暂不支持。

