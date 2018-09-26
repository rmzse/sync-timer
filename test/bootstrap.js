const puppeteer = require('puppeteer');
const { expect } = require('chai');
const oldGlobalVars = {
  browser: global.browser,
  expect: global.expect,
};

// Puppeteer Options
const options = {
  headless: false,
  slowMo: 100,
  timeout: 10000
};

// Expose vars
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(options);
});

// Close browser and reset globals
after(function() {
  console.log(browser.document);
  browser.close();

  global.browser = oldGlobalVars.browser;
  global.expect = oldGlobalVars.expect;
});