# 3.0 Baseline Summary - Current 2.0 State

Date: 2026-05-22

## Scope

This baseline freezes the current 2.0 website state before starting the 3.0 incremental upgrade. No business feature was changed in this step. The current working tree already contains two pending logo-related changes from the previous session:

- `1_project_files/cooking-ai-planner/src/components/SideNav.jsx` modified to load brand assets through `import.meta.env.BASE_URL`
- `1_project_files/cooking-ai-planner/public/brand/logo.png` added

These are recorded as part of the current workspace state and were not reverted.

## Current 2.0 Completed Content

- Vite + React + JavaScript frontend is in place under `1_project_files/cooking-ai-planner/`.
- App uses `HashRouter` and a shared `AppLayout`.
- Desktop shell exists with left `SideNav`, top bar for non-home pages, and page-level content shell.
- Home page supports:
  - text input for cooking goals
  - photo upload placeholder
  - filter chips and extended filter panel
  - mock recipe generation
  - random recipe modal
  - right-side tips and budget mock cards
- Recipe flow supports:
  - results page after generation
  - recipe detail page
  - ingredient/condiment selection
  - add selected items to shopping list
  - favorite toggle
  - "I cooked this" recent record
- Shopping list supports grouped lists, manual group, item check/edit/delete, and progress.
- Favorites page supports search, quick filters, removal animation, and JSON export.
- Recent page reads local cooked records.
- Tips page displays mock beginner cooking tips.
- Settings page stores AI config locally; non-mock providers remain placeholders.
- Local JSON retrieval and prompt builder exist as RAG-ready mock infrastructure.
- GitHub Pages deployment workflow exists.

## Current 2.0 Unfinished / Limited Content

- No real AI provider is connected.
- Photo upload is only a placeholder; no image recognition.
- Budget plan is mock-only and does not yet provide editable monthly expense records.
- No 3.0 timer tool exists.
- No recommended task / XP / stage system exists.
- No task detail/tutorial page exists.
- UI is still 2.0 dashboard style, not the 3.0 "central control dashboard" target.
- Dev server can hit dependency/cache issues in this Windows environment; production build and preview are the stable validation path.

## Current Gap To 3.0 Target

- Home page still centers around recipe generation and "今日灵感" recipe cards, while 3.0 requires a task-growth dashboard.
- Left navigation is text-first and wide; 3.0 requires a narrower icon-oriented rail.
- Right tool area lacks the 3.0 priority hierarchy, especially the editable timer.
- Filters are visible as chips by default; 3.0 requires a single filter entry.
- Budget card is not a real localStorage-backed expense tool.
- Current state model has no task XP, level, stage, completed task IDs, or budget ledger keys.
- UI tokens exist but are not yet organized as a 3.0 component/token specification.

## Baseline Screenshots

Captured into `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_before/`:

- `home.png`
- `shopping.png`
- `favorites.png`
- `recent.png`
- `tips.png`
- `settings.png`

## Build Baseline

`npm.cmd run build` passed on 2026-05-22. Details are recorded in `baseline_build_check.md`.

