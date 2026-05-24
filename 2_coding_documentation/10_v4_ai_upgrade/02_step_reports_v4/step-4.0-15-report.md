# Step 4.0-15 Report - Vercel Deployment Guide

Date: 2026-05-24

## Goal

为小饭桌 4.0 生成独立 Vercel 部署说明，确保 GitHub 上传后可以按文档完成 Vercel 导入、构建配置、AI 环境变量配置和上线后基础测试。

## File Changes

- Added `1_project_files/cooking-ai-planner/docs/vercel-deployment-guide.md`
- Updated `1_project_files/cooking-ai-planner/README.md`
- Added `1_project_files/cooking-ai-planner/records/step-15-vercel-guide.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-15-vercel-guide.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-15-report.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-15-vercel-guide.mmd`
- Updated v4 status / issue / reflection / macro flow records
- Updated `2_coding_documentation/03_git_records/commit_index.md`

## Deployment Guide Summary

The new guide documents:

- GitHub repository import into Vercel
- Vercel Root Directory: `1_project_files/cooking-ai-planner`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment variables: `AI_API_KEY`, `AI_MODEL`, `AI_BASE_URL`
- Security rule: do not use `VITE_AI_API_KEY` for real secrets
- Demo mode behavior without API Key
- Post-deployment test path for homepage, AI output, shopping list, and favorites

## Code-Level Change

No business code was changed. This step only adds deployment documentation and archive records.

## Build Result

Command:

```bash
npm.cmd run build
```

Result:

- build: passed
- Output CSS: `dist/assets/index-CB7RBL7r.css`
- Output JS: `dist/assets/index-CbaJnyou.js`

## Current Status

Step 4.0-15 is complete. The project has a standalone Vercel deployment guide and is ready for Step 16: online test checklist.
