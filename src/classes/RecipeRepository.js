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
      .filter(recipe => recipe.name.includes(recipeName))
      .map(recipe => recipe);
    return filteredRecipesByName;
  }

  getRecipeIngredientsData(ingredientName, searchInput) {
      const recipes = this.recipes;
      const filteredRecipes = recipes
        .reduce((searchedRecipes, recipe) => {
          if (recipe.name === searchInput) {
            searchedRecipes.push(recipe);
          } else {
            const matchedIngredient = recipe.ingredients
            .find((ingredient) => {
              return ingredient.name.includes(ingredientName);
            });
            if(matchedIngredient) {
              searchedRecipes.push(recipe);
            }
          }
            return searchedRecipes
          }, []);
          // console.log('filteredRecipes', filteredRecipes);
        return filteredRecipes;
      }
  // getRecipeIngredientsData(ingredientName, recipesToSearch) {
  //   const recipes = recipesToSearch || this.recipes;
  //   const filteredRecipe = recipes.filter((recipe) => {
  //     const hasMatchingIngredient = recipe.ingredients.find((ingredient) => {
  //       return ingredient.name.includes(ingredientName);
  //     })
  //     if (hasMatchingIngredient) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   return filteredRecipe;
  // }
  // getRecipeIngredientsData(searchInput) {
  //   const recipes = this.recipes || searchInput ;
  //   const filteredRecipe = recipes.filter((recipe) => {
  //     const hasMatchingIngredient = recipe.ingredients.find((ingredient) => {
  //       return ingredient.name.includes(searchInput);
  //     })
  //     if (hasMatchingIngredient) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   return filteredRecipe;
  // }

};

export default RecipeRepository;
