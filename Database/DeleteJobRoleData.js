const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

exports.URL = '/api/job-roles/';

exports.deleteJobRole = async (id) => {
    try {
        const results = await axios.delete(this.URL + id);
        return results;
    } catch (e) {
        if (e.response.status == 404){
            throw new Error('Job Role does not exist ' + e.response.status)
        }
        else {
            throw new Error('There was a problem with deleting ' + e.message)
        }
        
    }
}
