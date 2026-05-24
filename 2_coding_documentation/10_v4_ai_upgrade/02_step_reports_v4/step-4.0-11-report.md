# Step 4.0-11 Report - Demo Mode Notice

Date: 2026-05-23

## Goal

当 AI 响应返回 `demoMode: true` 时，在首页 AI 结果卡片中显示明确但不阻断操作的 demo 模式提示。

## File Changes

- Updated `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
- Updated `1_project_files/cooking-ai-planner/src/styles/app.css`
- Added `1_project_files/cooking-ai-planner/records/step-11-demo-mode.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-11-demo-mode.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-11-report.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-11-demo-mode.mmd`
- Updated v4 status / issue / reflection / macro flow records
- Updated `2_coding_documentation/03_git_records/commit_index.md`

## demoMode Detection

- `askAI()` keeps returning normalized AI response metadata.
- `AIResultPanel` checks `result?.demoMode`.
- When true, it renders a lightweight notice.
- When false or absent, no demo notice is rendered.

## Display Position

- Page: home page.
- Component area: AI result card.
- Position: below the card header and before the AI answer.
- Text: `当前为演示模式，AI 内容由示例数据生成。`

## UX Decision

- The notice is inline, not modal.
- It does not disable shopping list generation.
- It does not disable AI recipe favorites.
- It does not hide any AI result content.

## Validation

Command:

```bash
npm.cmd run build
```

Result:

- build: passed
- Output JS: `dist/assets/index-C_Wrj8gZ.js`
- Output CSS: `dist/assets/index-DlhWFW_n.css`

## Suggested Commit Message

```text
[step-4.0-11][ux] add demo mode notice
```

## Current Status

Step 4.0-11 is complete. The app is ready for Step 12: full error handling and fallback review.
