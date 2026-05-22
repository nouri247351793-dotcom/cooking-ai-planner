# Baseline Routes - Current 2.0

Date: 2026-05-22

The app uses `HashRouter` in `src/App.jsx`, with all routes nested under `AppLayout`.

| Route | Component | Current Role |
|---|---|---|
| `#/` | `HomePage` | Main recipe generation page with right-side support tools |
| `#/results` | `RecipeResultsPage` | Generated/mock recipe result list |
| `#/recipes/:recipeId` | `RecipeDetailPage` | Recipe detail, selectable ingredients, favorite, recent, add-to-shopping |
| `#/shopping` | `ShoppingListPage` | Grouped shopping list overview |
| `#/shopping/:itemId` | `ShoppingDetailPage` | Group detail and manual shopping CRUD |
| `#/favorites` | `FavoritesPage` | Favorite recipe list, search/filter/export |
| `#/recent` | `RecentPage` | Recently cooked recipe records |
| `#/tips` | `TipsPage` | Beginner cooking tips |
| `#/settings` | `SettingsPage` | Local AI config placeholder |
| `*` | `Navigate to /` | Unknown route fallback |

## 3.0 Route Gap

- No route exists for task details or mini tutorials.
- No route exists for task history or XP history.
- Budget currently opens as a modal, not a route; this can remain modal-based in 3.0.

