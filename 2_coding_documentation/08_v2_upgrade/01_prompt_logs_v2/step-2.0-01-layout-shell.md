# Step 2.0-01 Prompt（全局网页框架）

你现在是“小饭桌”项目的 vibe coding 开发代理，当前任务不是从零重做，而是在现有 1.0 网站基础上进行 2.0 增量升级。

硬性规则：
1. 不要重建项目，不要推翻现有技术路线。
2. 所有改动都必须在当前项目基础上增量实现。
3. 每一轮只完成一个明确步骤，不要一次做完全部 2.0。
4. 每轮开始前先输出：
   - 本轮目标
   - 预计修改文件
   - 风险点
   - 验证方法
5. 每轮结束后必须同步更新以下文档：
   - 2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/
   - 2_coding_documentation/08_v2_upgrade/02_step_reports_v2/
   - 2_coding_documentation/08_v2_upgrade/03_issue_reviews_v2/
   - 2_coding_documentation/08_v2_upgrade/04_flowcharts_v2/
   - 2_coding_documentation/03_git_records/commit_index.md
6. 每轮 step report 必须包含：
   - 本轮输入 prompt 原文
   - AI 输出方案摘要
   - 文件级改动说明
   - 代码级改动说明
   - 自测结果
   - 问题与反思
   - 下一轮建议
7. 每轮必须同时记录：
   - 文件级改动
   - 代码级改动
8. 每轮必须更新 issue-log / reflection-log，记录：
   - AI 输出中发现的问题
   - 知识点
   - 反思
9. 每轮都要更新流程图：
   - macro_flow_v2.mmd
   - 当前步骤状态
10. 每轮都要尽量执行 git add / git commit；若无法执行，就给出准确命令并写入 commit_index.md。
11. 当前阶段不接真实 OpenClaw，不调用真实云端 AI，只保留接口占位和 TODO。
12. 2.0 版本仍然使用 mock provider、RAG-ready 架构、本地知识库 mock、轻量 p5.js 增强。
13. 本轮完成后必须进行最小验证：
   - npm run build
   - 关键页面可打开
   - 关键交互可点击
   - 文档已归档
14. 所有输出请按以下顺序：
   A. 本轮目标
   B. 修改文件清单
   C. 实施方案
   D. 代码实现
   E. 运行与验证
   F. 文档归档更新
   G. git 记录
   H. 下一轮建议

本轮选择执行步骤：**Step 2.0-01：重构全局网页框架**（左侧固定导航 + 顶部搜索 + 右上角状态入口），并保持 1.0 既有路由与功能不被破坏。

