const express = require('express')
const app = express()
const nunjucks = require('nunjucks');
const { v4: uuidv4 } = require('uuid');
var cookieParser = require('cookie-parser')
const jobdata = require('./Database/JobRolesData.js')


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
    var jr = await jobdata.getJobRoles();
    console.log(jr)
    res.render('list-jobRoles', { jobRoles: jr.data } ) 
    
});


//method to redirect to error page
app.get('*', function(req, res){
    res.status(404).render('ErrorPage');
  });


