const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

exports.URL = '/api/bands';

exports.getBands = async () => {
    try {
        const results = await axios.get(this.URL);
        if (results.data.length == 0) {
            throw new Error('There are no job bands to display!')
        }
        return await results;
    } catch (e) {
        return new Error('Could not get job bands. ' + e.message);
    }
}

