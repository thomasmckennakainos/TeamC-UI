const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Verify that user can view job role list.', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('UI test', async function() {
    await driver.get("http://localhost:3000/jobRoles");
    await driver.sleep(3000);
// // Verify the header exists
    assert.equal(await driver.findElement(By.xpath("//h2")).getText(),"Job roles");
    console.log("log: The header exists ");

//Verify the JOb role listed on the page
    assert.equal(await driver.findElement(By.linkText("Trainee Data Analyst")).getText(),"Trainee Data Analyst");
    console.log("log: The Trainee Data Analyst listed od the page "); 


    // assert.equal(await driver.findElement(By.id("5")).getText(),"Data Analyst");
    // console.log("log: Data Analyst listed on the page ");

    // assert.equal(await driver.findElement(By.id("9")).getText(),"Lead Data Engineer");
    // console.log("log: Lead Data Engineer listed on the page ");





// // try {
// //     const headers = await driver.findElement(By.xpath("/html[1]/body[1]/table[1]/tbody[1]/tr[1]/th[1]"));
// //     console.log("log: Table is visible on the page");
// // }
// // catch(NoSuchElementError){
// //     assert.fail("log: no Job role table to wiew");
// // }
// //header exists, table exists, no API running

// // try {
// //     assert(await driver.findElement(By.xpath("/html[1]/body[1]")).getText(),"Error: Could not get job roles. connect ECONNREFUSED 127.0.0.1:8080");
// //     console.log("log: no API running");
// // }
// // catch(NoSuchElementError){
// //     assert.fail("log: API running");
// // }

// //Api running, no DB properities, error code 500
// // try {
// //     assert(await driver.findElement(By.xpath("/html[1]/body[1]")).getText(),"Error: Could not get job roles. Request failed with status code 500");
// //     console.log("log: no DB properities");
// // }
// // catch(NoSuchElementError){
// //     assert.fail("log: correct DB properities");
// // }

  })
})


