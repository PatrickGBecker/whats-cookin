import Recipe from './Recipe';
import Ingredient from './Ingredient';

class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
  }

  filterByTag(tagType) {
    const recipes = this.recipes;
    const filteredRecipesByTags = recipes
      .filter(recipe => recipe.tags.includes(tagType))
      .map(recipe => recipe);
      return filteredRecipesByTags;
  }

  filterByRecipeName(recipeName) {
    const recipes = this.recipes;
    const filteredRecipesByName = recipes
      .filter(recipe => recipe.name.includes(recipeName))
      .map(recipe => recipe);
      return filteredRecipesByName;
  }

   getRecipeIngredientsData(ingredientName, recipesToSearch) {
    const recipes = recipesToSearch || this.recipes;
    const filteredRecipe = recipes.filter((recipe) => {
      const hasMatchingIngredient = recipe.ingredients.find((ingredient) => {
        return ingredient.name.includes(ingredientName);
      })
      if (hasMatchingIngredient) {
        return true;
      }
      return false;
    })
    return filteredRecipe;
  }

};

export default RecipeRepository;
