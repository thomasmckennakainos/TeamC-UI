var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
var chai = require("chai");
const expect = chai.expect;
const editJobRole = require("../Database/EditJobRole");

const jobRole = {
  bandId: 1,
  jobFamilyId: 2,
  role_title: "Test title",
  jobSpecification: "Test specification",
  jobSpecLink: "www.google.co.uk",
};

const id = 1;

describe("EditJobRole", function () {
  describe("editJobRole", function () {
    it("should return jobRoles from response", async () => {
      var mock = new MockAdapter(axios);
      mock.onPut(editJobRole.URL + id, jobRole).reply(204, jobRole);
      var results = await editJobRole.editJobRoles(jobRole, id);
      expect(results.data).to.deep.equal(jobRole, id);
      expect(results.status).to.deep.equal(204);
    });

    it("should throw exception when 404 error returned from axios", async () => {
      var mock = new MockAdapter(axios);
      mock.onPut(editJobRole.URL + id, jobRole).reply(404);
      var error;
      try {
        await editJobRole.editJobRoles(jobRole);
      } catch (e) {
        error = e;
      }
      expect(error.message).to.equal(
        "Could not update job details. Request failed with status code 404"
      );
    });

    it("should return job details of selected job", async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(editJobRole.URL + id).reply(200, jobRole);
      var results = await editJobRole.getJobRoleData(id);
      expect(results).to.deep.equal(jobRole);
    });

    it("should throw exception when 500 error returned from axios", async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(editJobRole.URL + id).reply(500);
      var error = await editJobRole.getJobRoleData(id);
      expect(error.message).to.equal("Could not get job details");
    });
  });
});
