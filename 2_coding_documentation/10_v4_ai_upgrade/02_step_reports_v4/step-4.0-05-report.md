# Step 4.0-05 Report - Vercel Serverless API

Date: 2026-05-23

## Goal

新增 Vercel Serverless API `/api/ai`，由服务端读取 AI 环境变量并调用 OpenAI-compatible `chat/completions` 接口，避免真实 API Key 暴露在前端。

## File Changes

- Added `1_project_files/cooking-ai-planner/api/ai.js`
- Added `1_project_files/cooking-ai-planner/records/step-05-vercel-api-ai.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-05-vercel-api-ai.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-05-report.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-05-vercel-api-ai.mmd`
- Updated v4 status / issue / reflection / macro flow records
- Updated `2_coding_documentation/03_git_records/commit_index.md`

## Code-Level Changes

- Added default export Vercel handler.
- Added POST-only request handling and OPTIONS preflight response.
- Added request body parsing for object or JSON string body.
- Added server-side environment variable reads:
  - `AI_API_KEY`
  - `AI_MODEL`
  - `AI_BASE_URL`
- Added no-key mock response with `demoMode: true`.
- Added OpenAI-compatible `POST {AI_BASE_URL}/chat/completions` call.
- Added JSON extraction from plain JSON, fenced JSON, or mixed text.
- Added `isAIResponse()` validation and `normalizeAIResponse()` normalization.
- Added mock fallback with recognizable `error.code` metadata for provider failures.

## UI Changes

None.

## Validation

Commands:

```bash
npm.cmd run build
node --check api\ai.js
```

Results:

- `npm.cmd run build`: passed
- `node --check api\ai.js`: passed
- no-key handler invocation: returned `200`, `demoMode`, and `missing_api_key`

## Suggested Commit Message

```text
[step-4.0-05][feat] add vercel ai serverless endpoint
```

## Current Status

Step 4.0-05 is complete. The project is ready for Step 6: `.env.example`.
