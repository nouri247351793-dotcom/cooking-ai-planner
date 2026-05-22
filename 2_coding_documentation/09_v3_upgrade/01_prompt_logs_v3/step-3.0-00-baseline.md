# Step 3.0-00 Prompt Log - Baseline

Date: 2026-05-22

## Step

Step 3.0-00: Current 2.0 baseline archive before v3 upgrade.

## Goal

Freeze the current 2.0 website state before any 3.0 feature work.

## User Prompt

```text
首先请你执行Step 3.0-00
```

## Referenced Manual Prompt

```text
请不要修改任何业务功能，先为当前 2.0 网站制作 3.0 升级前的基线快照。

要求：
1）在 2_coding_documentation/09_v3_upgrade/00_v2_baseline/ 下创建：
   - baseline_summary.md
   - baseline_routes.md
   - baseline_components.md
   - baseline_localstorage.md
   - baseline_known_issues.md
   - baseline_file_tree.txt
   - baseline_build_check.md

2）梳理当前项目：
   - 文件树
   - 路由表
   - 页面清单
   - 组件清单
   - 当前首页布局
   - services 层清单
   - hooks / store / localStorage key 清单
   - 当前 mock 数据结构
   - 当前 UI 与 PRD 3.0 的差距

3）输出当前 build 检查结果：
   - npm run build 是否通过
   - 若不通过，记录错误但本轮不修

4）将当前主要页面截图存入：
   2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_before/

5）在 baseline_summary.md 中写：
   - 当前 2.0 已完成内容
   - 当前 2.0 尚未完成内容
   - 当前与 3.0 目标差距

6）建议 git：
   - 创建 tag：v2-baseline-before-v3
   - 或输出 git 命令与 commit message

7）同步更新：
   - 01_prompt_logs_v3/step-3.0-00-baseline.md
   - 02_step_reports_v3/step-3.0-00-report.md
   - 03_issue_reviews_v3/issue-log-v3.md
   - 04_flowcharts_v3/macro_flow_v3.mmd

本轮不允许改业务代码，只做基线留档。
```

## Execution Summary

- Created v3 archive directory structure.
- Recorded current routes, components, services, hooks, localStorage keys, known issues, and file tree.
- Ran `npm.cmd run build`: passed.
- Captured baseline screenshots for home, shopping, favorites, recent, tips, and settings.
- Did not intentionally change business behavior.

