import Search from './models/Search';
import {elements} from './views/base';
import * as searchView from './views/searchView';
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

        // Search for recipes (use API)
        await state.search.querySearch();


        // Render results on UI
        searchView.renderResults(state.search.result)
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});