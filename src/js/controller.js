import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';
import bookmarkView from './view/bookmarkView.js';
import addRecipeView from './view/addRecipeView.js';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// if(module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    recipeView.renderSpinner(); 

    // 0. Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage())

    // 1. Updating bookmarks view
    bookmarkView.update(model.state.bookmarks)
    
    // 2. Loading recipe
    await model.loadRecipe(id);
    
    // 3. Rendering recipe
    recipeView.render(model.state.recipe)

  }
  catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
    
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {

  
    // 1) Render NEW results
    resultsView.render(model.getSearchResultPage(goToPage));

    // 2) Render NEW pagination buttons
    paginationView.render(model.state.search);
    

  console.log(goToPage);
}

const controlServings = function(newServings) {
  // Update the recipe servings ( in state )
  model.updateServings(newServings);

  // Updating the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function() {
  // 1) Add/Remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

  // 2) Update recipe view
  recipeView.update(model.state.recipe)

  // 3) Render bookmarks
  bookmarkView.render(model.state.bookmarks)
}

const controlBookmarks= function() {
  bookmarkView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe) {
  try {

    // Show loading spinner
    addRecipeView.renderSpinner()

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe)

    // Render recipe
    recipeView.render(model.state.recipe)

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  }
  catch(err) {
    console.error('🔥',err)
    addRecipeView.renderError(err.message)
  }

}

const init = function() {
  bookmarkView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
