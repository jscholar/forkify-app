import {elements} from './base'

export const getInput = () => {
    return elements.searchInput.value;
}

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => elements.resultsList.innerHTML = '';

const renderRecipe = (recipe) => {
    const imgUrl = recipe.image;
    const recipeLabel = recipe.label;
    const recipeAuthor = recipe.source;
    const markup = `
    <li>
        <a class="results__link" href="#23456">
            <figure class="results__fig">
                <img src="${imgUrl}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipeLabel}</h4>
                <p class="results__author">${recipeAuthor}</p>
            </div>
        </a>
    </li>
    `
    elements.resultsList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = (recipes) => {
    recipes.forEach(renderRecipe);

    
}