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
      console.log('recIng: ', recipeIngredient.quantityAmount);
      this.pantry.forEach(pantryIngredient => {
        if (recipeIngredient.id === pantryIngredient.ingredient && pantryIngredient.amount >= recipeIngredient.quantityAmount) {
          match += 1;
      }
    })
  })
    return match === recipe.ingredients.length;
  }

returnPantryIngredients() {
    let matchingIngredient;

    return this.pantry.reduce((acc, pantryIngredient) => {
      this.repository.recipes.find(recipe => {
        matchingIngredient =  recipe.ingredients.find(ingredient => pantryIngredient.ingredient === ingredient.id)

        return matchingIngredient;
      })

      acc.push(`${pantryIngredient.amount} ${matchingIngredient.name}`)
      return acc
    }, [])
  }

  addIngredientAmount(ingredients) {
    ingredients.forEach(ingredient => {
      const match = this.pantry.find(pantryIngredient => pantryIngredient.ingredient === ingredient.id)
        if (match) {
          match.amount += ingredient.quantityAmount;
        } else {
            this.addIngredientToPantry(ingredient);
        }
    })
  };

  subtractIngredientAmount(ingredients) {
    ingredients.forEach(ingredient => {
      const match = this.pantry.find(pantryIngredient => pantryIngredient.ingredient === ingredient.id)

      match.amount -= ingredient.quantityAmount;
      !match.amount && this.removeIngredient(match);
    })
  }

  removeIngredient(ingredient) {
    const ingredientIndex = this.pantry.indexOf(ingredient);
    this.pantry.splice(ingredientIndex, 1);
  }

  addIngredientToPantry(ingredient) {
     this.pantry.push({ingredient: ingredient.id, amount: ingredient.quantityAmount});
   }

   returnNeededIngredients(recipe) {
   const result = recipe.ingredients.reduce((obj, recipeIngredient) => {
     let match = this.pantry.find(pantryIngredient => recipeIngredient.id === pantryIngredient.ingredient)

     if (match) {
       obj.have.push(recipeIngredient)
     } else {
       obj.need.push(recipeIngredient)
     }
     return obj
   },
   {
     have: [],
     need: []
   })

   const needByAmount = result.have.filter(resultIngredient => {
     let foundMatches = this.pantry.find(ingredient => ingredient.ingredient === resultIngredient.id)
     return foundMatches.amount < resultIngredient.quantityAmount

   }).map(recipeIngredient => {
     const foundMatches = this.pantry.find(pantryIngredient => pantryIngredient.ingredient === recipeIngredient.id)
     return {
       id: recipeIngredient.id,
       name: recipeIngredient.name,
       amount: recipeIngredient.quantityAmount - foundMatches.amount
     }
   })

   const totalNeed = result.need.concat(needByAmount)
   return totalNeed
 }

};

export default User;
