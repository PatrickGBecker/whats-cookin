import RecipeRepository from './RecipeRepository'

class User {
  constructor(usersData, recipeRepository) {
    this.name = usersData.name;
    this.id = usersData.id;
    this.pantry = usersData.pantry;
    this.favoriteRecipes = [];
    this.filterByRecipeName = [];
    this.repository = recipeRepository;
  }

  addToFavorites(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeFromFavorites(recipe) {
    this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1);
  }

  filterFavoritesByName(searchInput) {
    const foundRecipes = this.favoriteRecipes.filter((recipe) => {
      searchInput === recipe.name
      return recipe
    })
      return foundRecipes
  }

  filterFavoritesByTag(tags) {
    const foundRecipes = this.repository.filterByTag(tags, this.favoriteRecipes);
      return foundRecipes;
    }

  filterFavoritesByIngredient(ingredientName) {
    const filteredRecipe = this.repository.getRecipeIngredientsData(ingredientName, this.favoriteRecipes);
    return filteredRecipe;
  }

  checkPantry(recipe) {
    let match = 0;
    recipe.ingredients.forEach(recipeIngredient => {
      this.pantry.forEach(pantryIngredient => {
        if (recipeIngredient.id === pantryIngredient.ingredient && pantryIngredient.amount >= recipeIngredient.amount) {
          equal += 1;
      }
    })
  })
    return match === recipe.ingredients.length;
  }


  returnPantryIngredients() {
    let matchingIngredient;
console.log('pantry', this.pantry);
    return this.pantry.reduce((acc, pantryIngredient) => {
      this.repository.recipes.find(recipe => {
        matchingIngredient = recipe.ingredients.find(ingredient => pantryIngredient.ingredient === ingredient.id)
      return matchingIngredient;
      })
      acc.push(`${pantryIngredient.amount} ${matchingIngredient}`)
      return acc
    }, [])
  }

};

export default User;
