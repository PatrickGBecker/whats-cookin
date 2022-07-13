import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient.js';
import Recipe from '../src/classes/Recipe.js';
import { sampleIngredientData } from '../src/test/sampleIngredientData.js';
import { sampleRecipeData } from '../src/test/sampleRecipeData.js';

describe('Recipe Class', () => {
  let recipe;
  let ingredient;

  beforeEach( () => {
    recipe = new Recipe(sampleRecipeData[0]);
    ingredient = new Ingredient(sampleIngredientData[0]);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should have an id', () => {
    expect(recipe.id).to.equal(595736);
  });

  it('should store an image url', () => {
    expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg")
  });

  it('should store ingredients', () => {
    expect(recipe.ingredients).to.equal(sampleRecipeData[0].ingredients)
  });

  it('should create an instance of Ingredients with an id', () => {
    expect(recipe.ingredients[0]).to.be.an.instanceof(Ingredient);
    expect(recipe.ingredients[0].id).to.equal(20081);
  });

  it('should store an instance of Ingredients in an array', () => {
    expect(recipe.ingredients).to.be.an('array');
    expect(recipe.ingredients).to.deep.equal([
      {"id": 20081,"quantity": { "amount": 1.5, "unit": "c"}  },
      {"id": 18372,"quantity": {"amount": 0.5,"unit": "tsp"}  },
      {"id": 1123,"quantity": {"amount": 1,"unit": "large"}  },
      {"id": 19335,"quantity": {"amount": 0.5,"unit": "c"}  },
      {"id": 19206,"quantity": {"amount": 3,"unit": "Tbsp"} },
      {"id": 19334,"quantity": {"amount": 0.5,"unit": "c"}  },
      {"id": 2047,"quantity": {"amount": 0.5,"unit": "tsp"} },
      {"id": 1012047,"quantity": {"amount": 24,"unit": "servings"}  },
      {"id": 10019903,"quantity": {"amount": 2,"unit": "c"} },
      {"id": 1145,"quantity": {"amount": 0.5,"unit": "c"} },
      {"id": 2050,"quantity": {"amount": 0.5,"unit": "tsp"} }
    ]);
  })

  it('should store a list of instructions', () => {
    expect(recipe.instructions).to.be.an('array');
    expect(recipe.instructions[0].number).to.equal(1);
    expect(recipe.instructions).to.deep.equal(sampleRecipeData[0].instructions);
  });

  it('should have a name', () => {
    expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
  });

  it('should store a list of tags', () => {
    expect(recipe.tags).to.be.an('array');
    expect(recipe.tags).to.equal(sampleRecipeData[0].tags);
  });
});

  describe('Recipe methodology', () => {
    it('should return a list of ingredients', () => {
      const expected = [
        "1.50 c wheat flour",
        "0.50 tsp bicarbonate of soda",
        "1 large eggs",
        "0.50 c sucrose",
        "3 Tbsp instant vanilla pudding",
        "0.50 c brown sugar",
        "0.50 tsp salt",
        "24 servings fine sea salt",
        "2 c semi sweet chips",
        "0.50 c unsalted butter",
        "0.50 tsp vanilla"
      ];

      const listOfIngredients = recipe.returnIngredientList(ingredientData, recipeData);

      expect(listOfIngredients).to.be.an('array');
      expect(listOfIngredients).to.deep.equal(expected)
    });

    it('should return the total cost of all ingredients', () => {
      const expected = '177.76';
      const totalCost = recipe.returnTotalCost(ingredientData, recipeData);

      expect(totalCost).to.equal(expected);
    });

    it('should return the instructions', () => {
      const instructions = recipe.returnInstructions(recipeData);

      expect(instructions.length).to.deep.equal(sampleRecipeData[0].instructions.length);
      expect(instructions).to.be.an('array');
      expect(instructions[1]).to.equal("Add egg and vanilla and mix until combined.");
    });
  });