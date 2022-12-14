const axios = require("axios");
axios.defaults.baseURL = process.env.API_URL;

exports.URL = "/api/competencies/";

exports.getCompetencyPerBand = async (id) => {
  try {
    const results = await axios.get(this.URL + id);
    return results.data;
  } catch (e) {
    return new Error("Could not get competencies per band");
  }
};
