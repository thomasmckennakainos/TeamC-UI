var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const createJobRole = require('../Database/CreateJobRole.js');

const jobRole = {
    band: 1,
    family: 2,
    title: "Test title",
    specification: "Test specification",
    link: "www.google.co.uk"
}

describe('CreateJobRole', function () {
    describe('createJobRole', function () {
        it('should return jobRoles from response', async () => {
            var mock = new MockAdapter(axios);
            mock.onPost(createJobRole.URL, jobRole).reply(204, jobRole);
            var results = await createJobRole.addJobRole(jobRole);
            expect(results.data).to.deep.equal(jobRole);
            expect(results.status).to.deep.equal(204);
        })

        it('should throw exception when 500 error returned from axios', async () => {
            var mock = new MockAdapter(axios);
            mock.onPost(createJobRole.URL, jobRole).reply(500);
            var error
            try {
                await createJobRole.addJobRole(jobRole);
            } catch (e) {
                error = e
            }
            expect(error.message).to.equal('Could not create job listing. Request failed with status code 500');
        })
    })
})