import { expect } from 'chai';
import { usersData } from '../src/data/sampleUserData.js';
import { recipeData } from '../src/data/sampleRecipeData.js';
import { ingredientsData } from '../src/data/sampleIngredientData.js';
import User from '../src/classes/User.js';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';


describe('User', () => {
  let user;
  let recipe;
  let recipeName;
  let recipeRepository;
  let allIngredientsRecipe;

  beforeEach( () => {
    allIngredientsRecipe = new Recipe(recipeData[0]);
    recipeRepository = new RecipeRepository(recipeData);
    user = new User(usersData[0], recipeRepository);
    // recipe.getIngredientsData(ingredientsData);
    allIngredientsRecipe.getIngredientsData(ingredientsData);
    user.addToFavorites(allIngredientsRecipe);
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
      user.addToFavorites(recipe);

      expect(user.favoriteRecipes[0]).to.deep.equal(allIngredientsRecipe);
    });

    it('should be able to remove favorite recipes to a list', () => {
      user.removeFromFavorites(allIngredientsRecipe);

      expect(user.favoriteRecipes).to.deep.equal(user.favoriteRecipes);
    });

  it('should be able to filter favorite recipes by name', () => {
    const filteredRecipes = user.filterFavoritesByName('Loaded Chocolate Chip Pudding Cookie Cups')

    expect(filteredRecipes[0]).to.deep.equal(user.favoriteRecipes[0]);
  });

  it('should be able to filter recipes by tag', () => {
    const filteredRecipes = user.filterFavoritesByTag('Loaded Chocolate Chip Pudding Cookie Cups')

    expect(filteredRecipes[0]).to.deep.equal(user.favoriteRecipes[0]);
  });
});
