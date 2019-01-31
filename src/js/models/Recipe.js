import axios from 'axios';
import { corsProxy, food2ForkAPI } from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        let { key, recipeAPI } = food2ForkAPI;
        try {
            const res = await axios(`${corsProxy}${recipeAPI}?key=${key}&rId=${this.id}`)
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    }

    calcTime() {
        /** Assuming that we need 15 minutes for every 3 ingredients in recipe */
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng) / 3;
        this.time = periods * 15
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups','pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz','tsp','tsp','cup','pound'];

        const newIngredients = this.ingredients.map(el => {
            // Format units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // Remove parentheses
            ingredient.replace(/ *\([^)]*\) */g, ' ');

            // Parse ingredients into count unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsLong.includes(el2));

            let objIng;
            if (unitIndex > -1){
                // A unit exists

                let count;
                if (arrCount.length === 1) {
                    count = aryIng[0];
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            } else if (parseInt(arrIng[0], 10)) {
                // No unit, but first element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        })
        this.ingredients = newIngredients;
    }
}