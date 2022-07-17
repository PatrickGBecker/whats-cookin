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

  // getRecipeIngredientsData(ingredientsData) {
  //   console.log('recipes', this.recipes)
  //   // const newRecipe = new Recipe(recipe)
  //   const recipeMap = this.recipes.map(recipe => new Recipe(recipe))
  //     this.recipes.forEach((recipe) => {
  //       recipe.getIngredientsData(ingredientsData) // return new Ingredient(ingredient);
  //   })
    
  //   // this.recipes.forEach(ingredient => ingredient.findIngredientInfo(ingredientsData));
  // };

};

export default RecipeRepository;