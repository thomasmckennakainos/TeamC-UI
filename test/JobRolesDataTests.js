var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const JobRolesData = require('../Database/JobRolesData.js');

const jobRole = {
    roleID: 1,
    role_title: "test job role 1"
}
const jobRolesURL = 'http://localhost:8080/api/job-roles';

describe('JobRolesData', function () {
    describe('getJobRoles', function () {
      it('should return jobRoles from response', async () => {
        var mock = new MockAdapter(axios);

        const data = [jobRole];

        mock.onGet(jobRolesURL).reply(200, data);

        var results = await JobRolesData.getJobRoles();

        expect(results[0]).to.deep.equal(jobRole)
      })

      it('should throw exception when 500 error returned from axios', async () => {
        var mock = new MockAdapter(axios);

        mock.onGet(jobRolesURL).reply(500);

        var error = await JobRolesData.getJobRoles();
        
        expect(error.message).to.equal('Could not get job roles! Request failed with status code 500')
      })

      it('should throw exception when empty list is returned from axios', async () => {
        var mock = new MockAdapter(axios);

        const data = [];

        mock.onGet(jobRolesURL).reply(200, data);

        var error = await JobRolesData.getJobRoles();
        
        expect(error.message).to.equal('There are no job roles to display!')
      })
      
    })
  })
