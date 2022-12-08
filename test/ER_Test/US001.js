const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const jobRolesPageURL = process.env.UI_URL + "/jobRoles"


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
    await driver.get(jobRolesPageURL);
    await driver.sleep(3000);

    try {
      const table = await driver.findElement(By.className("cards"));
      console.log("log: Table is visible on the page");
  }
  catch(NoSuchElementError){
      assert.fail("log: no Job role table to wiew");
  }
  })
})
