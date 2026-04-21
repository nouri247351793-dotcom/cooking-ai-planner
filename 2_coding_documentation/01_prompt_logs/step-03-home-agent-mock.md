# Step 03 - home-agent-mock（Prompt Log）

## 本轮输入 Prompt（原文）

请实现 HomePage，严格围绕“大学生做饭学习规划”场景。

页面要求：
1）顶部显示 app 名称和一个轻量设置入口；
2）中部有 Agent 输入框；
3）有拍照按钮（先只做上传占位，不接真实识别）；
4）有“生成菜谱”按钮；
5）下方有筛选区：
   - 时长
   - 预算
   - 设备限制
   - 几人份
6）再下方是推荐菜谱卡片流；
7）有“随机一道菜”按钮，点击后弹出随机卡片；
8）生成菜谱时先用本地 mock service 返回 3~5 个结果；
9）页面状态必须包含：
   - 默认态
   - 加载态
   - 无结果态
   - 错误态

AI core 占位增强：
10）把输入内容、筛选项、拍照结果整理成统一 params 对象
11）在代码中预留 aiRequestPayload 结构，后续可直接喂给 LLM service
12）所有 mock 逻辑集中在 services 层，不要直接写在页面组件里

文档归档要求：
13）本轮文档里必须额外写明：
   - 为什么首页先用 mock 而不接真模型
   - params 结构未来如何接 RAG
   - 当前页面属于哪类“学习规划”行为

请拆成可复用组件并输出本轮 git commit message。

## 备注

- 本轮目标：HomePage 的“学习规划 Agent”交互 + filters + mock 生成 + 状态机 + 组件化
- 预计修改文件清单：
  - `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
  - `1_project_files/cooking-ai-planner/src/components/home/**`
  - `1_project_files/cooking-ai-planner/src/services/homeRecipeAgentService.js`
  - `1_project_files/cooking-ai-planner/src/styles/app.css`
  - `2_coding_documentation/02_step_reports/step-03-report.md`
  - `2_coding_documentation/03_git_records/commit_index.md`
  - `2_coding_documentation/05_flowcharts/macro_flow.mmd`
- 风险点：
  - 生成结果仅为 mock，详情页刷新可能丢失 Link state（后续需持久化或 service 层缓存）
  - 受限环境下 `npm run dev` 可能 `spawn EPERM`（需本机环境验证）
- 验证方法：
  - Home 默认态非空白；可输入 + 上传占位 + 生成；能看到 loading/empty/error（错误可用关键词触发）与成功结果
  - 随机按钮弹出 modal；卡片可进入详情页
  - `npm.cmd run dev`、`npm.cmd run build` 通过


