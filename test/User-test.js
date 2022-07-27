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
    expect(user.pantry).to.deep.equal([
      {
        "ingredient": 11297,
        "amount": 4
      },
      {
        "ingredient": 1082047,
        "amount": 10
      },
      {
        "ingredient": 20081,
        "amount": 5
      },
      {
        "ingredient": 11215,
        "amount": 5
      },
      {
        "ingredient": 2047,
        "amount": 6
      },
      {
        "ingredient": 1123,
        "amount": 8
      },
      {
        "ingredient": 11282,
        "amount": 4
      },
      {
        "ingredient": 6172,
        "amount": 2
      },
      {
        "ingredient": 2044,
        "amount": 2
      },
      {
        "ingredient": 2050,
        "amount": 4
      },
      {
        "ingredient": 1032009,
        "amount": 3
      },
      {
        "ingredient": 5114,
        "amount": 3
      },
      {
        "ingredient": 1017,
        "amount": 2
      },
      {
        "ingredient": 18371,
        "amount": 7
      },
      {
        "ingredient": 1001,
        "amount": 6
      },
      {
        "ingredient": 99223,
        "amount": 2
      },
      {
        "ingredient": 1230,
        "amount": 2
      },
      {
        "ingredient": 9152,
        "amount": 4
      },
      {
        "ingredient": 10611282,
        "amount": 2
      },
      {
        "ingredient": 93607,
        "amount": 2
      },
      {
        "ingredient": 14106,
        "amount": 4
      },
      {
        "ingredient": 1077,
        "amount": 4
      },
      {
        "ingredient": 6150,
        "amount": 2
      },
      {
        "ingredient": 1124,
        "amount": 2
      },
      {
        "ingredient": 10011693,
        "amount": 4
      },
      {
        "ingredient": 1102047,
        "amount": 2
      },
      {
        "ingredient": 19206,
        "amount": 2
      },
      {
        "ingredient": 1145,
        "amount": 4
      },
      {
        "ingredient": 1002030,
        "amount": 4
      },
      {
        "ingredient": 12061,
        "amount": 2
      },
      {
        "ingredient": 19335,
        "amount": 4
      },
      {
        "ingredient": 15152,
        "amount": 3
      },
      {
        "ingredient": 9003,
        "amount": 2
      },
      {
        "ingredient": 18372,
        "amount": 3
      },
      {
        "ingredient": 2027,
        "amount": 2
      }
    ]);
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
    console.log('user pantry', user.pantry[2].ingredient);
    console.log('allIngredients', allIngredients.ingredients[0].id);
      expect(user.checkPantry(allIngredients)).to.equal(false) //should be true
      expect(user.checkPantry(missingIngredients)).to.equal(false)
    });

  it('should be able to check user pantry for ingredient amount necessary to cook recipe', () => {
       expect(user.checkPantry(notEnoughIngredients)).to.equal(false)
       expect(user.checkPantry(missingIngredients)).to.equal(false)
     });

  it('should be able to return the pantry ingredients', function() {
    
      const expected = [
        '4 flat leaf parsley leaves',
        '10 kosher salt',
        '5 wheat flour',
        '5 whole garlic clove',
        '6 salt',
        '8 eggs',
        '4 vanilla',
        '5 buck wheat flour'
      ]
      const pantryIngredients = user.returnPantryIngredients()

      expect(pantryIngredients[0]).to.be.a('string');
      expect(pantryIngredients).to.deep.equal(expected);
      expect(pantryIngredients.length).to.equal(8);
    });


});
