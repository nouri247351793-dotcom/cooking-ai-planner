# Step 3.0-00 Report - Current 2.0 Baseline

Date: 2026-05-22

## A. 本轮目标

为当前 2.0 网站制作 3.0 升级前的基线快照。本轮不做 3.0 功能开发，不主动修改业务逻辑。

## B. 修改文件清单

新增/更新文档与归档：

- `2_coding_documentation/09_v3_upgrade/00_v2_baseline/baseline_summary.md`
- `2_coding_documentation/09_v3_upgrade/00_v2_baseline/baseline_routes.md`
- `2_coding_documentation/09_v3_upgrade/00_v2_baseline/baseline_components.md`
- `2_coding_documentation/09_v3_upgrade/00_v2_baseline/baseline_localstorage.md`
- `2_coding_documentation/09_v3_upgrade/00_v2_baseline/baseline_known_issues.md`
- `2_coding_documentation/09_v3_upgrade/00_v2_baseline/baseline_file_tree.txt`
- `2_coding_documentation/09_v3_upgrade/00_v2_baseline/baseline_build_check.md`
- `2_coding_documentation/09_v3_upgrade/01_prompt_logs_v3/step-3.0-00-baseline.md`
- `2_coding_documentation/09_v3_upgrade/02_step_reports_v3/step-3.0-00-report.md`
- `2_coding_documentation/09_v3_upgrade/03_issue_reviews_v3/issue-log-v3.md`
- `2_coding_documentation/09_v3_upgrade/03_issue_reviews_v3/reflection-log-v3.md`
- `2_coding_documentation/09_v3_upgrade/04_flowcharts_v3/macro_flow_v3.mmd`
- `2_coding_documentation/09_v3_upgrade/04_flowcharts_v3/current_status_v3.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

新增截图：

- `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_before/home.png`
- `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_before/shopping.png`
- `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_before/favorites.png`
- `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_before/recent.png`
- `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_before/tips.png`
- `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_before/settings.png`

## C. 实施方案

- 先检查 git 状态，确认当前分支与未提交改动。
- 创建 `09_v3_upgrade` 全套归档目录。
- 从 `src/App.jsx`、`src/components`、`src/pages`、`src/services`、`src/hooks`、`src/store` 梳理当前实现。
- 运行生产构建作为稳定验证。
- 使用 Vite preview 页面和 headless Chrome 截取 before 截图。
- 将当前 2.0 与 3.0 目标差距写入 baseline 文档。

## D. 代码实现

本轮没有主动实现 3.0 业务代码。当前工作区在本轮开始前已存在：

- `SideNav.jsx` 的 logo 路径修正
- `public/brand/logo.png`

本轮只记录该状态，不回退、不扩展业务功能。

## E. 运行与验证

- `npm.cmd run build`: passed
- Preview source: `http://127.0.0.1:4173/cooking-ai-planner/`
- Screenshot capture: completed for 6 main pages
- Known issue: dev server path has been less stable in this Windows environment; build/preview is the baseline validation path.

## F. 文档归档更新

已补齐 Step 3.0-00 所需 baseline、prompt log、step report、issue/reflection、flowchart 和截图。

## G. git 记录

Suggested commit message:

```text
[step-3.0-00][docs] archive v2 baseline before v3 upgrade
```

Suggested tag after committing:

```bash
git tag v2-baseline-before-v3
```

## H. 下一轮建议

执行 Step 3.0-01：整体 dashboard 布局与左侧图标导航重构。该步骤会开始改动全局页面壳和导航样式，应以本轮截图作为 before 对比。

