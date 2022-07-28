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
//2nd version
  // returnPantryIngredients(recipe) {
  //   const match = recipe.ingredients.reduce((acc, ingredient) => {
  //     console.log('ingredient', ingredient);
  //     this.pantry.forEach(pantryIngredient => {
  //       if (pantryIngredient.ingredient === ingredient.id) {
  //         acc.push(`${pantryIngredient.amount} ${ingredient.name}`)
  //       }
  //     })
  //     return acc
  //   }, [])
  //   return match
  // }
//first version
  // returnPantryIngredients() {
  //   let match = this.pantry.reduce((acc, pantryIngredient) => {
  //     this.repository.recipes.find(recipe => {
  //       recipe.ingredients.find(ingredient => {
  //         if (pantryIngredient.ingredient === ingredient.id) {
  //           acc.push(`${pantryIngredient.amount} ${ingredient.name}`)
  //         }
  //       })
  //     })
  //     return acc
  //   }, [])
  //   return match;
  // }

  addIngredientAmount(ingredients) {
    ingredients.forEach(ingredient => {
      const match = this.pantry.find(pantryIngredient => pantryIngredient.ingredient === ingredient.id)
        if (match) {
          match.amount += ingredient.amount;
        } else {
            this.addIngredientToPantry(ingredient);
        }
    })
  };

  subtractIngredientAmount(ingredients) {
    ingredients.forEach(ingredient => {
      const match = this.pantry.find(pantryIngredient => pantryIngredient.ingredient === ingredient.id)

      match.amount -= ingredient.amount;
      !match.amount && this.removeIngredient(match);
    })
  }

  removeIngredient(ingredient) {
    const ingredientIndex = this.pantry.indexOf(ingredient);
    this.pantry.splice(ingredientIndex, 1);
  }

  addIngredientToPantry(ingredient) {
     this.pantry.push({ingredient: ingredient.id, amount: ingredient.amount});
   }

};

export default User;
