import {elements} from './base'

export const getInput = () => {
    return elements.searchInput.value;
}

export const clearInput = () => elements.searchInput.value = '';

export const clearResults = () => {
    elements.resultsList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => el.classList.remove('results__link--active'))
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

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
    const imgUrl = recipe.image || recipe.image_url;
    const recipeTitle = limitRecipeTitle(recipe.label || recipe.title);
    const recipeAuthor = recipe.source || recipe.publisher;
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
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


// Type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
        // Only button to next page
    } else if (page < pages) {
        // Both buttons
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    } else  if (page === pages && pages > 1) {
        // Only button to prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

const renderPageLabel = (page) => {
    elements.resultsList.insertAdjacentHTML('afterbegin', `
    <div>Page ${page}<div>
    `)
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    renderPageLabel(page);
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    
    recipes.slice(start, end).forEach(renderResult);

    // Render buttons
    renderButtons(page, recipes.length, resPerPage);
}