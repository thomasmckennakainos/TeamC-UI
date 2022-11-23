const express = require('express')
const app = express()
const nunjucks = require('nunjucks');
const { v4: uuidv4 } = require('uuid');
var cookieParser = require('cookie-parser')
const isAuth = require('./MiddleWare/isAuth')
const employee = require('./Database/Employee')
const User = require('./Database/User');

// app setup
app.use(cookieParser());
app.set('view engine', 'njk');

nunjucks.configure('Pages', {
    express: app
});

app.listen(3000, 'localhost', () => {
    console.log('Server started.');
});

app.use(express.urlencoded({
    extended: true
}))

app.get('/cookie', async (req, res) => {
    console.log(req.cookies)
})

//get method to render home page
app.get('/', (req, res) => {
    res.render('Home')
})

app.get('*', function(req, res){
    res.status(404).render('ErrorPage');
  });