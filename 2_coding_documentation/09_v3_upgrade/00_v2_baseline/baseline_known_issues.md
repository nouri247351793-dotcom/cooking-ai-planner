# Baseline Known Issues - Current 2.0

Date: 2026-05-22

## Environment / Tooling

- `npm.cmd run build` passes.
- `npm run dev` previously hit Windows/Vite cache and dependency prebundle issues in this workspace. Current stable preview path is `npm.cmd run build` followed by `npm.cmd run preview`.
- Chrome/Edge headless screenshot capture required elevated execution because browser profile/Crashpad writes were blocked in the sandbox.

## Current Worktree State

The repository is not clean at the start of Step 3.0-00:

- Modified: `1_project_files/cooking-ai-planner/src/components/SideNav.jsx`
- Untracked: `1_project_files/cooking-ai-planner/public/brand/logo.png`

These came from the logo/path update before the v3 baseline step. They are not part of a 3.0 business feature.

## Product / UX Gaps Before 3.0

- Home still shows filter chips by default; 3.0 wants a single filter entry.
- Home lower section is still recipe inspiration; 3.0 wants recommended tasks.
- Right panel has no timer tool.
- Budget card is mock display and modal content, not an editable monthly ledger.
- Task XP and stage model does not exist.
- Left nav is text-heavy and wide; 3.0 wants a compact icon rail.

