# 小饭桌 4.0 归档记录规则

Date: 2026-05-23

## 适用范围

4.0 阶段采用“GitHub × Vercel × AI 部署”路线。每一个 Step 都必须同步生成 record，避免“代码变了但过程没有记录”的问题。

## 主记录位置

按照新版执行手册，每一步必须在应用项目根目录维护一份主 record：

- `1_project_files/cooking-ai-planner/records/step-01-project-check.md`
- `1_project_files/cooking-ai-planner/records/step-02-gitignore-and-secret-check.md`
- `1_project_files/cooking-ai-planner/records/step-03-ai-data-structure.md`

后续步骤按同样格式递增。

## 归档镜像位置

如该步骤涉及较大代码修改、关键架构决策、GitHub/Vercel 发布动作，继续同步维护课程归档目录：

- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-xx-*.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-xx-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-xx-*.mmd`
- `2_coding_documentation/10_v4_ai_upgrade/03_issue_reviews_v4/issue-log-v4.md`
- `2_coding_documentation/10_v4_ai_upgrade/03_issue_reviews_v4/reflection-log-v4.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/current_status_v4.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/current_status_v4.mmd`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/macro_flow_v4.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## 每步 record 必须包含

- 执行目标
- 实际修改或实际检查结果
- 涉及文件
- 是否修改业务代码
- 测试结果，优先记录 `npm run build`
- 当前状态
- 下一步建议
- 如失败，记录失败原因和修复建议

## 技术边界

- API Key 不写入前端代码。
- 前端只调用项目内部接口 `/api/ai`。
- Vercel Serverless API 从服务端环境变量读取 `AI_API_KEY`、`AI_MODEL`、`AI_BASE_URL`。
- 无 Key 或请求失败时自动进入 demo/mock 模式。
- 每次接入真实 AI 前必须保留 mock 兜底。
- 每一步结束后都要记录 build 或说明未运行原因。
