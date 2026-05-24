# Issue Log v4

## Step 4.0-16 - Online Test Checklist

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Acceptance | 4.0 涉及 AI、待购、收藏、demo、Vercel，多点验收容易遗漏 | 上线后可能只确认首页可打开，漏测真实 AI 或 localStorage | Added `docs/ai-deployment-test-checklist.md` with grouped post-deployment checks |
| Environment Split | demo 模式和真实 AI 模式行为不同 | 未配置 Key 时可能误判为失败，配置 Key 后也可能未验证真实调用 | Checklist separates demo mode and real AI mode |
| Mobile UX | 3.0/4.0 UI 变动较多，桌面通过不代表手机可用 | Vercel 上线后移动端可能出现遮挡、按钮悬空或不可操作 | Added mobile layout checks |
| Final Acceptance | 本地 build 通过不等于线上验收完成 | 需要明确哪些已完成，哪些必须上线后验证 | Record states local readiness and online validation gaps |

## Step 4.0-15 - Vercel Deployment Guide

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Deployment Docs | README 内已有概要，但缺少可独立执行的 Vercel 指南 | 用户上传 GitHub 后仍可能不知道 Vercel Root Directory 和环境变量如何配置 | Added `docs/vercel-deployment-guide.md` with import, build, env, demo mode, and test instructions |
| Secret Safety | Vite 项目容易误用 `VITE_` 前缀保存密钥 | 真实 API Key 会进入前端构建产物 | Documented that real keys must use server-side `AI_API_KEY`, not `VITE_AI_API_KEY` |
| Demo Mode | 未配置 Key 时可能被误判为部署失败 | Vercel 初次部署无 Key 时用户可能认为 AI 不可用 | Documented demo/mock fallback behavior and how to verify it |
| Scope Control | Step 15 只需要部署文档，不应调整业务功能 | 文档步骤混入业务改动会增加上线风险 | Kept this step to docs and records only |

Date: 2026-05-23

## Step 4.0-14 - GitHub Ready Check

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Documentation | README was old and missing 4.0 Vercel deployment details | GitHub visitors would not know how to deploy or configure AI | Rewrote README with local run, Vercel env vars, demo mode, and Pages limitation |
| Vercel Base Path | Vite production base was hardcoded for GitHub Pages | Vercel deployment could serve assets from `/cooking-ai-planner/` incorrectly | Updated `vite.config.js` to use `/` on Vercel and keep Pages compatibility elsewhere |
| Secret Safety | Upload-ready check must ensure no real API Key is present | Public GitHub push could leak credentials | Scanned key patterns and confirmed env files are ignored |
| Scope Control | Step 14 is a check step, not a publish step | Premature commit/push could skip remaining deployment docs | No commit or push performed |

## Step 4.0-13 - Git Check

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Git Safety | Direct `git status` reported dubious ownership in this environment | Could block repository checks or tempt global config changes | Used one-time `git -c safe.directory=...` for read-only checks; did not change global Git config |
| Scope Control | Manual says not to auto-commit | Accidental commit/push could publish incomplete final docs | Only checked status, ignore rules, sensitive info, and build; no commit/push |
| Upload Safety | Need to ensure env/build/dependency folders are ignored | Secrets or generated artifacts could be uploaded | Confirmed `.env`, `.env.local`, `node_modules`, and `dist` are ignored |
| Reviewability | Large number of untracked record files | Git status can look noisy | Recorded main changed file groups and suggested commit message |

## Step 4.0-12 - Error Handling

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Metadata | API mock responses included `fallbackReason`, but frontend normalization did not preserve it | Demo notice could not explain why fallback happened | `askAI()` now passes through `fallbackReason` |
| Timeout | Serverless provider request had no explicit timeout | Provider hang could delay the Vercel function until platform timeout | Added `AbortController` timeout in `api/ai.js` |
| Provider JSON | Provider could return non-JSON body | Serverless endpoint would fall into generic exception | Added explicit invalid provider JSON fallback reason |
| Empty Input | Empty user input was passed through directly | User could get unclear AI behavior | Home now uses a default beginner cooking prompt and shows a toast |
| Storage Write | AI shopping raw localStorage write could throw | A browser storage restriction could interrupt sync | Wrapped `persistAIShoppingList()` in try/catch and surfaced a non-blocking toast |

## Step 4.0-11 - Demo Mode Notice

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Transparency | Demo/mock content previously only had a small badge | Users might not know the AI content is generated from sample data | Added exact inline notice text when `demoMode: true` |
| UX Blocking | A modal or overlay could interrupt demo interactions | Demo mode must still allow recipes, shopping sync, and favorites | Used a non-blocking inline notice inside the AI result card |
| Real API Path | Demo notice should not appear for real AI responses | Could confuse users after Vercel env vars are configured | Notice renders only when `result?.demoMode` is true |

## Step 4.0-10 - Favorites Sync

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Data Model | AI recipes are not part of `recipeCatalog` | Existing favorites only store IDs, so AI recipes would disappear after refresh | Added `xiaofanzhuo_favorite_recipes` to store full AI recipe objects |
| Duplication | Repeated favorite clicks could duplicate the same AI recipe | Favorites page would show repeated cards | Normalized IDs with `ai-recipe:` prefix and replaced existing item before insert |
| Compatibility | `RecipeCard` expects catalog-like fields | AI response recipe shape is smaller than internal recipe shape | Added mapper with fallback image, minutes, nutrition, ingredients, steps, and learning fields |
| Scope | Rewriting the whole favorites store could risk breaking existing catalog favorites | Existing detail pages and export flow rely on ID-based favorites | Kept catalog favorites unchanged and merged AI favorites only on the page layer |

## Step 4.0-09 - Shopping List Sync

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Storage Design | Manual requested `xiaofanzhuo_ai_shopping_list`, while the app already has a shopping storage key | A separate reader could duplicate state and break existing CRUD | Stored raw AI list under the requested key, then mapped it into the existing shopping item data flow |
| Duplicates | Repeated AI generation could append duplicate AI shopping items | Shopping list would grow stale and confusing | Replaced previous `ai-generated` group items on each AI result |
| Group Label | AI group does not correspond to a recipe id | It could display as a fallback recipe/manual list | Added `AI_SHOPPING_GROUP_ID` and `AI 生成清单` label |
| Interaction | Existing detail page supported per-item delete but not clear all | Step 9 required clearing all AI list items | Added current-group clear action |

## Step 4.0-01 - Project Structure Check

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Structure | Project already has partial AI abstraction from 3.0 | 4.0 should not duplicate service layers blindly | Recorded existing `src/services/ai/*` and recommended aligning new `askAI()` with current structure |
| Security | API Key must not be placed in frontend code | Leaking key would make public GitHub Pages deployment unsafe | Recorded requirement that frontend calls `/api/ai` only and serverless reads env vars |
| Scope Control | Step01 should not modify business code | Risk of mixing investigation with implementation | Kept Step01 as read-only plus documentation records |
| Archive | Step01 initially had no 4.0 record | Future AI work would lose traceability | Added v4 prompt log, report, flowchart, status, issue/reflection logs, and recording rules |

## Step 4.0-03 - AI Data Structure

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Data Contract | AI output needs a stable frontend shape before real API integration | Later `/api/ai` and UI rendering may drift if fields are not fixed | Added `AIResponse`, `AIRecipe`, `AIShoppingItem`, validation, and normalization helpers |
| Demo Mode | 4.0 must work without API Key | Vercel demo or failed API calls would have no usable response | Added `mockAIResponse` with recipes, shopping list, cooking steps, estimated time, and tips |
| Scope Control | Step 3 should not change visible UI | Data layer work could accidentally alter homepage behavior | Limited changes to data/type files and records only |

## Step 4.0-04 - Frontend AI Service

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| API Boundary | Frontend must not call real AI provider directly | API Key exposure risk and duplicated request logic | Added `askAI()` that only calls internal `/api/ai` |
| Resilience | `/api/ai` does not exist yet in this step | Direct requests would fail before Step 5 | Added automatic mock fallback for failed requests |
| Response Quality | Serverless response shape may vary during integration | UI could break if response wrapper changes | `askAI()` accepts direct response, `data`, `result`, or `aiResponse`, then validates shape |
| UX Safety | Slow AI requests can hang the page | User may wait indefinitely | Added `AbortController` timeout with mock fallback |

## Step 4.0-05 - Vercel Serverless API

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Security | API Key must stay server-side | Frontend or GitHub exposure would be unsafe | `api/ai.js` reads `AI_API_KEY` only from `process.env` |
| Deployment Root | Vercel API location depends on project root | Wrong location would prevent `/api/ai` from deploying | Added API under `1_project_files/cooking-ai-planner/api/ai.js`, matching the Vite app root |
| Demo Mode | Missing `AI_API_KEY` should not block demo | Online preview would fail before env vars are configured | Missing key returns mock data with `demoMode: true` |
| Provider Output | AI may return Markdown or mixed text | JSON parsing could fail | Added fenced JSON and substring extraction before validation |
| Error Safety | Provider failures should not leak secrets | Error body could reveal sensitive details | Returned only status/code metadata and mock fallback |

## Step 4.0-06 - Env Example

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Gitignore | Root `.gitignore` used `.env.*`, which also ignored `.env.example` | Safe example file would not be committed | Added `!**/.env.example` |
| Security | Real env files must stay ignored | API Key could leak to GitHub | Confirmed `.env`, `.env.local`, `.env.*.local` are ignored |
| Scope Control | Step 6 should not create real env files | Could accidentally introduce secrets | Added only `.env.example` with empty/safe values |

## Step 4.0-07 - AI Prompt

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| Output Stability | AI may return Markdown or prose around JSON | Frontend parsing would fail | Prompt now explicitly forbids Markdown, code blocks, and extra text |
| Schema Drift | AI may add fields or return object arrays where string arrays are expected | `isAIResponse()` could reject useful output | Prompt repeats exact schema and field constraints |
| User Context | Raw context JSON alone may be underspecified | AI may ignore budget/time/equipment | Added `buildUserPrompt()` with explicit context priorities and defaults |
| Compatibility | `response_format` may not be supported by every third-party base URL | Some providers may fail | Existing provider failure fallback still returns mock/demo data |

## Step 4.0-08 - Start Cooking AI Hookup

| Type | Issue | Impact | Resolution / Record |
|---|---|---|---|
| UX Flow | Previous homepage generation immediately navigated to `/results` | AI answer could not be shown on the start page | Rendered AI result inline below `HomeHero` |
| Backward Compatibility | Existing mock generation still feeds random recipe behavior | Removing it would break old home interactions | Kept existing `generate()` call in parallel with `askAI()` |
| Demo Mode | No `/api/ai` or no Key should still display usable results | Online demo may otherwise appear broken | `askAI()` fallback renders with `演示模式` badge |
| Scope Control | Step 8 should not implement shopping/favorites yet | Could mix page hookup with storage sync | Limited output to answer, recipes, cooking steps, and tips |
