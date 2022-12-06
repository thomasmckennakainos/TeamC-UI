var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const jobBands = require('../Database/JobBands.js');

const band = {
  id: 1,
  bandLevel: 1,
  bandName: "Leader"
}


describe('JobBands', function () {
  describe('getJobBands', function () {
    it('should return job bands', async () => {
      var mock = new MockAdapter(axios);
      const data = [band];
      mock.onGet(jobBands.URL).reply(200, data);
      var results = await jobBands.getBands();
      expect(results.data[0]).to.deep.equal(band);
      expect(results.status).to.deep.equal(200);
    })

    it('should throw exception when 500 error returned from axios', async () => {
      var mock = new MockAdapter(axios);
      mock.onGet(jobBands.URL).reply(500);
      var error = await jobBands.getBands();
      expect(error.message).to.equal('Could not get job bands. Request failed with status code 500')
    })

    it('should throw exception when empty list is returned from axios', async () => {
      var mock = new MockAdapter(axios);
      const data = [];
      mock.onGet(jobBands.URL).reply(200, data);
      var error = await jobBands.getBands();
      expect(error.message).to.equal('Could not get job bands. There are no job bands to display!')
    })
  })
})
