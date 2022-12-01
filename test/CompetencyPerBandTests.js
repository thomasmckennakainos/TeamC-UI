var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
var chai = require("chai");
const expect = chai.expect;
const competencyPerBand = require("../Database/CompetencyPerBand");

const competencies = {
  BandLvl: 1,
  BandName: "This is a specification for a job you can apply to!!",
  Competencies: "www.google.co.uk",
};

describe("CompetencyPerBand", function () {
  describe("CompetenciesPerBand", function () {
    it("should return competency for its band level", async () => {
      var mock = new MockAdapter(axios);
      const data = [competencies];
      mock.onGet(competencyPerBand.URL + "1").reply(200, data);
      var results = await competencyPerBand.getCompetencyPerBand(1);
      expect(results.data[0]).to.deep.equal(competencies);
    });

    it("should throw exception when 500 error returned from axios", async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(competencyPerBand.URL + "1").reply(500);
      var error = await competencyPerBand.getCompetencyPerBand(1);
      expect(error.message).to.equal("Could not get competencies per band");
    });
  });
});
