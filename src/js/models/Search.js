import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async querySearch() {
        const apiKey = 'c4f5fd7eb6daa62deece925aa42c0a29';
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        try {
            const res = await axios(`${corsProxy}https://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch(error) {
            alert(error);
        }
    }
};