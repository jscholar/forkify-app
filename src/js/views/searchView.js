import {elements} from './base'

export const getInput = () => {
    return elements.searchInput.value;
}

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => elements.resultsList.innerHTML = '';

const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {
        const words = title.split(' ');
        title = words.reduce((str, word) => {
            return (str + word + ' ').length <= limit ? str += word + ' ' : str;
        }, '')
        title += '...';
    }
    return title;
}

const renderResult = (recipe) => {
    const imgUrl = recipe.image;
    const recipeTitle = limitRecipeTitle(recipe.label);
    const recipeAuthor = recipe.source;
    const markup = `
    <li>
        <a class="results__link" href="#23456">
            <figure class="results__fig">
                <img src="${imgUrl}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipeTitle}</h4>
                <p class="results__author">${recipeAuthor}</p>
            </div>
        </a>
    </li>
    `
    elements.resultsList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = (recipes) => {
    recipes.forEach(renderResult);
}