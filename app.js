const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
var cookieParser = require("cookie-parser");
const jobdata = require("./Database/JobRolesData.js");
const jobSpecification = require("./Database/JobSpecification.js");
const createJobRole = require("./Database/CreateJobRole.js");
const jobBands = require("./Database/JobBands.js");
const jobFamilies = require("./Database/JobFamilies.js");
const jobRoleValidator = require("./Database/JobRoleValidator.js");
const jobRoleUpdateValidator = require("./Database/JobRoleUpdateValidator");
const editJobRole = require("./Database/EditJobRole.js");
const competencyPerBand = require("./Database/CompetencyPerBand");
const deleteJobRoleData  = require('./Database/DeleteJobRoleData.js');

// app setup
app.use(cookieParser());
app.set("view engine", "njk");

nunjucks.configure("Pages", {
  express: app,
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server started.");
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/cookie", async (req, res) => {
  console.log(req.cookies);
});

//US001 - view Job Roles
app.get("/jobRoles", async (req, res) => {
  try {
    let jr = await jobdata.getJobRoles();
    res.render("list-jobRoles", { jobRoles: jr });
  } catch (e) {
    res.locals.errormessage = e;
    return res.render("list-jobRoles");
  }
});

//US002 - view Job Specification
app.get("/job-specification/:roleid", async (req, res) => {
  try {
    var js = await jobSpecification.getJobSpecification(req.params.roleid);
    res.render("JobSpecification", { spec: js.data });
  } catch (e) {
    res.locals.errormessage =
      "Sorry, we couldn't load that specification! \nError details: " + e;
    return res.render("JobSpecification");
  }
});

//US012 - create job role
app.get("/create-job-role", async function (req, res) {
  let bands = await jobBands.getBands();
  let families = await jobFamilies.getFamilies();
  res.render("CreateJobRole", { band: bands.data, family: families.data });
});

app.post("/create-job-role", async (req, res) => {
  try {
    var validJob = jobRoleValidator.isValidJobRole(req.body);
    await createJobRole.addJobRole(validJob);
    res.redirect("/jobRoles");
  } catch (e) {
    res.render("ErrorPage", { err: e });
  }
});

//US015 - update job role
app.get("/edit-job-role/:id", async (req, res) => {
  try {
    var results = await editJobRole.getJobRoleData(req.params.id);
    let bands = await jobBands.getBands();
    let families = await jobFamilies.getFamilies();
    res.render("EditJobRole", {
      roleDetails: results,
      band: bands.data,
      family: families.data,
    });
  } catch (e) {
    res.locals.errormessage =
      "Sorry, we couldn't load job role details! \nError details: " + e;
    return res.render("EditJobRole");
  }
});

app.post("/edit-job-role/:id", async (req, res) => {
  try {
    const id = req.params.id;
    var validJob = jobRoleUpdateValidator.isUpdatedJobRoleValid(req.body);
    await editJobRole.editJobRoles(validJob, id);
    res.redirect("/jobRoles");
  } catch (e) {
    res.render("ErrorPage", { err: e });
  }
});

app.get("/competencies/:bandid", async (req, res) => {
  try {
    var js = await competencyPerBand.getCompetencyPerBand(req.params.bandid);
    res.render("CompetenciesPerBand", {
      competencies: js,
    });
  } catch (e) {
    res.locals.errormessage =
      "Sorry, we couldn't load that specification! \n Error details: " + e;
    return res.render("CompetenciesPerBand");
  }
});

//US020 - Delete a job role
app.get('/deleteJobRole/:roleid', async (req, res) => {
  try {
    await deleteJobRoleData.deleteJobRole(req.params.roleid);
    res.redirect("/jobRoles");
} catch (e)
{
  res.locals.errormessage = "Unable to complete deletion process " + e;
  return res.render('list-jobRoles');
} 
});

//method to redirect to error page
app.get('*', function (req, res) {
  res.status(404).render('ErrorPage');
});

//method to redirect to error page
app.get("*", function (req, res) {
  res.status(404).render("ErrorPage");
});
