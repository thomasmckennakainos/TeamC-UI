const mysql = require('mysql'); 
const axios = require('axios'); 
const util = require ('util')


exports.getDepReport = async () => {
    const results = await axios.get('http://localhost:8080/api/departmentreport')

    return results
}