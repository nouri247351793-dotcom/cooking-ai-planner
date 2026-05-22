# Issue Log v3

## Step 3.0-00 - Baseline

Date: 2026-05-22

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Worktree | Baseline started with existing uncommitted logo changes | Baseline is not exactly equal to `origin/main` | Recorded dirty state in baseline docs; did not revert user/current changes |
| Tooling | Dev server previously hit Vite/cache/module issues on Windows | Local `npm run dev` is not the most reliable baseline path | Used `npm.cmd run build` and Vite preview for validation |
| Screenshot | Headless browser needed elevated execution due profile/Crashpad permission errors | Screenshot capture could fail in sandbox mode | Used elevated headless Chrome only for screenshot capture |
| Product Gap | No 3.0 timer/task/XP/budget ledger model exists | Major 3.0 feature gap | Recorded in baseline summary for future steps |

