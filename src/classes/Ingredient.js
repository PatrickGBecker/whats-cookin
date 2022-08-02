class Ingredient {
    constructor(ingredient) {
        this.name = '';
        this.id = ingredient.id;
        this.quantityAmount = ingredient.quantity.amount;
        this.quantityUnit = ingredient.quantity.unit;
        this.costPerUnitInCents = 0;
    }

    findIngredientInfo(ingredientsData) {
      const ingredient = ingredientsData.find(ingredient => ingredient.id === this.id);
      this.name = ingredient.name;
      this.costPerUnitInCents = ingredient.estimatedCostInCents;
    }

    calculateCost() {
        return (this.quantityAmount * this.costPerUnitInCents) / 100;
    }
    
};


export default Ingredient;
