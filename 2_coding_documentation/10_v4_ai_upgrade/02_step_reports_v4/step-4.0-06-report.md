# Step 4.0-06 Report - Env Example

Date: 2026-05-23

## Goal

新增安全的环境变量示例文件，方便 GitHub 和 Vercel 部署时配置 AI API，同时保证真实密钥文件不会被提交。

## File Changes

- Added `1_project_files/cooking-ai-planner/.env.example`
- Updated `.gitignore`
- Added `1_project_files/cooking-ai-planner/records/step-06-env-example.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-06-env-example.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-06-report.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-06-env-example.mmd`
- Updated v4 status / issue / reflection / macro flow records
- Updated `2_coding_documentation/03_git_records/commit_index.md`

## Code-Level Changes

None. This step only adds environment documentation and git ignore safety handling.

## Env Variables

```env
AI_API_KEY=
AI_MODEL=gpt-4o-mini
AI_BASE_URL=https://api.openai.com/v1
```

Real values must be configured in Vercel Project Settings → Environment Variables.

## Gitignore Check

- `.env`: ignored
- `.env.local`: ignored
- `.env.*.local`: ignored
- `.env.example`: not ignored, safe to commit

## Validation

Command:

```bash
npm.cmd run build
```

Result: passed.

## Suggested Commit Message

```text
[step-4.0-06][chore] add ai env example
```

## Current Status

Step 4.0-06 is complete. The project is ready for Step 7: AI prompt design.
