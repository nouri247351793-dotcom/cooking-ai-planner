import { useMemo } from 'react'
import useLocalStorage from './useLocalStorage.js'
import {
  AI_FAVORITE_RECIPES_STORAGE_KEY,
  addAIFavoriteRecipe,
  isAIFavoriteRecipe,
  normalizeAIFavoriteRecipes,
  removeAIFavoriteRecipe,
} from '../services/aiFavoriteRecipeService.js'

export default function useAIFavoriteRecipes() {
  const [rawRecipes, setRawRecipes] = useLocalStorage(AI_FAVORITE_RECIPES_STORAGE_KEY, [])
  const aiFavoriteRecipes = useMemo(() => normalizeAIFavoriteRecipes(rawRecipes), [rawRecipes])

  const addRecipe = (recipe) => setRawRecipes((prev) => addAIFavoriteRecipe(prev, recipe))
  const removeRecipe = (recipeId) => setRawRecipes((prev) => removeAIFavoriteRecipe(prev, recipeId))
  const isFavoriteRecipe = (recipeId) => isAIFavoriteRecipe(aiFavoriteRecipes, recipeId)
  const toggleRecipe = (recipe) => {
    if (isFavoriteRecipe(recipe?.id)) removeRecipe(recipe.id)
    else addRecipe(recipe)
  }

  return {
    aiFavoriteRecipes,
    addAIFavoriteRecipe: addRecipe,
    removeAIFavoriteRecipe: removeRecipe,
    isAIFavoriteRecipe: isFavoriteRecipe,
    toggleAIFavoriteRecipe: toggleRecipe,
  }
}
