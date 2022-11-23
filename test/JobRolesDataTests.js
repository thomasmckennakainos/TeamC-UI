var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
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

        mock.onGet('http://localhost:8080/api/job-roles').reply(200, data);

        var results = await JobRolesData.getJobRoles();

        expect(results[0]).to.deep.equal(jobRole)
      })

      it('should throw exception when 500 error returned from axios', async () => {
        var mock = new MockAdapter(axios);

        mock.onGet('http://localhost:8080/api/job-roles').reply(500);

        var error = await JobRolesData.getJobRoles();
        
        expect(error.message).to.equal('Could not get job roles')
      })

    
    })
  })