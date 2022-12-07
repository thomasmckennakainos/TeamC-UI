const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

exports.URL = '/api/job-roles';

//US001 - view Job Roles
exports.getJobRoles = async function () { 

  try {  
    const jobResponse = await axios.get(this.URL)
    if(jobResponse.data.length == 0){
       throw new Error('There are no job roles to display!') 
    }
    return jobResponse.data
  } catch (e) {
     throw new Error('Could not get job roles. ' + e.message)
  }
}


