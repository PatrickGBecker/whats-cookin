import { expect } from 'chai';
import { recipeData } from '../src/data/sampleRecipeData.js';
import { ingredientsData } from '../src/data/sampleIngredientData';
import Ingredient from '../src/classes/Ingredient';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('Recipe Repository', () => {
  let repository;

  beforeEach( () => {
    repository = new RecipeRepository(recipeData);
    repository.getRecipesInfo(ingredientsData);
  })

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of the Recipe Respository', () => {
    expect(repository).to.be.an.instanceOf(RecipeRepository);
  });

  it('should have recipes', () => {
    expect(repository.recipes[0].id).to.equal(recipeData[0].id)
  });

  it('should have tags for each recipe', () => {
    expect(repository.recipes[0].tags).to.deep.equal(['antipasti', 'starter', 'snack', 'appetizer', 'antipasto', 'hor d\'oeuvre'])
    expect(repository.recipes[1].tags).to.deep.equal(['side dish'])
    expect(repository.recipes[2].tags).to.deep.equal(['lunch', 'main course', 'main dish', 'dinner'])
  });

  it('should have ingredient information for a recipe', () => {
      const newRepo = new RecipeRepository(recipeData);
      let ingredient1 = newRepo.recipes[0].ingredients[0];

      expect(ingredient1.name).to.equal(undefined);
      expect(ingredient1).not.instanceOf(Ingredient);

      newRepo.getRecipesInfo(ingredientsData);
      ingredient1 = newRepo.recipes[0].ingredients[0];

      expect(ingredient1.name).to.equal('wheat flour');
      expect(ingredient1).instanceOf(Ingredient);
    });


  // it('should have ingredient information for a different recipe', () => {
  //   const recipeIngredients2 = [
  //     { id: 20081, quantity: { amount: 1, unit: 'cup' } },
  //     { id: 18371, quantity: { amount: 2, unit: 'teaspoons' } },
  //     { id: 9040, quantity: { amount: 12, unit: 'servings' } },
  //     { id: 20011, quantity: { amount: 1, unit: 'cup' } },
  //     { id: 1001, quantity: { amount: 2, unit: 'tablespoons' } },
  //     { id: 1001, quantity: { amount: 6, unit: 'tablespoons' } },
  //     { id: 1230, quantity: { amount: 2, unit: 'cups' } },
  //     { id: 1123, quantity: { amount: 2, unit: '' } },
  //     { id: 19296, quantity: { amount: 12, unit: 'servings' } },
  //     { id: 16098, quantity: { amount: 12, unit: 'servings' } },
  //     { id: 2047, quantity: { amount: 1, unit: 'teaspoon' } },
  //     { id: 19335, quantity: { amount: 2, unit: 'teaspoons' } }
  //   ]
  //
  //   expect(repository.recipes[1].ingredients).to.deep.equal(recipeIngredients2)
  // })

  it('should filter recipes by tags', () => {
    const expected1 =  repository.filterByTag('appetizer')
    const expected2 =  repository.filterByTag('side dish')
    const expected3 =  repository.filterByTag('dinner')

    expect(expected1).to.deep.equal([repository.recipes[0]]);
    expect(expected2).to.deep.equal([repository.recipes[1]]);
    expect(expected3).to.deep.equal([repository.recipes[2]]);
  })

  it('should not return a recipe if tag is not found', () => {
    const expected = repository.filterByTag('dessert')

    expect(expected).to.deep.equal([]);
    expect(expected.name).to.equal(undefined);
  });

  it('should filter recipes by name', () => {
    const expected1 = repository.filterByRecipeName('Loaded Chocolate Chip Pudding Cookie Cups');
    const expected2 = repository.filterByRecipeName('Elvis Pancakes');
    const expected3 = repository.filterByRecipeName('Egg and Rapini Casserole');

    expect(expected1).to.deep.equal([repository.recipes[0]])
    expect(expected2).to.deep.equal([repository.recipes[1]])
    expect(expected3).to.deep.equal([repository.recipes[2]])
  });

  it('should not return a recipe if name is not found', () => {
    const expected = repository.filterByRecipeName('Creme L\'ainglaise')

    expect(expected).to.deep.equal([]);
    expect(expected.name).to.equal(undefined);
  })

  it('should get recipes that includes search term', () => {
    const expected1 = repository.getRecipeIngredientsData('instant vanilla pudding');
    const expected2 = repository.getRecipeIngredientsData('wheat flour');
    const expected3 = repository.getRecipeIngredientsData('proscuitto');

    expect(expected1).to.deep.equal([repository.recipes[0]])
    expect(expected2).to.deep.equal([repository.recipes[0], repository.recipes[1]])
    expect(expected3).to.deep.equal([repository.recipes[2]])
  });

  it('should return an empty array if no recipes match the search term', () => {
    const expected = repository.getRecipeIngredientsData('broccoli');

    expect(expected).to.deep.equal([]);
    expect(expected.name).to.equal(undefined);
  })

  it('should get all data for a given recipe', () => {

    const expected1 = repository.getRecipeIngredientsData('semi sweet chips');
    const expected2 = repository.getRecipeIngredientsData('banana');
    const expected3 = repository.getRecipeIngredientsData('proscuitto');

    expect(expected1).to.deep.equal([repository.recipes[0]]);
    expect(expected2).to.deep.equal([repository.recipes[1]]);
    expect(expected3).to.deep.equal([repository.recipes[2]]);
  });

  it('should not return any recipe data if the recipe is not found', () => {
    const expected = repository.getRecipeIngredientsData();

    expect(expected).to.deep.equal([]);
    expect(expected.name).to.equal(undefined);
  })

});
