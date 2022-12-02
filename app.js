const express = require('express')
const app = express()
const nunjucks = require('nunjucks');
const { body, validationResult } = require('express-validator');
var cookieParser = require('cookie-parser')
const jobdata = require('./Database/JobRolesData.js')
const jobSpecification = require('./Database/JobSpecification.js')
const createJobRole = require('./Database/CreateJobRole.js')
const jobBands = require('./Database/JobBands.js')
const jobFamilies = require('./Database/JobFamilies.js')

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
        res.locals.errormessage = "Sorry, we couldn't load that specification! \nError details: " + e;
        return res.render('JobSpecification')
    }
});

//US015 - create job role
app.get('/create-job-role', async function (req, res) {
    let bands = await jobBands.getBands();
    let families = await jobFamilies.getFamilies();
    res.render('CreateJobRole', { band: bands.data, family: families.data })
});

app.post('/create-job-role',
    body('band').isInt().trim().escape(),
    body('family').isInt().trim().escape(),
    body('title').not().isEmpty().trim().escape(),
    body('specification').not().isEmpty().trim().escape(),
    body('link').isURL({ protocols: ['https'] })
        .custom((url) => {
            url = new URL(url);
            return (
                !url.hash && !url.query
                && url.pathname.substr(url.pathname.length - 1) === '/'
            );
        }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.errors[0].msg)
                throw new Error(errors.errors[0].msg +' for ' + errors.errors[0].param)
            }
            var jobObject = {
                "band_id": req.body.band,
                "job_family_id": req.body.family,
                "kainos_job_title": req.body.title,
                "job_specification": req.body.specification,
                "job_spec_link": req.body.link
            };
            await createJobRole.addJobRole(jobObject);
            res.redirect('/jobRoles');
        } catch (e) {
            res.render('ErrorPage', { err: e })
        }
    })

//method to redirect to error page
app.get('*', function (req, res) {
    res.status(404).render('ErrorPage');
});

