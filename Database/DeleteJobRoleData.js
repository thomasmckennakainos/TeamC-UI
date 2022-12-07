const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

exports.URL = '/api/job-roles/';

exports.deleteJobRole = async (id) => {
    try {
        const results = await axios.delete(this.URL + id);
        return results;
    } catch (e) {
        throw new Error('There was a problem with deleteing ' + e.message);
    }
}
