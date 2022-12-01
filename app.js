const express = require('express')
const app = express()
const nunjucks = require('nunjucks');
const { v4: uuidv4 } = require('uuid');
var cookieParser = require('cookie-parser')
const jobdata = require('./Database/JobRolesData.js')
const jobSpecification = require('./Database/JobSpecification.js')

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

//US001 - view Job Roles
app.get('/jobRoles', async (req, res) => {
    try {
        let jr = await jobdata.getJobRoles();
        res.render('list-jobRoles', { jobRoles: jr })
    } catch (e) {
        res.locals.errormessage = e
        return res.render('list-jobRoles')
    }
});

//US002 - view Job Specification
app.get('/job-specification/:roleid', async (req, res) => {
    try {
        var js = await jobSpecification.getJobSpecification(req.params.roleid);
        res.render('JobSpecification', { spec: js.data })
    } catch (e) {
        res.locals.errormessage = "Sorry, we couldn't load that specification! \n Error details: " + e;
        return res.render('JobSpecification')
    }
});


//method to redirect to error page
app.get('*', function (req, res) {
    res.status(404).render('ErrorPage');
});

