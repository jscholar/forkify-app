import axios from 'axios';
import { corsProxy, food2ForkAPI } from '../config'
import  dummyRecipe  from './../../../misc/sampleF2FRecipe.json'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        let { key, recipeAPI } = food2ForkAPI;
        try {
            //const res = await axios(`${corsProxy}${recipeAPI}?key=${key}&rId=${this.id}`)
            const res = {};
            res.data = dummyRecipe;
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
        const units = unitsShort.concat(['kg', 'g'])

        const newIngredients = this.ingredients.map(el => {
            // Format units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })
            // Remove parentheses
            ingredient = ingredient.replace(/\s*\([^)]*\)\s*/g, ' ');

            // Parse ingredients into count unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if (unitIndex > -1){
                // A unit exists

                let count;
                if (arrIng.length === 1) {
                    count = aryIng[0];
                } else {
                    count = eval( arrIng.slice(0, unitIndex).join('+') );
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

    updateServings (type) {
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        this.ingredients.forEach(ing => {
            ing.count *= (newServings/ this.servings);
        })
        console.log(this.ingredients);
        this.servings = newServings
    }
}