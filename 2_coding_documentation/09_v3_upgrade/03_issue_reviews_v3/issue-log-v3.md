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
