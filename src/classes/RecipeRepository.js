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

  getRecipeIngredientsData(searchInput) {
    const recipes = this.recipes;
    const filteredRecipes = recipes
      .reduce((searchedRecipes, recipe) => {
        if (recipe.name === searchInput) {
          searchedRecipes.push(recipe);
        } else {
          const matchedIngredient = recipe.ingredients
            .find(ingredient => ingredient.name === searchInput)
            if(matchedIngredient) {
              searchedRecipes.push(recipe);
            }
            console.log(searchedRecipes);
          }  
          return searchedRecipes
        }, []);
      return filteredRecipes;
    }
  };
  
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
  
//   getRecipeInfo(ingredientsData) {
//     const recipes = this.recipes;
//     const recipeInfo = new Recipe(recipes)
//       .forEach(recipe => recipe.getIngredientsData(ingredientsData))
//       .map(recipe => recipe);
//     return recipeInfo;
//   }

// };

export default RecipeRepository;
