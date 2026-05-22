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
