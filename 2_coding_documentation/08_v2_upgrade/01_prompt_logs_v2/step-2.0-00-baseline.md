# Step 2.0-00 Prompt（基线留档）

> 来源：执行手册 2.0（建议在后续每轮按该格式记录 prompt 原文）

请不要改任何业务功能，先为当前 1.0 网站制作 2.0 升级前的基线快照。

要求：
1. 在 `2_coding_documentation/08_v2_upgrade/00_v1_baseline/` 下创建：
   - `baseline_summary.md`
   - `baseline_routes.md`
   - `baseline_localstorage.md`
   - `baseline_known_issues.md`
   - `baseline_file_tree.txt`
   - `baseline_build_check.md`
2. 盘点当前项目：
   - 文件树
   - 路由表
   - 页面清单
   - 组件清单
   - services 清单
   - hooks / store / localStorage key 清单
3. 输出 `npm run build` 检查结论（不通过就记录，不在本轮修复业务）
4. 把当前主要页面截图保存到 `.../05_assets_v2/screenshots_before/`
5. 在 `baseline_summary.md` 中写：
   - 1.0 已完成内容
   - 1.0 尚未完成内容
   - 1.0 与 PRD 2.0 的主要差异
6. git 建议：
   - 创建 tag：`v1-baseline-before-v2`
   - 或输出 git 命令与 commit message
7. 同步更新：
   - `01_prompt_logs_v2/step-2.0-00-baseline.md`
   - `02_step_reports_v2/step-2.0-00-report.md`
   - `03_issue_reviews_v2/issue-log-v2.md`
   - `04_flowcharts_v2/macro_flow_v2.mmd`

本轮不允许改业务代码，只做基线留档。

