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

  filterFavoritesByTag(searchInput) {
    const foundRecipes = this.favoriteRecipes.filter((recipe) => {
      searchInput === recipe.tags.includes(searchInput)
      return recipe
    })
      return foundRecipes;
  }
  
};

export default User;
