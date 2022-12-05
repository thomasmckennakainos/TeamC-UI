var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const validator = require('../Database/JobRoleValidator.js');

const jobRole = {
    band: "1",
    family: "2",
    title: "Test title",
    specification: "Test specification",
    link: "https://www.google.co.uk"
}

describe('JobRoleValidator', function () {
    describe('validJobRole', function () {
        it('should return an object when valid job role input', function () {
            var createdJob = validator.isValidJobRole(jobRole);
            expect(typeof createdJob).to.equal('object');
        })
    })

    describe('invalidJobRoleBand', function () {
        it('should return an error when invalid band', function () {
            const invalidJRole = {
                band: 778,
                family: "2",
                title: "Test title",
                specification: "Test specification",
                link: "https://www.google.co.uk"
            }
            var errorMessage
            try {
                validator.isValidJobRole(invalidJRole);
            } catch (e) {
                errorMessage = e
            }
            expect(errorMessage.toString()).to.equal('Error: Band must be of type string');
        })
    })

    describe('invalidJobRoleFamily', function () {
        it('should return an error when invalid family', function () {
            const invalidJRole = {
                band: "1",
                family: 74,
                title: "Test title",
                specification: "Test specification",
                link: "https://www.google.co.uk"
            }
            var errorMessage
            try {
                validator.isValidJobRole(invalidJRole);
            } catch (e) {
                errorMessage = e
            }
            expect(errorMessage.toString()).to.equal('Error: Family must be of type string');
        })
    })

    describe('invalidJobRoleTitle', function () {
        it('should return an error when empty title', function () {
            const invalidJRole = {
                band: "1",
                family: "2",
                title: "     ",
                specification: "Test specification",
                link: "https://www.google.co.uk"
            }
            var errorMessage
            try {
                validator.isValidJobRole(invalidJRole);
            } catch (e) {
                errorMessage = e
            }
            expect(errorMessage.toString()).to.equal("Error: Title can't be blank");
        })
    })

    describe('invalidJobRoleSpecification', function () {
        it('should return an error when empty title', function () {
            const invalidJRole = {
                band: "1",
                family: "2",
                title: "Test title",
                specification: "        ",
                link: "https://www.google.co.uk"
            }
            var errorMessage
            try {
                validator.isValidJobRole(invalidJRole);
            } catch (e) {
                errorMessage = e
            }
            expect(errorMessage.toString()).to.equal("Error: Specification can't be blank");
        })
    })

    describe('invalidJobRoleURL', function () {
        it('should return an error when invalidURL', function () {
            const invalidJRole = {
                band: "1",
                family: "2",
                title: "Test title",
                specification: "Test specification",
                link: "www.google.co.uk"
            }
            var errorMessage
            try {
                validator.isValidJobRole(invalidJRole);
            } catch (e) {
                errorMessage = e
            }
            expect(errorMessage.toString()).to.equal("Error: Link is not a valid url");
        })
    })
})