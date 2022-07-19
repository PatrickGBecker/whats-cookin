import Ingredient from './Ingredient.js';

class Recipe {
  constructor(recipes) {
    this.id = recipes.id;
    this.image = recipes.image;
    this.ingredients = recipes.ingredients;
    this.instructions = recipes.instructions;
    this.name = recipes.name;
    this.tags = recipes.tags;
  }

  getIngredientsData(ingredientsData) {
    this.ingredients = this.ingredients.map(ingredient => {
      return new Ingredient(ingredient);
    });

    this.ingredients.forEach(ingredient => ingredient.findIngredientInfo(ingredientsData));
  }

  returnIngredientList() {
    return this.ingredients.map(ingredient =>
      `${ingredient.quantityAmount} ${ingredient.quantityUnit} ${ingredient.name}`
    );
  };

  returnTotalCost() {
    const cost = this.ingredients.reduce((recipeCost, ingredient) => {
      recipeCost += ingredient.calculateCost();
      return recipeCost;
    }, 0)
    return cost.toFixed(2);
  }

  returnInstructions() {
    return this.instructions.map(instruction => `${instruction.instruction}`);
  };
}


export default Recipe;
