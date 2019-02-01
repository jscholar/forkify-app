import Search from './models/Search';
import Recipe from './models/Recipe'
import {elements, renderLoader, clearLoader} from './views/base';
import * as recipeView from './views/recipeView';
import * as searchView from './views/searchView';

import DummyResults from './../../misc/sampleData.json'
import dummyF2F from './../../misc/sampleF2F.json'
import dummyRecipe from './../../misc/sampleF2FRecipe.json'

import './../styles/style.css'

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked Recipes
 **/
const state = {

}

/**
 * Search Controller
 */
const controlSearch = async () => {
    // Get query from view
    const query = searchView.getInput();

    // Get new search object and add to state
    if (query) {
        state.search = new Search(query);

        // Prepare UI for results & search form
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.results);
    
        try {
        // Search for recipes (use API)
        /** await state.search.querySearch();
         */
        //await state.search.querySearchF2F();

        // dummy results
        //const dummyResult = DummyResults.hits.map(r => r.recipe);
        //state.search.result = dummyResult;
        //console.log(dummyResult);
        state.search.result = dummyF2F.recipes;

        // Render results on UI
        searchView.renderResults(state.search.result);

        // Remove loader
        } catch (error) {
            console.log(error);
        }
        clearLoader();
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        searchView.clearResults();
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlRecipe = async () => {

    /** Get ID from url */
    const id = window.location.hash.replace('#', '');

    if (id) {
        /** Prepare UI */
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        /** Highlight in search list */
        if (state.search) searchView.highlightSelected(id);

        /** Create new recipe object */
        state.recipe = new Recipe(id);

        /** Get recipe data */
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            /** Calculate servings and time */
            state.recipe.calcTime();
            state.recipe.calcServings();


            /** Render Recipe */
            window.r = state.recipe;

            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            console.log(error);
        }
        clearLoader();
    }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))
/**
    Above is equivalent to:

    window.addEventListener('hashchange', controlRecipe);
    window.addEventListener('load', controlRecipe);
 */

 // Handling recipe button clicks (servings)

 elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *') && state.recipe.servings > 1) {
        state.recipe.updateServings('dec');
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc')
    }
    recipeView.updateServingsIngredients(state.recipe);
});