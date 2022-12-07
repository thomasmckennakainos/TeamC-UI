var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');
const expect = chai.expect;
const register = require('../Database/Register.js');
const validator = require('../validator/RegisterNewUserValidator.js');

describe('RegisterTest', function () {
    describe('validateNewUser', function () {
        it('should return null when no errors', () => {
            let newUser = {
                email: "test@test.com",
                password: "Password?",
                role: "Admin"
            }

            expect(validator.validateNewUser(newUser)).to.be.null;
        })

        it('should return error when field is left empty', () => {
            let newUser = {
                email: null,
                password: null,
                role: null
            }

            expect(validator.validateNewUser(newUser)).to.equal("Fields must not be empty!");
        })

        it('should return error when email does not include @ symbol', () => {
            let newUser = {
                email: "test.com",
                password: "Password?",
                role: "Admin"
            }

            expect(validator.validateNewUser(newUser)).to.equal("Email must be in correct format (example@example.com)");
        })

        it('should return error when email includes whitespace', () => {
            let newUser = {
                email: "test@test .com",
                password: "Password?",
                role: "Admin"
            }

            expect(validator.validateNewUser(newUser)).to.equal("Email must be in correct format (example@example.com)");
        })

        it('should return error when password is not between 8 & 16 characters', () => {
            let newUser = {
                email: "test@test.com",
                password: "Passwd?",
                role: "Admin"
            }

            expect(validator.validateNewUser(newUser)).to.equal("Sorry, password must be between 8 & 16 characters!");
        })

        it('should return error when password does not have a special character (@, %, $, £, !, ?)', () => {
            let newUser = {
                email: "test@test.com",
                password: "Password1",
                role: "Admin"
            }

            expect(validator.validateNewUser(newUser)).to.equal("Sorry, password must contain at least one special character (@, %, $, £, !, ?)");
        })

        it('should return error when password does not have at least one uppercase character', () => {
            let newUser = {
                email: "test@test.com",
                password: "password?",
                role: "Admin"
            }

            expect(validator.validateNewUser(newUser)).to.equal("Sorry, password must contain at least one uppercase letter");
        })

        it('should return error when password does not have at least one lower case character', () => {
            let newUser = {
                email: "test@test.com",
                password: "PASSWORD?",
                role: "Admin"
            }

            expect(validator.validateNewUser(newUser)).to.equal("Sorry, password must contain at least one lowercase letter");
        })

    })
})
