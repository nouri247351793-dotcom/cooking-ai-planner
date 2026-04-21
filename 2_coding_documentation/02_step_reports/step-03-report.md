# Step 03 - home-agent-mock（Step Report）

## 本轮目标

- 实现 HomePage（围绕“大学生做饭学习规划”场景）并拆分为可复用组件
- 新增 mock service：生成菜谱 3~5 条、统一 params、预留 aiRequestPayload
- 覆盖页面状态：默认态 / 加载态 / 无结果态 / 错误态

## Prompt 设计理由

- 课堂演示优先：先把“可讲清楚的 AI 链路输入输出”跑通（mock），避免卡在真实模型接入与网络/密钥问题
- 学习规划优先：把“做饭”讲成“可执行练习 + 筛选约束 + 复盘路径”，不是单纯的菜谱列表

## AI 输出方案摘要

- 首页结构：Agent 输入框 + 拍照上传占位 + 生成按钮 → filters → 推荐卡片流 + 随机弹窗
- 统一数据结构：`params`（输入/筛选/照片/元信息）+ `aiRequestPayload`（未来直接喂给 LLM/RAG）
- mock 集中到 `services`：延迟/筛选/随机挑选/错误模拟都在 service 层

## 文件级改动说明

- 新增：`1_project_files/cooking-ai-planner/src/services/homeRecipeAgentService.js`
- 新增：`1_project_files/cooking-ai-planner/src/components/home/AgentComposer.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/components/home/PhotoUploadButton.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/components/home/FiltersPanel.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/components/home/RecipeCard.jsx`
- 新增：`1_project_files/cooking-ai-planner/src/components/home/RandomRecipeModal.jsx`
- 更新：`1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
- 更新：`1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`（支持 `Link state` 传递 recipe，避免生成结果详情页找不到）
- 更新：`1_project_files/cooking-ai-planner/src/styles/app.css`（新增组件样式）

## 代码级改动说明

- HomePage 状态机：
  - `idle`：默认推荐 + 引导文案
  - `loading`：骨架屏
  - `success`：展示 mock 生成的 3~5 条推荐练习菜谱
  - `empty`：无结果提示（引导放宽筛选/换更具体学习目标）
  - `error`：错误提示（可回到默认推荐）
- `params` 结构：`scene + inputText + filters + photo + meta`（见 `buildHomeParams`）
- `aiRequestPayload` 结构：`intent + params + rag(placeholder) + llm(placeholder) + messages(placeholder)`（见 `buildAiRequestPayload`）

## 自测结果

- [x] `npm.cmd run dev` 可启动，首页非空白（HTTP 200）
- [x] 默认态 / 加载态 / 无结果态 / 错误态均可触发与展示（错误可用关键词 `error/报错` 触发）
- [x] 上传占位可用（仅保存文件信息，不做识别）
- [x] “生成菜谱”返回 3~5 个 mock 结果；卡片流可点击进详情
- [x] “随机一道菜”弹窗可打开/关闭
- [x] `npm.cmd run build` 构建成功
- [x] 文档已归档（prompt log / step report / commit index / flowchart）

## AI 输出评估

- 可用：在不接真模型的情况下，先把未来 AI 请求所需的 params/payload 结构固定下来，利于后续逐步接 service / RAG

## 人工修正/二次指令

- 约束：严格把“模拟生成/随机选择/延迟/筛选”集中在 `services`，页面仅负责状态切换与渲染

## 本轮知识点与反思

- “学习规划”场景更像：约束输入 → 生成可练的任务 → 选择 1 个练习 → 执行/复盘，而不是纯推荐列表
- 统一 `params` / `aiRequestPayload` 能让后续接 RAG 更顺滑：把筛选项与照片摘要变成检索 query 与上下文

## 发现的问题

- 详情页依赖 `Link state`：刷新详情页可能丢失生成结果（后续可用 localStorage 或 store 做持久化缓存）

## 下一轮建议

- Step 04：把 SettingsPage 的模型配置占位与 `services` 层连接起来（仍可 mock），并开始把 `aiRequestPayload` 组装与保存做成可追踪记录

## 建议 git commit（本轮）

- Commit message：`[step-03][feat] implement home agent and mock recipes`
- Commands（在仓库根目录）：
  - `git add 1_project_files/cooking-ai-planner 2_coding_documentation`
  - `git commit -m "[step-03][feat] implement home agent and mock recipes"`

## 归档补充说明（本轮要求 13）

### 为什么首页先用 mock 而不接真模型

- 课堂评分更看重“链路与过程证据”，mock 可以保证每次演示稳定可复现
- 真模型接入涉及网络/密钥/额度/延迟，不适合在 Step 03 就绑定外部不确定性

### params 结构未来如何接 RAG

- `params` 中的 `inputText + filters + photo.mockRecognized` 可直接拼成 RAG 的检索 query
- `aiRequestPayload.rag` 已预留：未来只需把 `enabled` 置为 true，并把检索结果作为上下文追加到 messages

### 当前页面属于哪类“学习规划”行为

- “任务规划 + 约束决策”：用时长/预算/设备/人数把练习任务约束成可执行规模
- “练习选择 + 复盘入口”：推荐卡片把“学习目标/练习点”显式化，便于执行与后续收藏/复盘


