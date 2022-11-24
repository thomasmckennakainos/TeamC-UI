const axios = require('axios');

//US001 - view Job Roles
exports.getJobRoles = async function () { 
  try {  
      const jobResponse = await axios.get('http://localhost:8080/api/job-roles')
      return jobResponse.data
    } catch (e) {
       return new Error('Could not get job roles! ' +  e.message)
    }
}
