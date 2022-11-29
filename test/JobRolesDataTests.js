var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
const { assert } = require('chai');
var chai = require('chai');  
const expect = chai.expect;
const JobRolesData = require('../Database/JobRolesData.js');

const jobRole = {
    roleID: 1,
    role_title: "test job role 1"
}


describe('JobRolesData', function () {
    describe('getJobRoles', function () {
      it('should return jobRoles from response', async () => {
        var mock = new MockAdapter(axios);

        const data = [jobRole];

        mock.onGet(JobRolesData.URL).reply(200, data);

        var results = await JobRolesData.getJobRoles();

        expect(results[0]).to.deep.equal(jobRole)
      })

      it('should throw exception when 500 error returned from axios', async () => {
        var mock = new MockAdapter(axios);

        mock.onGet(JobRolesData.URL).reply(500);

        try {
          var errorResponse = await JobRolesData.getJobRoles()
        } catch (e) {
          expect(e.message).to.equal('Could not get job roles. Request failed with status code 500')
        }
       
      })

      it('should throw exception when empty list is returned from axios', async () => {
        var mock = new MockAdapter(axios);

        const data = [];

        mock.onGet(JobRolesData.URL).reply(200, data);

        try {
          var errorResponse = await JobRolesData.getJobRoles();
        } catch (e) {
          expect(e.message).to.equal('Could not get job roles. There are no job roles to display!')
        }
      })

    })
  })
