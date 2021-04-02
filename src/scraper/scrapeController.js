const transactionScraper = require('./transactionScraper');

const scrapeTransactions = async (browserInstance, params) => {
  try {
    const browser = await browserInstance;
    const transactionCount = await transactionScraper.scrape(browser, params);
    await browser.close();
    return { transactionCount };
  } catch (error) {
    console.log('Could not resolve the browser instance => ', error);
    return { error };
  }
};

module.exports = { scrapeTransactions };
