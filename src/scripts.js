import '../dist/bundle.js';
import './styles.css';
import getData from './apiCalls';
import { loadUsers, loadRecipes, loadIngredients } from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Ingredient from './classes/Ingredient'
import RecipeRepository from './classes/RecipeRepository'
import Recipe from './classes/Recipe'
import User from './classes/User';


// Query Selectors for buttons:
let allRecipesTabButton = document.querySelector('.nav-tabs-all-recipes');
let favoritesTabButton = document.querySelector('.nav-tabs-favorites');
let searchButton = document.querySelector('.search-bar-search-input');
let recipeTagButton = document.querySelector('.tag-label-button'); // May need to differeniate between buttons
let addToFavoritesButton = document.querySelector('.recipe-button-favorite-button'); // May need a button for removing
let removeFromFavoritesButton = document.getElementById('removeFromFavoritesButton')
let cookRecipeButton = document.querySelector('.cook-recipe-button');

// Query Selectors for full page views:
let mainPageView = document.querySelector('.main-view');
let allRecipesView = document.querySelector('.all-recipes-view');
let favoritesView = document.querySelector('.favorites-view');
let singleRecipeView = document.querySelector('.single-recipe-view');

//Query Selectors for specific parts on a pageview:
let allRecipesViewContainer = document.querySelector('.all-recipes-view-recipes-container');
let favoritesViewContainer = document.querySelector('.favorites-view-favorites-container');
let singleRecipeViewContainer = document.querySelector('.single-recipe-view-recipe-details');
let recipeIngredients = document.querySelector('.recipe-details-container');
let recipeInstructions = document.querySelector('.single-recipe-view-instructions');

// Misc Query Selectors:
let allRecipesTab = document.querySelector('.nav-tabs-all-recipes');
let favoritesTab = document.querySelector('.nav-tabs-favorites');
let searchInput = document.getElementById('searchBarInput');
let recipeTagsSection = document.querySelector('.tag-section-recipes-container');
let recipeSearchResultsContainer = document.querySelector('.searched-recipes-recipe-results-container');
let noResultsSearch = document.querySelector('.searched-recipes-no-results-container');
let recipeSearchResults = document.querySelector('.recipes-container-search-results');
let allRecipes = document.querySelector('.all-recipes-view-recipes-container');
let allSections = document.querySelectorAll('section');


// Global Variables:
let recipeData;
let ingredientData;
let userData;
let tags = [];
let recipeRepository;
let recipes;
let ingredients;
let user;


// Event Listeners:
window.addEventListener('load', () => {
  getData.then(responses => {
    userData = responses[0];
    recipeData = responses[1];
    ingredientData = responses[2];
  })
});
window.addEventListener('load', getUser);
// console.log(displayFavoritesView());
allRecipesTabButton.addEventListener('click', displayAllRecipes);
favoritesTabButton.addEventListener('click', displayFavoritesView);
searchInput.addEventListener('keyup', searchInitialization);
// recipeTagButton.addEventListener('click', getTag);
addToFavoritesButton.addEventListener('click', addFavorite);
allSections.forEach(section => section.addEventListener('click', displayRecipe))

// Helper Functions:
function showElements(elements) {
   elements.forEach(element => element.classList.remove('hidden'));
};

function hideElements(elements) {
  elements.forEach(element => element.classList.add('hidden'));
};

function addStyling(elements, className) {
  elements.classList.add(className)
};

function removeStyling(elements, className) {
  elements.classList.remove(className)
};


function getRandomUser(array) {
  const index = Math.floor(Math.random() * array.length);
  const userData = array[index];
  return userData;
};

function getUser() {
  loadUsers().then(usersData => {
    getRecipes(usersData);
  });
};

function getRecipes(usersData) {
  loadRecipes().then(recipeData => {
    recipeRepository = new RecipeRepository(recipeData);
    getIngredients(usersData);
  });
};

function getIngredients(usersData) {
  loadIngredients().then(ingredientsData => {
    recipeRepository.getRecipesInfo(ingredientsData);

    const userData = getRandomUser(usersData);
    user = new User(userData, recipeRepository);
  });
};


function createRecipeCard(container, recipes) {
  container.innerHTML = '';

  recipeRepository.recipes.forEach(recipe => {
    container.innerHTML +=
      `<article tabindex="0" role="button" class="recipes-container-recipe-card" id=${recipe.id}>
          <img src="${recipe.image}" class="recipe-card-image" alt=${recipe.name}>
          <p class="recipe-card-name">${recipe.name}</p>
      </article>`;
  });
};

function createRecipeInstructions(instructions) {
    recipeInstructions.innerHTML = instructions.reduce((acc, instruction) => {
      acc += `<li class="ingredient-list-item">${instruction}</li>`;
      return acc;
    }, '');
 };

function createRecipeIngredients(ingredients) {
    recipeIngredients.innerHTML = ingredients.reduce((acc, ingredient) => {
      acc += `<li class="ingredient-list-item">${ingredient}</li>`;
      return acc;
    }, '');
  };

function removeAllRecipeCards() {
    const recipeCards = document.querySelectorAll('.recipes-container-recipe-card');

    recipeCards.forEach((recipeCard) => {
      recipeCard.remove();
    })
  };

function addFavorite() {
    const favoriteRecipe = recipeRepository.recipes.find(recipe => recipe.id === parseInt(addToFavoritesButton.name));
    user.addToFavorites(favoriteRecipe);

    hideElements([addToFavoritesButton]);
    showElements([removeFromFavoritesButton]);
};

function removeFromFavorites() {
    const favoriteRecipe = recipeRepository.recipes.find(recipe => recipe.id === parseInt(removeFromFavoritesButton.name));
    user.removeFromFavorites(favoriteRecipe);

    hideElements([removeFromFavoritesButton]);
    showElements([addToFavoritesButton]);
};

function displayAllRecipes() {
    hideElements([recipeSearchResultsContainer, mainPageView, singleRecipeView, favoritesView]);
    showElements([allRecipesView]);

    addStyling(singleRecipeView, 'single-recipe-view');
    addStyling(allRecipesSection, 'all-recipes');

    createRecipeCard(allRecipesViewContainer, recipeRepository.recipes);
};


function displayRecipe(event) {
  const card = event.target.closest('article');

  if (card.classList.contains('singleRecipeViewContainer')) {
    hideElements([mainPageView, allRecipesView, favoritesView]);
    showElements([singleRecipeView]);
    createRecipeCard(card.id);
  }
};

function displayHomeView() {
  hideElements([noResultsSearch, recipeSearchResults, singleRecipeView, allRecipesView, favoritesView]);
  showElements([mainPageView]);
  addStyling(singleRecipeView, 'single-recipe-view');
  addStyling(allRecipesSection, 'all-recipes-view-recipes-container');
};

function displayFavoritesView() {
  hideElements([recipeSearchResultsContainer, mainPageView, singleRecipeViewContainer, allRecipesView]);
  showElements([favoritesView]);
};

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

// function getTag(event) {
//   const tagClicked = event.target.closest('button');
//   const tag = tagClicked.value;
// }
