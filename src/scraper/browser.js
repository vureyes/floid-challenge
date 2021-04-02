const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certifcate-errors',
  '--ignore-certifcate-errors-spki-list',
  '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
];

const options = {
  args,
  // headless: false,
  ignoreHTTPSErrors: true,
  userDataDir: './tmp',
};

const startBrowser = async () => {
  let browser;
  try {
    console.log('Opening browser...');
    browser = await puppeteer.launch(options);
  } catch (err) {
    console.log('Could not create a browser instance => ', err);
  }
  return browser;
};

const browser = startBrowser();

module.exports = browser;
