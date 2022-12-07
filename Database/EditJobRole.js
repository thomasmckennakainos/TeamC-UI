const axios = require("axios");
axios.defaults.baseURL = process.env.API_URL;

exports.URL = "/api/job-roles/";

exports.getJobRoleData = async (id) => {
  try {
    const results = await axios.get(this.URL + id);
    return results.data;
  } catch (e) {
    return new Error("Could not get job details");
  }
};

exports.editJobRoles = async (job, id) => {
  try {
    const results = await axios.put(this.URL + id, job);
    return results;
  } catch (e) {
    return Promise.reject(
      new Error("Could not update job details. " + e.message)
    );
  }
};
