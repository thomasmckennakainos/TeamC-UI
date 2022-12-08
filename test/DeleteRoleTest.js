var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
const { assert } = require('chai');
var chai = require('chai');  
const expect = chai.expect;
const DeleteJobRole = require('../Database/DeleteJobRoleData.js');

describe('DeleteJobRoleData', function () {
    describe('deleteJobRole', function () {
      it('should return true when role is successfully deleated', async () => {
        var mock = new MockAdapter(axios)
        const id = -1

        mock.onDelete(DeleteJobRole.deleteJobRole(id).URL).reply(200, true);

        var results = await DeleteJobRole.deleteJobRole(id)
        expect(results.data).to.deep.equal(true)
      })

      it('should throw exception when 404 error returned from axios', async () => {
        var mock = new MockAdapter(axios);
        const id = -1

        mock.onDelete(DeleteJobRole.deleteJobRole(id).URL).reply(404);
        try {
            var errorResponse = await DeleteJobRole.deleteJobRole(id)
        } catch (e) {
            expect(e.message).to.equal('Job Role does not exist 404')
        }

    })

    })

})
