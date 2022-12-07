var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const jobFamilies = require('../Database/JobFamilies.js');

const family = {
  id: 1,
  capabilityId: 1,
  jobFamily: "Engineering"
}


describe('JobFamilies', function () {
  describe('getJobFamilies', function () {
    it('should return job families', async () => {
      var mock = new MockAdapter(axios);
      const data = [family];
      mock.onGet(jobFamilies.URL).reply(200, data);
      var results = await jobFamilies.getFamilies();
      expect(results.data[0]).to.deep.equal(family);
      expect(results.status).to.deep.equal(200);
    })

    it('should throw exception when 500 error returned from axios', async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(jobFamilies.URL).reply(500);
      var error = await jobFamilies.getFamilies();
      expect(error.message).to.equal('Could not get job families. Request failed with status code 500')
    })

    it('should throw exception when empty list is returned from axios', async () => {
      var mock = new MockAdapter(axios);
      const data = [];
      mock.onGet(jobFamilies.URL).reply(200, data);
      var error = await jobFamilies.getFamilies();
      expect(error.message).to.equal('Could not get job families. There are no job families to display!')
    })
  })
})
