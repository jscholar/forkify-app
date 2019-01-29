import Search from './models/Search';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';

import DummyResults from './../../misc/sampleData.json'

import './../styles/style.css'

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked Recipes
 **/
const state = {

}

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

        // Search for recipes (use API)
        /** await state.search.querySearch(); */


        // dummy results
        const dummyResult = DummyResults.hits.map(r => r.recipe);
        state.search.result = dummyResult;


        // Render results on UI
        console.log(dummyResult);
        searchView.renderResults(state.search.result)

        // Remove loader
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
        console.log(btn.dataset);
        searchView.renderResults(state.search.result, goToPage);
    }
});