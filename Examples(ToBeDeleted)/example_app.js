const express = require('express')
const app = express()
const nunjucks = require('nunjucks');
const { v4: uuidv4 } = require('uuid');
var cookieParser = require('cookie-parser')
const isAuth = require('./MiddleWare/isAuth')
const employee = require('./Database/Employee')
const department = require('./Database/Departments')
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

//register and login 

app.get('/register', (req, res) => {
    res.render('Register')
})

app.post('/register', async (req, res, next) => {
    let insertedKey = await User.Register(req.body)
    if (insertedKey > 0) {
        const id = uuidv4();
        if (req.cookies.name) {
            res.clearCookie("name");
            res.cookie('name', id, { secure: false }).render('Home')
        } else {
            res.cookie('name', id, { secure: false }).render('Home')
        }
    } else {
        console.log("Invalid User")
    }
})

app.get('/login', (req, res) => {
    res.render('Login')
})

app.post('/login', async (req, res) => {
    let insertedKey = await User.Login(req.body)
    if (insertedKey > 0) {
        const id = uuidv4();
        res.cookie('name', id, { secure: false }).render('Home')
    } else {
        console.log("Invalid User")
    }
})

//get method to render home page
app.get('/home', isAuth, (req, res) => {
    res.render('Home')
})


///////////////////////////////////////////////////////////////////////////////////

//example get to render a page to create a new employee
app.get('/addemployee', isAuth, (req, res) => {
    res.render('customersubmit')
})
//example POST to add the employee to the database
app.post('/addemployee', isAuth, async (req, res) => {
    let insertedKey = await employee.addEmployee(req.body)
    if (insertedKey > 0) {
        console.log(insertedKey);
    }
})

//example of a get request which passes response data to a page
app.get('/departmentreport', async (req, res) => {
    var d = await department.getDepReport()
    res.render('DepartmentReport', { deps: d.data })
})









