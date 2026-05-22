# Baseline localStorage / State - Current 2.0

Date: 2026-05-22

## Provider

State is centralized in `src/store/appData.js` through `AppDataProvider`.

## Current Keys

| Key | Purpose | Notes |
|---|---|---|
| `cooking_ai_planner.favorites.ids.v1` | Favorite recipe ids | Array of recipe id strings |
| `cooking_ai_planner.shopping.items.v1` | Shopping items | Normalized shopping item records |
| `cooking_ai_planner.recipe_generator.state.v1` | Home input, filters, photo placeholder | Persistent input and filter state |
| `cooking_ai_planner.recent.cooked.v1` | Recently cooked records | `{ recipeId, cookedAt }` records, max 30 |
| `cooking_ai_planner.ai.config.v1` | Local AI config | Mock/provider settings; no real network call |

## Legacy Read Fallbacks

| Feature | Legacy Keys |
|---|---|
| favorites | `cooking_ai_planner.favorites.v1` |
| shoppingItems | `cooking_ai_planner.shopping_items.v1` |
| recentCooked | none |
| aiConfig | none |

## Current State Contexts

- `FavoritesCtx`
- `ShoppingCtx`
- `RecipeGenCtx`
- `AiConfigCtx`
- `RecentCtx`

## 3.0 State Gap

3.0 will need additional local state for:

- task progress / completed task ids
- XP total
- derived level and stage
- monthly budget amount
- monthly expense records
- timer state may remain component-local unless persistence is explicitly required

