# Baseline Components - Current 2.0

Date: 2026-05-22

## Pages

- `FavoritesPage.jsx`
- `HomePage.jsx`
- `RecentPage.jsx`
- `RecipeDetailPage.jsx`
- `RecipeResultsPage.jsx`
- `SettingsPage.jsx`
- `ShoppingDetailPage.jsx`
- `ShoppingListPage.jsx`
- `TipsPage.jsx`

## Layout Components

- `AppLayout.jsx`
- `SideNav.jsx`
- `TopBar.jsx`
- `PageHeader.jsx`

## Home Components

- `HomeHero.jsx`
- `FiltersPanel.jsx`
- `PhotoUploadButton.jsx`
- `RandomRecipeModal.jsx`
- `BudgetPlanModal.jsx`
- `RecipeCard.jsx`
- `AgentComposer.jsx` (legacy/unused in current v2 flow)

## Feature Components

- `AddToShoppingResultModal.jsx`
- `TipCard.jsx`
- `P5HeroDecoration.jsx`

## Services

- `homeRecipeAgentService.js`: builds home params, filters recipe catalog, mock generation, random recipe.
- `shoppingService.js`: shopping item shape, migration, grouping.
- `exportService.js`: local JSON export.
- `mockPlanner.js`: older mock learning plan helper.
- `sound/soundService.js`: success sound priming/playback.
- `ai/aiConfigModel.js`: local AI config normalization.
- `ai/llmProvider.js`: provider factory; only mock is usable.
- `ai/retrievalService.js`: local JSON retrieval mock.
- `ai/promptBuilder.js`: prompt preview builder.
- `ai/recipeGenerationService.js`: mock recipe generation through retrieval/prompt scaffolding.

## Hooks

- `useAiConfig.js`
- `useFavorites.js`
- `useHashRoute.js`
- `useLocalStorage.js`
- `useRecent.js`
- `useRecipeGeneratorState.js`
- `useShoppingList.js`
- `useToast.js`

## Data

- `recipeCatalog.js`: 4 baseline recipes with ingredients, condiments, steps, nutrition, budget, equipment, servings.
- `tipsCatalog.js`: 3 beginner tips.
- `data/knowledge/*.json`: local mock knowledge files for retrieval.

## 3.0 Component Gap

- No timer component.
- No task panel component.
- No task card component.
- No task detail/tutorial page.
- No budget ledger hook/service.
- Existing cards/buttons are not yet separated into clear 3.0 deep-card and light-card variants.

