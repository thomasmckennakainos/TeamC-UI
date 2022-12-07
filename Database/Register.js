const axios = require('axios');
axios.defaults.baseURL = process.env.API_URL;

exports.registerNewUser = async function (newUser) {

    const bcrypt = require('bcrypt')
    const numSaltRounds = 8;

    var hashedPassword = bcrypt.hashSync(newUser.password, numSaltRounds);

    const results = await axios.post('http://localhost:8080/api/register',
        {
            "email": newUser.email,
            "password": hashedPassword,
            "role": newUser.role
        })

    return await results;
}