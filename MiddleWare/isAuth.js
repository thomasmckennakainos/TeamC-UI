const express = require('express')
const app = express() 

var cookieParser = require('cookie-parser')

app.use(cookieParser());


module.exports = (req, res, next) => {
    try {
        const token = req.cookies.name
        if (!token) {
            return res.redirect('/Login');
        }

        next()
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

