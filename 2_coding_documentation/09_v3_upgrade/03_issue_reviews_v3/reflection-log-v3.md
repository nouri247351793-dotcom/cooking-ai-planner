# Reflection Log v3

## Step 3.0-00 - Baseline

Date: 2026-05-22

- Starting 3.0 with a baseline is necessary because the project already has substantial 2.0 behavior and existing visual decisions.
- The current app is buildable, but local development server behavior has been affected by Windows permissions and dependency cache behavior; future validation should keep using build first.
- Current 2.0 is recipe-flow centered. 3.0 should shift the home page center of gravity toward task growth and lightweight tools without breaking the existing recipe/shopping/favorites flows.
- Existing localStorage namespaces are explicit and versioned, which is a good base for adding 3.0 task and budget records.

## Step 3.0-01 - Dashboard Shell

Date: 2026-05-22

- The dashboard shell should be treated as infrastructure for later 3.0 work, not as a full redesign of every module.
- Keeping the existing HomePage main/right split was the lowest-risk way to satisfy “中间主操作区 + 右侧工具区” without changing business logic.
- The icon rail gives the app a clearer product identity, but Step 3.0-02 still needs to simplify the input panel because the current filter chips remain visually heavy.
- GitHub Pages compatibility should stay visible in UI asset decisions; logo and future assets should avoid absolute root paths.

## Step 3.0-02 - Input Panel And Filter Entry

Date: 2026-05-22

- The homepage should first ask for intent, not force users to make filter decisions before they type.
- Collapsing chips into one filter entry keeps power-user controls available while reducing the default cognitive load.
- A deep primary card makes the central action visibly different from supporting content; this helps the dashboard hierarchy read correctly.
- The current solution intentionally keeps filters as a native panel rather than a complex custom modal, because Step 3.0-02 is about focus and hierarchy, not adding new filter logic.

## Step 3.0-03 - Right Tools And Timer

Date: 2026-05-22

- The timer is a high-frequency cooking utility, so it deserves the first position in the right rail.
- Keeping timer logic in a standalone component makes future reuse or persistence easier.
- The timer intentionally starts with a simple local state model; persistence, sound alerts, or notifications can be evaluated later if they become necessary.
- This step improves utility hierarchy without changing the recipe generation path, which keeps the 3.0 upgrade incremental.

## Step 3.0-04 - Recommended Task Panel

Date: 2026-05-22

- The homepage now starts to shift from “recommend me food” toward “help me practice cooking.”
- Replacing the recommendation grid is important because the growth loop needs a visible home on the dashboard before the detail flow exists.
- Static level and XP data are acceptable for this step because Step 3.0-04 is a framework step; persistence and mutation belong to Step 3.0-05.
- The distinction between stage and difficulty should stay explicit: stage is long-term learner progress, difficulty is the current task filter.

## Step 3.0-05 - Task Detail And XP Loop

Date: 2026-05-22

- The first usable task loop should stay intentionally small: browse task, learn steps, manually confirm, receive XP.
- Manual confirmation is a better 3.0 baseline than simulated AI judgment because it is honest about current product capability.
- XP persistence is now part of the product model, so later task recommendation steps should treat `taskProgress` as an owned data contract.
- The duplicate-completion guard is essential even in a prototype; growth systems lose trust quickly if rewards can be farmed accidentally.
