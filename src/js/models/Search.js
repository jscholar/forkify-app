import axios from 'axios';
import {apiID, apiKey, corsProxy, apiInterface} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async querySearch() {
        const numResults = '30'
        try {
            const res = await axios(`${corsProxy}${apiInterface}?app_id=${apiID}&app_key=${apiKey}&q=${this.query}&to=${numResults}`);
            this.result = res.data.hits.map((r) => r.recipe);
        } catch(error) {
            alert(error);
        }

    }
};