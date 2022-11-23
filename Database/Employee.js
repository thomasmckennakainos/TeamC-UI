const mysql = require('mysql'); 
const axios = require('axios'); 
const util = require ('util')



exports.addEmployee = async (addEmployee) => { 
    console.log(addEmployee)
    const results = await axios.post('http://localhost:8080/api/addEmployee', 
    {"fName": addEmployee.fname,
    "lName":addEmployee.lname,
    "NIN": addEmployee.NIN,
    "bankAccount": addEmployee.bank_account,
    "address": addEmployee.address,
    "startSalary": addEmployee.salary
})
  
   return await results.insertId; 
}

