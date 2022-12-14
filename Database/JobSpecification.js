const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

exports.URL = '/api/job-specification/';

exports.getJobSpecification = async (id) => {
    try {
        const results = await axios.get(this.URL + id)
        return results
    } catch (e) {
        return new Error('Could not get job specification')
    }
}