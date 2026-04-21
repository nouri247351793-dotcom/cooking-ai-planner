export const STORAGE_KEYS = {
  // Namespace: cooking_ai_planner.<feature>.<type>.v<schemaVersion>
  // - Keep versions explicit to enable safe migrations
  // - Prefer adding a new key with bumped version instead of mutating shape silently
  favorites: 'cooking_ai_planner.favorites.ids.v1',
  shoppingItems: 'cooking_ai_planner.shopping.items.v1',
  recipeGenerator: 'cooking_ai_planner.recipe_generator.state.v1',
  recentCooked: 'cooking_ai_planner.recent.cooked.v1',
  aiConfig: 'cooking_ai_planner.ai.config.v1',
}

// Best-effort legacy key migration (read-only fallback)
export const LEGACY_KEYS = {
  favorites: ['cooking_ai_planner.favorites.v1'],
  shoppingItems: ['cooking_ai_planner.shopping_items.v1'],
  recentCooked: [],
  aiConfig: [],
}
