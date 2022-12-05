const axios = require("axios");
axios.defaults.baseURL = process.env.API_URL;

exports.URL = "/api/job-roles/";

exports.updateJobRole = async (id, job) => {
  try {
    const results = await axios.put(this.URL + id, job);
    return results;
  } catch (e) {
    return Promise.reject(
      new Error("Could not update job details. " + e.message)
    );
  }
};
