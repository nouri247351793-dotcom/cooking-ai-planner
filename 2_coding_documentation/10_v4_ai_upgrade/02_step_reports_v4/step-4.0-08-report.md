# Step 4.0-08 Report - Start Cooking AI Hookup

Date: 2026-05-23

## Goal

将首页“开始做饭”主输入接入 `askAI()`，让用户可以在页面内触发 AI/demo 生成，并显示结构化结果。

## File Changes

- Updated `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
- Updated `1_project_files/cooking-ai-planner/src/components/home/HomeHero.jsx`
- Updated `1_project_files/cooking-ai-planner/src/styles/app.css`
- Added `1_project_files/cooking-ai-planner/records/step-08-start-cooking-ai.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-08-start-cooking-ai.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-08-report.md`
- Added `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-08-start-cooking-ai.mmd`
- Updated v4 status / issue / reflection / macro flow records
- Updated `2_coding_documentation/03_git_records/commit_index.md`

## Code-Level Changes

- Added `askAI` import to `HomePage.jsx`.
- Added `buildHomeAIContext()` for homepage context collection.
- Added `AIResultPanel` for loading, error, demo badge, answer, recipes, cooking steps, and tips.
- Changed `handleGenerate()` to call `askAI(inputText, context)` and existing `generate()` in parallel.
- Removed automatic navigation to `/results` from homepage generation so AI output can be shown inline.
- Updated `HomeHero` copy to reflect 4.0 AI/demo behavior.
- Added `.aiResultCard`, `.aiRecipeGrid`, `.aiRecipeCard`, and `.aiMiniBlock` styles.

## UI Changes

- Adds an inline AI result card below the main input panel.
- Keeps the existing home layout, right-side tools, and recommended tasks.
- Shows a lightweight `演示模式` badge when `demoMode` is returned.

## Validation

Commands:

```bash
npm.cmd run build
node --input-type=module -e "import { askAI } from './src/services/aiService.js'; const result = await askAI('测试', { servings: 1 }); console.log(result.demoMode); console.log(result.fallbackReason); console.log(Array.isArray(result.recipes));"
```

Results:

- build: passed
- askAI no-api fallback: passed

## Suggested Commit Message

```text
[step-4.0-08][feat] hook home page to ai service
```

## Current Status

Step 4.0-08 is complete. The project is ready for Step 9: shopping list sync.
