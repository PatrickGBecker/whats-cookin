import '../dist/bundle.js';
import './styles.css';
import getData from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Ingredient from './classes/Ingredient'
import RecipeRepository from './classes/RecipeRepository'
import Recipe from './classes/Recipe'
import User from './classes/User';


// Query Selectors for buttons:
let viewHomeButton = document.querySelector('.view-home-button');
let viewAllRecipesButton = document.querySelector('.view-all-recipes');
let viewFavoritesButton = document.querySelector('.view-favorites');
let searchButton = document.querySelector('.search-submit-button');
let searchInput = document.querySelector('.search-input');
let snacksButton = document.querySelector('.snacks-button');
let appetizersButton = document.querySelector('.appetizers-button');
let sideDishesButton = document.querySelector('.side-dishes-button');
let soupsButton = document.querySelector('.soups-button');
let saladsButton = document.querySelector('.salads-button');
let breakfastButton = document.querySelector('.breakfast-button');
let lunchButton = document.querySelector('.lunch-button');
let dinnerButton = document.querySelector('.dinner-button');
let dessertButton = document.querySelector('.dessert-button');

// Query Selectors for full page views:
let homeView = document.querySelector('.home-view-section');
let allRecipesView = document.querySelector('.all-recipes-view-section');
let favoritesView = document.querySelector('.favorites-view-section');
let searchResultsView = document.querySelector('.search-results-view-section');
let singleRecipeView = document.querySelector('.single-recipe-view-section');


// Global Variables:
let ingredients;
let ingredientsData;
let recipes;
let recipeData;
let recipeRepository;
let tags = [];
let user;
let userData;

Promise.all([
  getData(`http://localhost:3001/api/v1/users`),
  getData(`http://localhost:3001/api/v1/ingredients`),
  getData(`	http://localhost:3001/api/v1/recipes`),
])
  .then(data => {
    console.log(data)
    userData = data[0];
    ingredientsData = data[1];
    recipeData = data[2];
    
    getUser(userData);
    }
);

// Event Listeners:
window.addEventListener('load', displayHomeView)
viewHomeButton.addEventListener('click', displayHomeView);
viewAllRecipesButton.addEventListener('click', displayAllRecipesView);
viewFavoritesButton.addEventListener('click', displayFavoritesView);
searchButton.addEventListener('click', displaySearchResultsView)
snacksButton.addEventListener('click', displaySnackRecipes)
appetizersButton.addEventListener('click', displayAppetizerRecipes)
sideDishesButton.addEventListener('click', displaySideDishRecipes)
soupsButton.addEventListener('click', displaySoupRecipes)
saladsButton.addEventListener('click', displaySaladRecipes)
breakfastButton.addEventListener('click', displayBreakfastRecipes)
lunchButton.addEventListener('click', displayLunchRecipes)
dinnerButton.addEventListener('click', displayDinnerRecipes)
dessertButton.addEventListener('click', displayDessertRecipes)

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

// DOM Updates
function displayHomeView() {
  hideElements([viewHomeButton, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([homeView, viewAllRecipesButton, viewFavoritesButton]);
}

function displayAllRecipesView() {
  hideElements([homeView, viewAllRecipesButton, favoritesView, searchResultsView, singleRecipeView]);
  showElements([allRecipesView, viewHomeButton, viewFavoritesButton]);
}

function displayFavoritesView() {
  hideElements([homeView, allRecipesView, viewFavoritesButton, searchResultsView, singleRecipeView]);
  showElements([favoritesView, viewHomeButton, viewAllRecipesButton]);
}

function displaySearchResultsView() {
  hideElements([homeView, allRecipesView, favoritesView, singleRecipeView]);
  showElements([searchResultsView, viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displaySingleRecipeView() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView]);
  showElements([singleRecipeView, viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displaySnackRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displayAppetizerRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displaySideDishRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displaySoupRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displaySaladRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displayBreakfastRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displayLunchRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displayDinnerRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

function displayDessertRecipes() {
  hideElements([homeView, allRecipesView, favoritesView, searchResultsView, singleRecipeView]);
  showElements([viewHomeButton, viewAllRecipesButton, viewFavoritesButton]);
}

// Functionality
// function getUser(usersData) {
//   getRecipes(usersData);
// };

// function getRecipes(usersData) {
//   recipeRepository = new RecipeRepository(recipeData);
//   getIngredients(usersData);
// };

// function getIngredients(usersData) {
//     recipeRepository.getRecipesInfo(ingredientsData);
//     const userData = getRandomUser(usersData);
//     user = new User(userData, recipeRepository);
// };

// function getRandomUser(array) {
//   return Math.floor(Math.random() * array.length);
// };

// function createRecipeCard(container, recipes) {
//   container.innerHTML = '';

//   recipeRepository.recipes.forEach(recipe => {
//     container.innerHTML +=
//       `<article tabindex="0" role="button" class="recipes-container-recipe-card" id=${recipe.id}>
//           <img src="${recipe.image}" class="recipe-card-image" alt=${recipe.name}>
//           <p class="recipe-card-name">${recipe.name}</p>
//       </article>`;
//   });
// };

// function createRecipeInstructions(instructions) {
//     recipeInstructions.innerHTML = instructions.reduce((acc, instruction) => {
//       acc += `<li class="ingredient-list-item">${instruction}</li>`;
//       return acc;
//     }, '');
//  };

// function createRecipeIngredients(ingredients) {
//     recipeIngredients.innerHTML = ingredients.reduce((acc, ingredient) => {
//       acc += `<li class="ingredient-list-item">${ingredient}</li>`;
//       return acc;
//     }, '');
//   };

// function removeAllRecipeCards() {
//     const recipeCards = document.querySelectorAll('.recipes-container-recipe-card');

//     recipeCards.forEach((recipeCard) => {
//       recipeCard.remove();
//     })
//   };

// function addFavorite() {
//   hideElements([addToFavoritesButton]);
//   showElements([removeFromFavoritesButton]);

//   const favoriteRecipe = recipeRepository.recipes.find(recipe => recipe.id === parseInt(addToFavoritesButton.name));
//   user.addToFavorites(favoriteRecipe);
// };

// function removeFromFavorites() {
//   hideElements([removeFromFavoritesButton]);
//   showElements([addToFavoritesButton]);

//   const favoriteRecipe = recipeRepository.recipes.find(recipe => recipe.id === parseInt(removeFromFavoritesButton.name));
//   user.removeFromFavorites(favoriteRecipe);

// };

// function searchInitialization(event) {
//   const searchTerm = event.target.value.toLowerCase();
//   searchDeclaration(searchTerm);
// };

// function searchDeclaration(searchTerm) {
//   if (!searchInput.value && !recipeSearchResultsContainer.innerHTML) {
//     return;

//   } else if (searchInput.value) {
//     hideElements([noResultsSearch, mainPageView]);
//     showElements([recipeSearchResults, recipeSearchResultsContainer]);

//     removeStyling(singleRecipeView, 'single-recipe-view');
//     removeStyling(allRecipesSection, 'all-recipes');

//     searchInvocation(searchTerm);

//   } else {
//     hideElements([recipeSearchResultsContainer]);
//     showElements([noResultsSearch, recipeSearchResults]);
//   }
// };

// function searchInvocation(searchTerm) {
//   let filteredRecipes = recipeRepository.filterByRecipeName(searchTerm);
//   let findRecipesByIngredient = recipeRepository.getRecipeIngredientsData(searchTerm);

//   findRecipesByIngredient.forEach(recipe => {
//     if (!filteredRecipes.includes(recipe)) {
//       filteredRecipes.push(recipe);
//     }
//   });

//   createRecipeCard(recipeSearchResultsContainer, filteredRecipes);
// };

// function getTag(event) {
//   const tagClicked = event.target.closest('button');
//   const tag = tagClicked.value;
// }
