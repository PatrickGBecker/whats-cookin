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
      console.log(recipe);
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

};

export default User;
