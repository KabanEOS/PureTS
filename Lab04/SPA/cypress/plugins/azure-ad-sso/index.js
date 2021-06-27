/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const puppeteer = require('puppeteer');

function validateOptions(options) {
  if (!options.username) {
    throw new Error('Username missing for login');
  }
  if (!options.password) {
    throw new Error('Password missing for login');
  }
}

async function typeUsername({ page, options } = {}) {
  await page.waitForSelector('input[name=loginfmt]:not(.moveOffScreen)', { visible: true, delay: 10000 });
  await page.type('input[name=loginfmt]', options.username, { delay: 50 });
  await page.click('input[type=submit]');
}

async function typePassword({ page, options } = {}) {
  await page.waitForSelector('input[name=Password]:not(.moveOffScreen),input[name=passwd]:not(.moveOffScreen)', { visible: true, delay: 10000 });
  await page.type('input[name=passwd]', options.password, { delay: 50 });
  await page.click('input[type=submit]');
}

async function doNotSaveCookies({ page } = {}) {
  await page.waitForSelector('#idBtn_Back', { visible: true, delay: 10000 });
  await page.click('#idBtn_Back');
}

async function getSessionStorage(page) {
  await page.waitForSelector('.nav-bar__user', { visible: true, delay: 10000 });

  const sessionStorage = JSON.parse(await page.evaluate(
    () => JSON.stringify(window.sessionStorage)
  ));

  return sessionStorage;
}

async function finalizeSession(browser) {
  await browser.close();
}

/**
 *
 * @param {options.username} string username
 * @param {options.password} string password
 * @param {options.loginUrl} string password
 * @param {options.postLoginSelector} string a selector on the app's post-login return page to assert that login is successful
 * @param {options.headless} boolean launch puppeteer in headless more or not
 * @param {options.logs} boolean whether to log cookies and other metadata to console
 */
module.exports.AzureAdSingleSignOn = async function (options = {}) {
  validateOptions(options);

  const browser = await puppeteer.launch({ headless: !!options.headless });
  const page = await browser.newPage();

  await page.goto(options.loginUrl);

  await typeUsername({ page, options });
  await typePassword({ page, options });
  //options.userType returns ExternalUser for Internal Moderator
  // if (options.userType === 'InternalModerator') await doNotSaveCookies({ page });
  await doNotSaveCookies({ page });

  const sessionStorage = await getSessionStorage(page);

  await finalizeSession(browser);

  return sessionStorage;
};