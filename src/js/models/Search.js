import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async querySearch() {
        const apiID = '87bd6971'
        const apiKey = '435b617321f9ccbbbd8272918224caad';
        const apiInterface = 'https://api.edamam.com/search'
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const numResults = '30'
        try {
            const res = await axios(`${corsProxy}${apiInterface}?app_id=${apiID}&app_key=${apiKey}&q=${this.query}&to=${numResults}`);
            this.result = res.data.hits.map((r) => r.recipe);
        } catch(error) {
            alert(error);
        }

    }
};