import '../dist/bundle.js';
import './styles.css';
import getData from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Ingredient from './classes/Ingredient'
import RecipeRepository from './classes/RecipeRepository'
import Recipe from './classes/Recipe'
import User from './classes/User';

let recipeRepository;
let recipe;
let user;

// Query Selectors for buttons:
let allRecipesTabButton = document.querySelector('.nav-tabs-all-recipes');
let favoritesTabButton = document.querySelector('.nav-tabs-favorites');
let searchButton = document.querySelector('.search-bar-main-button');
let recipeTagButton = document.querySelector('.tag-label-button'); // May need to differeniate between buttons
let addToFavoritesButton = document.querySelector('.recipe-button-favorite-button'); // May need a button for removing
let cookRecipeButton = document.querySelector('.cook-recipe-button');

// Query Selectors for full page views:
let mainPageView = document.querySelector('.main-page');
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
let searchInput = document.querySelector('.search-bar-search-input');
let recipeTagsSection = document.querySelector('.tag-section-recipes-container');
let recipeSearchResultsContainer = document.querySelector('.searched-recipes-recipe-results-container');
let noResultsSearch = document.querySelector('.searched-recipes-no-results-container');
let recipeSearchResults = document.querySelector('.recipes-container-search-results');
let allRecipes = document.querySelector('.all-recipes-page-recipes-container');


window.addEventListener('load', () => {
  getData.then(responses => {
    console.log(responses[0]);
    console.log(responses[1]);
    console.log(responses[2]);
  })
});


// Helper Functions:
function showElements(elements) {
   elements.forEach(element => element.classList.remove('hidden'));
}

function hideElements(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function addStyling(elements, className) {
  elements.classList.add(className)
}

function removeStyling(elements, className) {
  elements.classList.remove(className)
}

function getRandomUser(array) {
  const index = Math.floor(Math.random() * array.length);
  const userData = array[index];
  return userData;
};

et recipeRepository;
let recipe;
let user;
let tags = [];

// Query Selectors for buttons:
let allRecipesTabButton = document.querySelector('.nav-tabs-all-recipes');
let favoritesTabButton = document.querySelector('.nav-tabs-favorites');
let searchButton = document.querySelector('.search-bar-main-button');
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
let searchInput = document.querySelector('.search-bar-search-input');
let recipeTagsSection = document.querySelector('.tag-section-recipes-container');
let recipeSearchResultsContainer = document.querySelector('.searched-recipes-recipe-results-container');
let noResultsSearch = document.querySelector('.searched-recipes-no-results-container');
let recipeSearchResults = document.querySelector('.recipes-container-search-results');
let allRecipes = document.querySelector('.all-recipes-view-recipes-container');
let allSections = document.querySelectorAll('section > section');


// Event Listeners:
window.addEventListener('load', handleFetch);
allRecipesTabButton.addEventListener('click', sortRecipesByName);
favoritesTabButton.addEventListeners('click', displayFavoritesView);
searchButton.addEventListeners('keyup', searchInitialization);
recipeTagButton.addEventListeners('click', getTag);
addToFavoritesButton.addEventListeners('click', );
allSections.forEach(section => section.addEventListener('click', displayRecipe))


// Helper Functions:
function showElements(elements) {
   elements.forEach(element => element.classList.remove('hidden'));
}

function hideElements(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function addStyling(elements, className) {
  elements.classList.add(className)
}

function removeStyling(elements, className) {
  elements.classList.remove(className)
}


function getRandomUser(array) {
  const index = Math.floor(Math.random() * array.length);
  const userData = array[index];
  return userData;
};


createRecipeCard(container, recipes) {
  container.innerHTML = '';

  recipes.forEach(recipe => {
    container.innerHTML +=
      `<article tabindex="0" role="button" class="recipes-container-recipe-card" id=${recipe.id}>
          <img src="${recipe.image}" class="recipe-card-image" alt=${recipe.name}>
          <p class="recipe-card-name">${recipe.name}</p>
      </article>`;
  });
}

createRecipeInstructions(instructions) {
   recipeInstructions.innerHTML = instructions.reduce((acc, instruction) => {
     acc += `<li class="ingredient-list-item">${instruction}</li>`;
     return acc;
   }, '');
 }

 createRecipeIngredients(ingredients) {
    recipeIngredients.innerHTML = ingredients.reduce((acc, ingredient) => {
      acc += `<li class="ingredient-list-item">${ingredient}</li>`;
      return acc;
    }, '');
  }

  removeAllRecipeCards() {
    const recipeCards = document.querySelectorAll('.recipes-container-recipe-card');

    recipeCards.forEach((recipeCard) => {
      recipeCard.remove();
    })
  }

  function addFavorite() {
    const favoriteRecipe = recipeRepository.recipes.find(recipe => recipe.id === parseInt(addToFavoritesButton.name));
    user.addToFavorites(favoriteRecipe);

    hide(addToFavoritesButton);
    show(removeFromFavoritesButton);
  }

  function removeFromFavorites() {
  const favoriteRecipe = recipeRepository.recipes.find(recipe => recipe.id === parseInt(removeFromFavoritesButton.name));
  user.removeFromFavorites(favoriteRecipe);

  hide(removeFromFavoritesButton);
  show(addToFavoritesButton);
}

function displayAllRecipes() {
  hide(recipeSearchResultsContainer);
  hide(mainPageView);
  hide(singleRecipeView);
  hide(favoritesView);
  show(allRecipesView);

  addStyling(singleRecipeView, 'single-recipe-view');
  addStyling(allRecipesSection, 'all-recipes-view-recipes-container');

  sortRecipesByName();
  createRecipeCard(allRecipesViewContainer, recipeRepository.recipes);
}


function displayRecipe(event) {
  const card = event.target.closest('article');

  if (card.classList.contains('singleRecipeViewContainer')) {
    hide(mainPageView);
    hide(allRecipesView);
    hide(favoritesView);
    show(singleRecipeView);
    createRecipeCard(card.id);
  }
}

function displayHomeView() {
  hide(noResultsSearch);
  hide(recipeSearchResults);
  hide(singleRecipeView);
  hide(allRecipesView);
  hide(recipeSearchResults);
  hide(favoritesView);
  show(mainPageView);
  addStyling(singleRecipeView, 'single-recipe-view');
  addStyling(allRecipesSection, 'all-recipes-view-recipes-container'');
}

function displayFavoritesView() {
  hide(recipeSearchResultsContainer);
  hide(mainPageView);
  hide(singleRecipeViewContainer);
  hide(allRecipesView);
  show(favoritesView);
}

function searchInitialization(event) {
  const searchTerm = event.target.value.toLowerCase();
  searchDeclaration(searchTerm);
}

function searchDeclaration(searchTerm) {
  if (!searchInput.value && !recipeSearchResultsContainer.innerHTML) {
    return;

  } else if (searchInput.value) {
    hide(noResultsSearch);
    hide(mainPageView);
    show(recipeSearchResults);
    show(recipeSearchResultsContainer);

    removeStyling(singleRecipeView, 'single-recipe-view');
    removeStyling(allRecipesSection, 'all-recipes-view-recipes-container');

    searchInvocation(searchTerm);

  } else {
    hide(recipeSearchResultsContainer);
    show(noResultsSearch);
    show(recipeSearchResults);
  }
}

function searchInvocation(searchTerm) {
  const filteredRecipes = recipeRepository.filterByRecipeName(searchTerm);
  const findRecipesByIngredient = recipeRepository.getRecipeIngredientsData(searchTerm);

  findRecipesByIngredient.forEach(recipe => {
    if (!filteredRecipes.includes(recipe)) {
      filteredRecipes.push(recipe);
    }
  });

  createRecipeCards(recipeSearchResultsContainer, filteredRecipes);
}

function getTag(event) {
  const tagClicked = event.target.closest('button');
  const tag = tagClicked.value;

  searchTag(tag, tagClicked);
  if (tagClicked.parentNode.id === 'tagLabelIcon') {
    updateFavorites();
  } else {
    updateMain();
  }
}

function searchTag(tag, tagClicked) {
  if (!tags.includes(tag)) {
    addTag(tag);

  } else {
    removeTag(tag);
  }
}

function addTag(tag) {
  tags.push(tag);
}
