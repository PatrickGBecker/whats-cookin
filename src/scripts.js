import '../dist/bundle.js';
import './styles.css';
import getData from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Ingredient from './classes/Ingredient'
import RecipeRepository from './classes/RecipeRepository'
import Recipe from './classes/Recipe'
import User from './classes/User';
import MicroModal from 'micromodal';


// Query Selectors for buttons:
const viewHomeButton = document.querySelector('.view-home-button');
const viewAllRecipesButton = document.querySelector('.view-all-recipes');
const viewFavoritesButton = document.querySelector('.view-favorites');
const addRecipeToFavoritesButton = document.querySelector('.add-to-favorites-button');
const removeFromFavoritesButton = document.querySelector('.remove-from-favorites-button')
const searchButton = document.querySelector('.search-submit-button');
const searchInput = document.querySelector('.search-input');
const appetizersButton = document.querySelector('.appetizers-button');
const mainCoursesButton = document.querySelector('.main-courses-button');
const sideDishesButton = document.querySelector('.side-dishes-button');
const cookRecipeButton = document.getElementById('cookRecipeButton')
const addIngredientsButton = document.getElementById('addIngredientsButton')
const confirmCookingButton = document.getElementById('confirmCookingButton')

// Query Selectors for views:
const homeView = document.querySelector('.home-view-section');
const allRecipesView = document.querySelector('.all-recipes-view-section');
const favoritesView = document.querySelector('.favorites-view-section');
const searchResultsView = document.querySelector('.search-results-view-section');
const noResultsView = document.getElementById('noResultsFound');
const singleRecipeView = document.querySelector('.single-recipe-view-section');
// const breakfastRecipesView = document.querySelector('.breakfast-recipes-view-section');
const appetizerRecipesView = document.querySelector('.appetizers-recipes-view-section');
const mainCourseRecipesView = document.querySelector('.main-course-recipes-view-section');
const sideDishRecipesView = document.querySelector('.side-dishes-recipes-view-section');
const allSections = document.querySelectorAll('section > section');
// Query Selector for updating page content
const allRecipesContent = document.querySelector('.all-recipes-view-content');
const favoritesContent = document.querySelector('.favorites-view-content');
const noFavoritesAdded = document.getElementById('noFavoritesAdded')
const searchResultsContent = document.querySelector('.search-results-content');
const singleRecipeTitle = document.querySelector('.single-recipe-title');
const singleRecipeContent = document.querySelector('.single-recipe-content');
const appetizerRecipesContent = document.querySelector('.appetizers-recipes-content');
const mainCourseRecipesContent = document.querySelector('.main-course-recipes-content');
const sideDishRecipesContent = document.querySelector('.side-dishes-recipes-content');
const pantryIngredientsContent = document.querySelectorAll('pantryIngredients');
const ingredientsNeededContent = document.getElementById('ingredientsNeeded');
const recipeName = document.getElementById('recipeName');
const recipeIngredients = document.getElementById('recipeIngredients');
const recipeInstructions = document.getElementById('recipeInstructions');
const recipeImage = document.getElementById('recipeImage');
const recipeCost = document.getElementById('recipeCost');
// Global Variables:
let ingredients;
let ingredientsData;
let recipes;
let recipeData;
let recipeRepository;
let tag;
let taggedRecipes = [];
let user;
let userData;

Promise.all([
  getData(`http://localhost:3001/api/v1/users`),
  getData(`http://localhost:3001/api/v1/ingredients`),
  getData(`http://localhost:3001/api/v1/recipes`),
])
  .then(data => {
    console.log(data)
    userData = data[0];
    ingredientsData = data[1];
    recipeData = data[2];

    getUser(userData);
    displayHomeView();
    }
);

function modifyIngredient(userId, ingredientsId, ingredientsModification) {
  return fetch(`http://localhost:3001/api/v1/users`, {
    method: 'POST',
    body: JSON.stringify({
      "userID": userId,
      "ingredientID": ingredientsId,
      "ingredientModification": ingredientsModification
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => console.log('POST data: ', data))
    .catch(error => console.log('POST error: ', `${response.statusText}: Looks like there was a problem!`, error))
}


// Event Listeners:
// singleRecipeContent.addEventListener('click', () => {
  // displayRecipe(event) });
viewHomeButton.addEventListener('click', displayHomeView);
viewAllRecipesButton.addEventListener('click', displayAllRecipesView);
viewFavoritesButton.addEventListener('click', displayFavoritesView);
addRecipeToFavoritesButton.addEventListener('click', addRecipeToFavorites);
removeFromFavoritesButton.addEventListener('click', removeRecipeFromFavorites);
searchButton.addEventListener('click', displaySearchResultsView);
appetizersButton.addEventListener('click', getTag);
mainCoursesButton.addEventListener('click', getTag);
sideDishesButton.addEventListener('click', getTag);
cookRecipeButton.addEventListener('click', displayModal);

allSections.forEach(section => section.addEventListener('click', displayRecipe));
allSections.forEach(section => {
  section.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      displayRecipe(event)
    }
  });
});

// Helper Functions:
function hideElements(elements) {
  elements.forEach(element => element.classList.add('hidden'));
};

function showElements(elements) {
  elements.forEach(element => element.classList.remove('hidden'));
};

// function addStyling(elements, className) {
//   elements.classList.add(className)
// };

// function removeStyling(elements, className) {
//   elements.classList.remove(className)
// };

// DOM Display
function displayHomeView() {
  hideElements([viewHomeButton, allRecipesView, favoritesView, searchResultsView, singleRecipeView, appetizerRecipesView, mainCourseRecipesView, sideDishRecipesView]);
  showElements([homeView, viewAllRecipesButton, viewFavoritesButton]);
};

function displayAllRecipesView() {
  hideElements([homeView, viewAllRecipesButton, favoritesView, searchResultsView, singleRecipeView, appetizerRecipesView, mainCourseRecipesView, sideDishRecipesView]);
  showElements([allRecipesView, viewHomeButton, viewFavoritesButton]);
  sortRecipesByName();
  createRecipeCard(allRecipesContent, recipeRepository.recipes);
};

function displayFavoritesView() {
  hideElements([homeView, allRecipesView, viewFavoritesButton, searchResultsView, singleRecipeView, appetizerRecipesView, mainCourseRecipesView, sideDishRecipesView]);
  showElements([favoritesView, viewHomeButton, viewAllRecipesButton]);

  checkFavoriteRecipes();
};

function displaySearchResultsView() {
  hideElements([homeView, allRecipesView, favoritesView, singleRecipeView, appetizerRecipesView, mainCourseRecipesView, sideDishRecipesView]);
  showElements([searchResultsView, viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
};

function displaySingleRecipeView() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, appetizerRecipesView, mainCourseRecipesView, sideDishRecipesView]);
  showElements([singleRecipeView, viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);

};

function displayAppetizerRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView, appetizerRecipesView, mainCourseRecipesView, sideDishRecipesView]);
  showElements([appetizerRecipesView, viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
  createRecipeCard(appetizerRecipesContent, taggedRecipes);
};

function displayMainCourseRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView, appetizerRecipesView, mainCourseRecipesView, sideDishRecipesView]);
  showElements([mainCourseRecipesView, viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
  createRecipeCard(mainCourseRecipesContent, taggedRecipes);
};

function displaySideDishRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView, appetizerRecipesView, mainCourseRecipesView, sideDishRecipesView]);
  showElements([sideDishRecipesView, viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
  createRecipeCard(sideDishRecipesContent, taggedRecipes);
};

// DOM Functionality
function getUser(usersData) {
  const randomIndex = getRandomIndex(usersData);
  const randomUserData = usersData[randomIndex];
  getRecipes();
  user = new User(randomUserData, recipeRepository);
};

function getRecipes() {
  recipeRepository = new RecipeRepository(recipeData);
  getIngredients();
};

function getIngredients() {
  recipeRepository.getRecipesInfo(ingredientsData);
};

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};


function displayRecipe(event) {
  const card = event.target.closest('article');
  if (card.classList.contains('recipes-card-content')) {
    displaySingleRecipeView()
    createSingleRecipeCard(card.id);
  }
};

function findRecipeName() {
  const recipeTitle = singleRecipeTitle.innerText;
  const recipes = recipeRepository.findRecipesByName(recipeTitle.toLowerCase());
  return recipes[0];
}

function createRecipeInterpolation(recipe) {
  recipeImage.alt = recipe.name;
  recipeImage.src = recipe.image;
  recipeName.innerText = recipe.name
  recipeCost.innerText = recipe.returnTotalCost();
  addRecipeToFavoritesButton.name = recipe.id;
  removeFromFavoritesButton.name = recipe.id;
}

function createRecipeCard(content, recipes) {
  content.innerHTML = '';

  recipes.forEach(recipe => {
    content.innerHTML +=
      `<article tabindex="0" role="button" class="recipes-card-content" id=${recipe.id}>
          <img src="${recipe.image}" class="recipe-card-image" alt=${recipe.name}>
          <h1 class="recipe-card-name" id="recipeName">${recipe.name}</h1>
      </article>`;
  });
}

function createSingleRecipeCard(recipeId) {
  const recipe = recipeRepository.recipes.find(recipe => recipe.id === parseInt(recipeId));

  createRecipeInterpolation(recipe);
  createIngredientList(recipe);
  createInstructionsList(recipe);
  checkIfRecipeInFavorites(recipe);
  const pantryIngredients = user.returnPantryIngredients();
  createPantryIngredients(pantryIngredients);
};

function createRecipeInstructions(instructions) {
    recipeInstructions.innerHTML = instructions.reduce((acc, instruction) => {
      acc += `<li class="instructions-list" id="recipeInstructionsList">${instruction}</li>`;
      return acc;
    }, '');
 };

function createRecipeIngredients(ingredients) {
    recipeIngredients.innerHTML = ingredients.reduce((acc, ingredient) => {
      acc += `<li class="ingredient-list" id="recipeIngredientsList">${ingredient}</li>`;
      return acc;
    }, '');
  };

function createIngredientList(recipe) {
  const ingredientList = recipe.returnIngredientList();
  createRecipeIngredients(ingredientList);
}

function createInstructionsList(recipe) {
  const instructionsList = recipe.returnInstructions();
  createRecipeInstructions(instructionsList);
}

function sortRecipesByName() {
  recipeRepository.recipes.sort((a, b) => a.name - b.name);
}

function removeAllRecipeCards() {
    const recipeCards = document.querySelectorAll('.recipes-container-recipe-card');

    recipeCards.forEach((recipeCard) => {
      recipeCard.remove();
    })
  };

function addRecipeToFavorites() {
  const favoriteRecipe = recipeRepository.recipes.find(recipe => recipe.id === parseInt(addRecipeToFavoritesButton.name));
  user.addToFavorites(favoriteRecipe);

  hideElements([addRecipeToFavoritesButton]);
  showElements([removeFromFavoritesButton]);
};

function removeRecipeFromFavorites() {
  const favoriteRecipe = recipeRepository.recipes.find(recipe => recipe.id === parseInt(removeFromFavoritesButton.name));
  user.removeFromFavorites(favoriteRecipe);

  hideElements([removeFromFavoritesButton]);
  showElements([addRecipeToFavoritesButton]);
};

function checkIfRecipeInFavorites(recipe) {
  if (user.favoriteRecipes.includes(recipe)) {
    hideElements([addRecipeToFavoritesButton]);
    showElements([removeFromFavoritesButton]);
  } else {
    hideElements([removeFromFavoritesButton]);
    showElements([addRecipeToFavoritesButton]);
  }
}

function checkFavoriteRecipes() {
  if (user.favoriteRecipes.length) {
    hideElements([noFavoritesAdded]);
    showElements([favoritesContent]);
    createRecipeCard(favoritesContent, user.favoriteRecipes);
  } else {
    hideElements([favoritesContent]);
    showElements([noFavoritesAdded]);
    // favoriteRecipesSection.removeChild(domUpdates.favoritesTagsGlide);
  }
}

function searchInitialization(event) {
  const searchTerm = event.target.value.toLowerCase();
  searchDeclaration(searchTerm);
};

function searchDeclaration(searchTerm) {
  if (!searchInput.value && !recipeSearchResultsContainer.innerHTML) {
    return;

  } else if (searchInput.value) {
    hideElements([noResultsSearch, mainPageView]);
    showElements([recipeSearchResults, recipeSearchResultsContainer]);

    removeStyling(singleRecipeView, 'single-recipe-view');
    removeStyling(allRecipesSection, 'all-recipes');

    searchInvocation(searchTerm);

  } else {
    hideElements([recipeSearchResultsContainer]);
    showElements([noResultsSearch, recipeSearchResults]);
  }
};

function searchInvocation(searchTerm) {
  let filteredRecipes = recipeRepository.filterByRecipeName(searchTerm);
  let findRecipesByIngredient = recipeRepository.getRecipeIngredientsData(searchTerm);

  findRecipesByIngredient.forEach(recipe => {
    if (!filteredRecipes.includes(recipe)) {
      filteredRecipes.push(recipe);
    }
  });

  createRecipeCard(recipeSearchResultsContainer, filteredRecipes);
};

function getTag(event) {
  const tagClicked = event.target.closest('button');
  tag = tagClicked.value;
  taggedRecipes = recipeRepository.filterByTag(tag);
  console.log(tag)

  if (tag === "appetizer") {
    displayAppetizerRecipes();
  } else if (tag === "main course") {
    displayMainCourseRecipes();
  } else if (tag === "side dish") {
    displaySideDishRecipes();
  }
};

function createPantryIngredients(pantryIngredients) {
  pantryIngredientsContent.innerHTML = pantryIngredients.reduce((pantryObj, pantryIngredients) => {
    pantryObj += `<li class="ingredient-list-item">${pantryIngredients}</li>`;
    return pantryObj;
  }, "");
}

function createNeededIngredients(neededIngredients) {
  ingredientsNeededContent.innerHTML = neededIngredients.reduce((neededObj, neededIngredient) => {
    neededObj += `li class="ingredient-list-item">${neededIngredient.amount} ${neededIngredient.name}</li>`;
    return neededObj;
  }, "");
}

function updateUserIngredients(ingredients) {
  return Promise.all(
    ingredients.map((ingredient) => {
      modifyIngredients(user.id, ingredient.id, ingredient.amount);
    })
  )
};

function displayModal() {
  const currentRecipe = findRecipeName();
  if (user.checkPantry(currentRecipe)) {
    MicroModal.show("modal-2")
  } else {
    const neededIngredients = user.returnNeededIngredients(currentRecipe);
    createNeededIngredients(neededIngredients);
    MicroModal.show("modal-1")
  }
}
