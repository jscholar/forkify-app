import axios from 'axios';
import { apiID, apiKey, apiInterface, corsProxy } from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${corsProxy}${api}`)
        } catch (error) {
            console.log(error);
        }
    }
}
