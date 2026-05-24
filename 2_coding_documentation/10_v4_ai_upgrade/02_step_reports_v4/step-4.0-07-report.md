# Step 4.0-07 Report - AI Prompt

Date: 2026-05-23

## Goal

强化 Vercel Serverless API 中的“小饭桌”系统 Prompt，使真实 AI 更稳定地返回适合页面渲染的结构化 JSON。

## File Changes

- Updated `1_project_files/cooking-ai-planner/api/ai.js`
- Added `1_project_files/cooking-ai-planner/records/step-07-ai-prompt.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-07-ai-prompt.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-07-report.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-07-ai-prompt.mmd`
- Updated v4 status / issue / reflection / macro flow records
- Updated `2_coding_documentation/03_git_records/commit_index.md`

## Code-Level Changes

- Expanded `XIAOFANZHUO_SYSTEM_PROMPT`.
- Added constraints for dorm/rental/home kitchen scenarios.
- Added schema-level output requirements.
- Added constraints for `shoppingList.category`, `shoppingList.checked`, recipe arrays, and tips.
- Added `buildUserPrompt(userMessage, context)`.
- Added `response_format: { type: 'json_object' }` to the provider request body.

## UI Changes

None.

## Validation

Commands:

```bash
npm.cmd run build
node --check api\ai.js
```

Additional check:

- no-key handler invocation returned `200`, `demoMode`, and `answer`

Results:

- build: passed
- syntax check: passed
- no-key fallback: passed

## Suggested Commit Message

```text
[step-4.0-07][feat] strengthen ai planning prompt
```

## Current Status

Step 4.0-07 is complete. The project is ready for Step 8: home page AI hookup.
