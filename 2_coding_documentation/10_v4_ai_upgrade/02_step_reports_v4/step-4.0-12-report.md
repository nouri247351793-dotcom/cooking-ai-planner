# Step 4.0-12 Report - Error Handling

Date: 2026-05-23

## Goal

检查并补强小饭桌 4.0 AI 接入的异常处理，确保失败路径不白屏、不崩溃，并尽可能回退到 mock/demo 数据。

## File Changes

- Updated `1_project_files/cooking-ai-planner/src/services/aiService.js`
- Updated `1_project_files/cooking-ai-planner/api/ai.js`
- Updated `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
- Updated `1_project_files/cooking-ai-planner/src/services/aiShoppingListService.js`
- Updated `1_project_files/cooking-ai-planner/src/styles/app.css`
- Added `1_project_files/cooking-ai-planner/records/step-12-error-handling.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-12-error-handling.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-12-report.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-12-error-handling.mmd`
- Updated v4 status / issue / reflection / macro flow records
- Updated `2_coding_documentation/03_git_records/commit_index.md`

## Fixes

- `askAI()` now preserves `fallbackReason` from API mock/demo responses.
- Frontend demo notice can show a friendly reason for fallback.
- Empty user input now uses a default beginner cooking prompt and shows a toast.
- `persistAIShoppingList()` no longer throws on localStorage write failure.
- `api/ai.js` now has provider request timeout handling.
- Provider invalid JSON and invalid schema responses return mock/demo data with explicit reasons.

## Validation

Commands:

```bash
node --input-type=module -e "import { askAI } from './src/services/aiService.js'; globalThis.fetch=async()=>({ok:false,status:503,json:async()=>({})}); const http=await askAI('x'); console.log(http.demoMode, http.fallbackReason); globalThis.fetch=async()=>({ok:true,json:async()=>{throw new Error('bad json')}}); const badJson=await askAI('x'); console.log(badJson.demoMode, badJson.fallbackReason); globalThis.fetch=async()=>({ok:true,json:async()=>({answer:'partial',demoMode:true,fallbackReason:'missing_api_key'})}); const badShape=await askAI('x'); console.log(badShape.demoMode, badShape.fallbackReason); globalThis.fetch=async()=>({ok:true,json:async()=>({answer:'ok',recipes:[],shoppingList:[],cookingSteps:[],estimatedTime:'',tips:[],demoMode:true,fallbackReason:'missing_api_key'})}); const apiMock=await askAI('x'); console.log(apiMock.demoMode, apiMock.fallbackReason);"
npm.cmd run build
```

Results:

- http failure fallback: passed
- invalid JSON fallback: passed
- invalid schema fallback: passed
- API fallback reason passthrough: passed
- build: passed
- Output JS: `dist/assets/index-CbaJnyou.js`
- Output CSS: `dist/assets/index-CB7RBL7r.css`

## Suggested Commit Message

```text
[step-4.0-12][chore] harden ai error handling fallbacks
```

## Current Status

Step 4.0-12 is complete. The app is ready for Step 13: git status check.
