# Issue Log v3

## Step 3.0-00 - Baseline

Date: 2026-05-22

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Worktree | Baseline started with existing uncommitted logo changes | Baseline is not exactly equal to `origin/main` | Recorded dirty state in baseline docs; did not revert user/current changes |
| Tooling | Dev server previously hit Vite/cache/module issues on Windows | Local `npm run dev` is not the most reliable baseline path | Used `npm.cmd run build` and Vite preview for validation |
| Screenshot | Headless browser needed elevated execution due profile/Crashpad permission errors | Screenshot capture could fail in sandbox mode | Used elevated headless Chrome only for screenshot capture |
| Product Gap | No 3.0 timer/task/XP/budget ledger model exists | Major 3.0 feature gap | Recorded in baseline summary for future steps |

## Step 3.0-01 - Dashboard Shell

Date: 2026-05-22

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Layout | Existing 2.0 sidebar was too wide for 3.0 dashboard target | Page read as a traditional content layout, not a compact dashboard | Replaced the shell with `dashboardFrame` and a narrower icon nav rail |
| Deployment | Logo path must work under GitHub Pages subpath | Hard-coded `/brand/logo.png` can fail when deployed at `/cooking-ai-planner/` | Used `import.meta.env.BASE_URL` to compose logo and fallback paths |
| Text Encoding | Layout components contained mojibake Chinese strings | Navigation/top-level shell labels could display unreadable text | Rewrote touched layout components with valid Chinese strings |
| Scope Control | Step 3.0-01 should not refine inner modules | Risk of mixing shell refactor with Step 3.0-02/03 work | Kept HomeHero filters and right-side tools behavior unchanged |

## Step 3.0-02 - Input Panel And Filter Entry

Date: 2026-05-22

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| UX Focus | Filter chips occupied the default home state | The main input action was visually weakened | Removed default chips and replaced them with one collapsed `筛选` entry |
| Visual Hierarchy | Input panel needed to become the strongest visual center | Dashboard shell alone was not enough for 3.0 home focus | Converted HomeHero into a deep primary operation card |
| Scope Control | Step 3.0-02 should not change recipe generation logic | Risk of mixing UI refactor with data behavior changes | Kept the existing filter field shape and generation service calls |
| CSS Order | Old embedded filter styles overrode the new dark filter panel | The `筛选` summary became low contrast | Scoped the old embedded filter override to non-v3 filter panels |

## Step 3.0-03 - Right Tools And Timer

Date: 2026-05-22

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Tool Priority | Right rail did not have a clearly dominant tool | Random recipe/tips/budget looked equal priority | Added a deep timer card as the top-right primary tool |
| Timer Input | Editable time needs validation | Invalid values could break countdown behavior | Added MM:SS parser with fallback to default 10 minutes |
| Timer State | Countdown must support multiple visible states | Users need feedback for idle/editing/running/ended | Added `idle / editing / running / ended` state labels and behavior |
| Scope Control | Step 3.0-03 should not rewrite right rail business modules | Risk of changing random recipe or budget behavior | Kept random recipe, tips, and budget interactions unchanged |

## Step 3.0-04 - Recommended Task Panel

Date: 2026-05-22

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Product Direction | Homepage lower area was still recipe-browsing focused | 3.0 growth/task concept was not visible | Replaced the recipe recommendation grid with a recommended task panel |
| Scope Control | Full XP completion flow belongs to Step 3.0-05 | Risk of implementing too much in this step | Added placeholder task cards only; no detail page or XP mutation yet |
| Data Model | Task data model is not finalized | Premature persistence could create migration work | Used static framework data for level/stage/progress and task placeholders |
| Existing Features | Removing homepage recipe grid could affect random recipe source | Random recipe still needs candidates | Kept `defaultRecipes` in HomePage for random recipe fallback |

## Step 3.0-05 - Task Detail And XP Loop

Date: 2026-05-22

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Product Scope | Real task completion detection is not required in 3.0-05 | AI/vision detection would expand scope and create false precision | Used manual “我做了” confirmation only |
| Data Integrity | Completed tasks could accidentally award XP multiple times | Repeated clicks would inflate level and stage | Stored `completedTaskIds` and blocked duplicate XP rewards |
| Persistence | XP progress needs to survive refreshes | Growth feedback would feel unreliable if reset on reload | Added `cooking_ai_planner.v3.task_progress.v1` localStorage state |
| Navigation | Task detail is a new route inside the dashboard shell | Users need a way back to the homepage task panel | Added `/tasks/:taskId` route metadata and return links |

## Step 3.0-06 - Budget Ledger Modal

Date: 2026-05-23

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Information Density | Homepage budget card previously showed too much secondary detail | Right rail could become hard to scan | Kept only monthly budget, spent amount, and progress bar on homepage |
| First-run State | Budget ledger has no meaningful overview before a budget exists | Empty numbers could look broken | Added first-time budget setup state in the modal |
| Data Ownership | Budget records and task XP are different product concepts | Mixing them would make future changes risky | Added separate `budgetLedger` localStorage key |
| Scope Control | Real bank/payment sync is out of scope | Would require external integrations and privacy decisions | Kept records as manual localStorage entries only |

## Step 3.0-07 - Utility And First-level Page UI Alignment

Date: 2026-05-23

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| UI Consistency | Several first-level pages still used older card/header structure | 3.0 dashboard shell felt inconsistent after navigation | Added shared 3.0 hero and card alignment classes to shopping, favorites, recent, and tips pages |
| Information Density | Home tips card was too dense for the right rail | It competed with timer and budget tools | Reduced tips to three short scan-friendly notes |
| Scope Control | Random recipe should not be redesigned into a new feature | Risk of breaking existing reroll/detail flow | Preserved entry card, modal, reroll, and detail navigation |
| Empty State | Recent page must still demonstrate well with no records | Empty state is common during demos | Kept and restyled empty state while preserving record display path |

## Step 3.0-08 - UI Tokens And Component Spec

Date: 2026-05-23

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Maintainability | 3.0 UI values were still partly scattered in page styles | Future steps could introduce inconsistent spacing, radii, and buttons | Added v3 spacing/radius/surface/button/badge/motion tokens |
| Component Drift | Cards and buttons had overlapping one-off definitions | Visual system could diverge across pages | Normalized default card and button styles and added explicit card variants |
| Missing Alias | Some styles referenced `--c-ink` and `--fs-15` without token definitions | Browser fallback behavior could make styles brittle | Added explicit token definitions |
| Evidence | Headless screenshots remain blocked by local browser Crashpad permissions | Cannot reliably capture Step 3.0-08 after screenshots in this environment | Recorded screenshot limitation in the step report; build verification passed |

## Step 3.0-09 - Archive Review And Export Plan

Date: 2026-05-23

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Archive Gap | Step 3.0-00 had baseline docs but no independent step flowchart | Flowchart sequence started at Step 3.0-01 | Added `step-3.0-00-baseline-flow.mmd` |
| Status Format | Manual requested `current_status_v3.md`, while the repo only had `current_status_v3.mmd` | Final reviewers may expect a readable text summary | Added `current_status_v3.md` alongside the Mermaid file |
| Export Readiness | Export targets were not explicitly listed | Final PDF/PNG/PPT preparation would require manual sorting | Added `06_exports_v3/export_plan_v3.md` |
| Evidence Limits | Some after screenshots are missing due local headless browser permissions | Screenshot evidence is incomplete for 3.0-07/08 | Added `archive_audit_v3.md` and recorded the exact gap |

## Step 3.0-10 - Final QA And Release Package

Date: 2026-05-23

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Release Readiness | Final checklist, release notes, and demo script were not yet generated | Final handoff would require manual assembly | Added `v3_final_checklist.md`, `v3_release_notes.md`, and `demo_script_v3.md` |
| QA Scope | Final step needs to verify both app and archive state | Risk of only checking documentation or only checking build | Ran build, checked preview root, routes, localStorage state paths, and delivery directories |
| Timer Persistence | Timer does not persist after refresh | Could be misunderstood as a missing save feature | Recorded timer as runtime-only light tool in checklist/report |
| Publishing | Local branch is ahead of remote | GitHub Pages will not update until push | Recorded push/tag/release recommendations; did not push without explicit user request |
