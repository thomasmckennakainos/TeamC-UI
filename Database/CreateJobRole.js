const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

exports.URL = '/api/create-job-role';

exports.addJobRole = async (job) => {
    try {
        const results = await axios.post(this.URL, job);
        return results;
    } catch (e) {
        return Promise.reject(new Error('Could not create job listing. ' + e.message));
    }
}

