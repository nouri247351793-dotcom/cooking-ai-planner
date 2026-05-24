# Reflection Log v4

## Step 4.0-16 - Online Test Checklist

- 4.0 的最终验收不能只看 build，通过线上 checklist 才能覆盖 Vercel、AI Key、移动端和浏览器控制台。
- demo 模式是可用性兜底，但真实 AI 仍必须在 Vercel 环境变量配置后单独验证。
- localStorage 相关能力需要刷新后检查，否则待购和收藏同步只能证明当前页面状态正确。
- Step 16 结束后，技术上进入发布动作阶段；commit / push 仍应等待用户明确授权。

## Step 4.0-15 - Vercel Deployment Guide

- 独立部署文档比只写 README 摘要更适合后续实际上线操作。
- Vercel 的 `Root Directory` 是本项目最容易配错的地方，必须显式写出 `1_project_files/cooking-ai-planner`。
- `VITE_AI_API_KEY` 的风险需要单独强调，因为它看起来像前端项目的常规配置，但不适合真实密钥。
- demo/mock 模式应被解释为预期降级能力，而不是部署失败。

Date: 2026-05-23

## Step 4.0-14 - GitHub Ready Check

- README must describe the actual 4.0 deployment path, not the older static-only state.
- Vercel requires a root-path asset base; GitHub Pages requires the repository path, so the config now branches by `process.env.VERCEL`.
- Secret scanning should avoid false-positive real keys while still documenting env variable names.
- The project is upload-ready in principle, but commit/push should wait until Step 15 and Step 16 records are complete or the user explicitly chooses to publish now.

## Step 4.0-13 - Git Check

- The repository is ready for a release-style commit only after Step 14 confirms README and deployment docs.
- The dubious ownership warning should be handled conservatively with a command-scoped safe directory flag, not a global config change.
- The current untracked count is expected because v4 records and new AI files have not been committed yet.
- No commit or push should happen until the user explicitly authorizes it.

## Step 4.0-12 - Error Handling

- The main reliability path is still mock/demo fallback; Step 12 makes the failure reason more transparent.
- Serverless provider timeout should be handled by the app before Vercel’s platform timeout whenever possible.
- Empty input should not be treated as a hard error because the product is meant to guide beginners.
- Storage failures should not block the page; they should degrade persistence while keeping the current interaction usable.

## Step 4.0-11 - Demo Mode Notice

- The demo state should be transparent but not disruptive.
- Inline placement is better than a toast because the explanation stays near the AI content it describes.
- The exact wording required by the manual is now visible only when `demoMode` is true.
- Step 12 should verify that all fallback paths preserve this behavior without blocking shopping or favorites.

## Step 4.0-10 - Favorites Sync

- AI recipes need full-object persistence because they are generated data, not stable catalog entries.
- Keeping AI favorites separate from catalog favorite IDs avoids a risky migration of the existing favorites data model.
- The favorites page is the right merge point: it already owns filtering, empty states, and removal UX.
- Mapping AI recipes into the existing `RecipeCard` shape keeps the UI consistent without creating a second card component.

## Step 4.0-09 - Shopping List Sync

- Reusing `useShoppingList()` is safer than making the shopping page read a second storage source directly.
- Keeping `xiaofanzhuo_ai_shopping_list` as a raw AI snapshot still satisfies the manual and gives a simple debug record.
- Replacing, not appending, the AI group keeps repeated generations predictable.
- The AI shopping list should behave like normal shopping data after sync; the page should not care whether an item came from AI, manual input, or a recipe.

## Step 4.0-01 - Project Structure Check

- 4.0 should reuse the existing 3.0 AI-ready service structure instead of creating a parallel system.
- The most important architectural boundary is keeping real API credentials out of frontend code.
- The current app already has stable shopping and favorites hooks; AI integration should write through those existing paths rather than inventing new storage.
- Every 4.0 step needs records because AI integration will change data contracts, API boundaries, and failure modes.

## Step 4.0-03 - AI Data Structure

- Establishing the AI response contract before adding network calls reduces later UI/API coupling risk.
- `normalizeAIResponse()` is intentionally small and dependency-free so both frontend service code and future API parsing can reuse the same assumptions.
- The mock response uses realistic student cooking content instead of generic filler, so demo mode can remain useful after Vercel deployment.
- No UI changes were made in this step; this keeps Step 4 service integration easier to review.

## Step 4.0-04 - Frontend AI Service

- Keeping AI calls behind `askAI()` makes later homepage integration smaller and easier to roll back.
- The service intentionally calls only `/api/ai`; real provider URLs and keys remain a Vercel Serverless concern.
- Fallback returns the same AI data fields plus metadata, so demo mode can be displayed later without changing the core response structure.
- This step should stay UI-free; actual loading/error rendering belongs to the later homepage integration step.

## Step 4.0-05 - Vercel Serverless API

- The API endpoint now provides the server-side boundary required for safe GitHub + Vercel deployment.
- Returning mock data instead of hard failure when the provider fails keeps the app demoable during setup.
- The Step 7 prompt can later strengthen the current lightweight JSON-only prompt without changing the endpoint contract.
- The API is intentionally SDK-free to avoid adding dependencies before deployment basics are stable.

## Step 4.0-06 - Env Example

- `.env.example` must be committed, otherwise Vercel configuration becomes undocumented for future reviewers.
- The root `.gitignore` needed a narrow exception because `.env.*` was broader than intended.
- Keeping real values out of the repo remains the main security rule; the example file only documents variable names.

## Step 4.0-07 - AI Prompt

- Prompt constraints are now aligned with the Step 3 response contract, reducing parsing risk before UI hookup.
- `buildUserPrompt()` keeps the system role stable while making user/context data easier for the model to follow.
- `response_format` improves OpenAI-compatible JSON reliability, while mock fallback remains the safety net for incompatible providers.
- This step intentionally avoided UI work; loading and display states belong to Step 8.

## Step 4.0-08 - Start Cooking AI Hookup

- Showing AI output inline is the smallest way to satisfy Step 8 without redesigning the results page.
- Keeping the old mock `generate()` call avoids breaking existing random recipe and recipe-result state before storage sync is implemented.
- Step 9 should reuse the returned `shoppingList`; this step deliberately avoids writing AI shopping data to localStorage.
- Demo mode is visible but non-blocking, which matches the Vercel deployment path where env vars may not be configured at first.
