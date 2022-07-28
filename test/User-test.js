import { expect } from 'chai';
import { usersData } from '../src/data/sampleUserData.js';
import { recipeData } from '../src/data/sampleRecipeData.js';
import { ingredientsData } from '../src/data/sampleIngredientData.js';
import User from '../src/classes/User.js';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';


describe('User', () => {
  let user;
  let recipeName;
  let recipeRepository;
  let allIngredients;
  let notEnoughIngredients;
  let missingIngredients;
  const tag1 = 'appetizer';
  const tag2 = 'lunch';
  const tag3 = 'side dish';

  beforeEach( () => {
    user = new User(usersData[0], recipeRepository);
    recipeRepository = new RecipeRepository(recipeData);
    recipeRepository.getRecipesInfo(ingredientsData);
    allIngredients = new Recipe(recipeData[0]);
    missingIngredients = new Recipe(recipeData[2]);
    notEnoughIngredients = new Recipe(recipeData[1]);
    missingIngredients.getIngredientsData(ingredientsData);
    notEnoughIngredients.getIngredientsData(ingredientsData);
    allIngredients.getIngredientsData(ingredientsData);
    user.addToFavorites(allIngredients);
    user.addToFavorites(notEnoughIngredients);
    user.addToFavorites(missingIngredients);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User)
  });

  it('should have a name', () => {
    expect(user.name).to.equal(`Saige O'Kon`);
  });

  it('should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a pantry of ingredients', () => {
    expect(user.pantry).to.deep.equal(usersData[0].pantry);
  });

  it('should be able to add favorite recipes to a list', () => {
      expect(user.favoriteRecipes).to.deep.equal(
      [allIngredients, notEnoughIngredients, missingIngredients]);
    });

  it('should be able to remove favorite recipes to a list', () => {
      user.removeFromFavorites(notEnoughIngredients);

      expect(user.favoriteRecipes).to.deep.equal([allIngredients, missingIngredients]);
    });

  it('should be able to filter favorites by name', () => {
      expect(user.filterFavoritesByName('Loaded Chocolate Chip Pudding Cookie Cups')).to.deep.equal(user.favoriteRecipes);
    });

  it('should be able to filter recipes by tag', () => {
      expect(user.filterFavoritesByTag(tag1)).to.deep.equal([allIngredients]);
  });

  it('should be able to filter favorites by more than one tag', () => {
     expect(user.filterFavoritesByTag(tag1, tag2, tag3)).to.deep.equal(
      [allIngredients]);
  });

  it('should be able to filter favorites by ingredient', () => {
    expect(user.filterFavoritesByIngredient('wheat flour')).to.deep.equal([allIngredients, notEnoughIngredients]);
  });

  it('should be able to check pantry for ingredients needed to cook a recipe', () => {

      expect(user.checkPantry(allIngredients)).to.equal(false) //should be true
      expect(user.checkPantry(missingIngredients)).to.equal(false)
    });

  it('should be able to check user pantry for ingredient amount necessary to cook recipe', () => {
       expect(user.checkPantry(notEnoughIngredients)).to.equal(false)
       expect(user.checkPantry(missingIngredients)).to.equal(false)
     });

  it.skip('should be able to return the pantry ingredients', function() {

      const expected = [
        '5 wheat flour',
        '5 whole garlic clove',
        '6 salt',
        '8 eggs',
        '4 vanilla',
        '5 buck wheat flour'
      ]
console.log(user.pantry);
      const pantryIngredients = user.returnPantryIngredients(recipeData[0])
      // console.log(pantryIngredients[0]);
      expect(pantryIngredients[0]).to.be.a('string');
      expect(pantryIngredients).to.deep.equal(expected);
      expect(pantryIngredients.length).to.equal(6);
    });

  it('should be able to add to the ingredients amount in pantry', () => {
      const ingredients = [{id: 20081, amount: 2}, {id: 1123, amount: 1}]

      const originalFlourAmount = user.pantry[2].amount;

      user.addIngredientAmount(ingredients)

      const updatedFlourAmount = user.pantry[2].amount;

      expect(originalFlourAmount).to.equal(5);
      expect(updatedFlourAmount).to.equal(7)
  });

  it('should be able to add ingredients that are not in the pantry', function() {
      const ingredient = {id: 93740, amount: 10}
      const originalPantryLength = user.pantry.length;

      user.addIngredientToPantry(ingredient)

      const ingredientAddedId = user.pantry[35].ingredient;
      const updatedPantryLength = user.pantry.length;

      expect(ingredientAddedId).to.equal(93740);
      expect(originalPantryLength).to.equal(35);
      expect(updatedPantryLength).to.equal(36);
  })

  it('should be able to add ingredients that are not in the pantry when updating ingredient amounts', function() {
      const ingredients = [{id: 12023, amount: 5}]
      const originalPantryLength = user.pantry.length;

      user.addIngredientAmount(ingredients)

      const ingredientAddedId = user.pantry[36].ingredient;
      const updatedPantryLength = user.pantry.length;

      expect(ingredientAddedId).to.equal(12023);
      expect(originalPantryLength).to.equal(36);
      expect(updatedPantryLength).to.equal(37);
  })

  it('should be able to deduct from ingredients amount', () => {
      const ingredients = [{id: 20081, amount: 2}, {id: 1123, amount: 1}]
      const originalFlourAmount = user.pantry[5].amount;

      user.subtractIngredientAmount(ingredients)

      const updatedFlourAmount = user.pantry[5].amount;

      expect(originalFlourAmount).to.equal(9);
      expect(updatedFlourAmount).to.equal(8);
  });

  it('should remove ingredients if the amount equals 0', function() {
   const ingredients = [{id: 20081, amount: 5}, {id: 1123, amount: 1}]

   const originalFlourAmount = user.pantry[2].amount;
   const ingredientAtIndex2 = user.pantry[2].ingredient;
   const originalPantryLength = user.pantry.length;

   user.subtractIngredientAmount(ingredients)

   const newIngAtIndex2 = user.pantry[2].ingredient;
   const updatedPantryLength = user.pantry.length;

   expect(originalFlourAmount).to.equal(5);
   expect(ingredientAtIndex2).to.equal(20081);
   expect(newIngAtIndex2).to.equal(11215);
   expect(originalPantryLength).to.equal(37);
   expect(updatedPantryLength).to.equal(36);
 });

});
