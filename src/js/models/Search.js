import axios from 'axios';
import { edamamAPI, food2ForkAPI, corsProxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async querySearchEdemam() {
        let {apiInterface, apiID, apiKey} = edamamAPI;
        const numResults = '30'
        try {
            const res = await axios(`${corsProxy}${apiInterface}?app_id=${apiID}&app_key=${apiKey}&q=${this.query}&to=${numResults}`);
            this.result = res.data.hits.map((r) => r.recipe);
        } catch(error) {
            alert(error);
        }

    }

    async querySearchF2F() {
        let {key, searchAPI} = food2ForkAPI;
        console.log(key, searchAPI);
        try {
            const res = await axios(`${corsProxy}${searchAPI}?key=${key}&q=${this.query}`)
            this.result = res.data.recipes;
            console.log(this.result, res.data, res.data.recipes);
        } catch (error) {
            alert(error);
        }
    }
};