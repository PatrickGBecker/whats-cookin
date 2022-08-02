import Recipe from './Recipe';
import Ingredient from './Ingredient';

class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
  }

  getRecipesInfo(ingredientsData) {
    this.recipes = this.recipes.map(recipe => new Recipe(recipe));
    this.recipes.forEach((recipe) => {
      recipe.getIngredientsData(ingredientsData);
    });
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
      .filter(recipe => recipe.name.toLowerCase().includes(recipeName))
      .map(recipe => recipe);
    return filteredRecipesByName;
  }

  findRecipesByName(searchTerm, recipesToSearch) {
  const recipes = recipesToSearch || this.recipes;
  const foundRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
  })
  return foundRecipes;
}

  getRecipeIngredientsData(ingredientName, searchInput) {
      const recipes = this.recipes;
      const filteredRecipes = recipes
        .reduce((searchedRecipes, recipe) => {
          if (recipe.name.toLowerCase() === searchInput.toLowerCase()) {
            searchedRecipes.push(recipe);
          } else {
            const matchedIngredient = recipe.ingredients
            .find((ingredient) => {
              return ingredient.name.toLowerCase().includes(ingredientName);
            });
            if(matchedIngredient) {
              searchedRecipes.push(recipe);
            }
          }
            return searchedRecipes
          }, []);
        return filteredRecipes;
      }
};

export default RecipeRepository;
