# Step 4.0-04 Report - Frontend AI Service

Date: 2026-05-23

## Goal

新增前端 AI 服务层，让后续页面统一通过 `askAI(userMessage, context)` 调用 `/api/ai`，避免页面组件直接写网络请求或真实 AI API 逻辑。

## File Changes

- Added `1_project_files/cooking-ai-planner/src/services/aiService.js`
- Added `1_project_files/cooking-ai-planner/records/step-04-ai-service.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-04-ai-service.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-04-report.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-04-ai-service.mmd`
- Updated v4 status / issue / reflection / macro flow records
- Updated `2_coding_documentation/03_git_records/commit_index.md`

## Code-Level Changes

- Added `AI_API_ENDPOINT = '/api/ai'`.
- Added `AI_REQUEST_TIMEOUT_MS = 12000`.
- Added `askAI(userMessage, context, options)`.
- Added POST request payload with `userMessage` and `context`.
- Added request timeout via `AbortController`.
- Added response payload picking for direct response, `data`, `result`, or `aiResponse`.
- Added fallback to `mockAIResponse` for request failures, timeouts, invalid JSON, and invalid response shape.
- Preserved `demoMode`, `source`, and `fallbackReason` metadata for later UI handling.

## UI Changes

None. This step only adds the service layer and records.

## Validation

Command:

```bash
npm.cmd run build
```

Result: passed.

Build output:

- `dist/index.html`
- `dist/assets/index-yYwa312i.css`
- `dist/assets/index-gaH9Lqu3.js`

## Suggested Commit Message

```text
[step-4.0-04][feat] add frontend ai service fallback layer
```

## Current Status

Step 4.0-04 is complete. The project is ready for Step 5: Vercel Serverless API.
