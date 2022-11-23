const mysql = require('mysql'); 

const axios = require('axios'); 
const util = require ('util')


exports.Login = async (Login) => {
    console.log(Login.username)
    const results = await axios.post('http://localhost:8080/api/isUserValid',{
        "username": Login.username,
        "pwd": Login.pwd
    })
    return results.data
}

exports.Register = async (register) => { 
    console.log("Sales being passed" + register)
    const results = await axios.post('http://localhost:8080/api/AddUser', 
    {"username": register.username,
    "pwd": register.pwd,
    
})
  console.log("Results" + results.data);
   return await results.data; 
}

