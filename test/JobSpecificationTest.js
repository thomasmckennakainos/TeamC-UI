var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const jobSpecification = require('../Database/JobSpecification.js');

const spec = {
    Name: 1,
    Spec: "This is a specification for a job you can apply to!!",
    Sharepoint: "www.google.co.uk"
}

describe('JobSpecification', function () {
    describe('getJobSpecification', function () {
        it('should return specification of selected job', async () => {
            var mock = new MockAdapter(axios);
            const data = [spec];
            mock.onGet('http://localhost:8080/api/job-specification/1').reply(200, data);
            var results = await jobSpecification.getJobSpecification(1);
            expect(results[0]).to.deep.equal(spec)
        })

        it('should throw exception when 500 error returned from axios', async () => {
            var mock = new MockAdapter(axios);
            mock.onGet('http://localhost:8080/api/job-specification/1').reply(500);
            var error = await jobSpecification.getJobSpecification(1);
            expect(error.message).to.equal('Could not get job specification')
        })
    })
})