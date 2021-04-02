const express = require('express');
const { query } = require('express-validator');

const router = express.Router();
const browser = require('./scraper/browser');
const { scrapeTransactions } = require('./scraper/scrapeController');

const browserInstance = browser;

const queryValidation = [
  query('user').notEmpty(),
  query('password').notEmpty(),
  query('year').notEmpty(),
];

router.get('/', queryValidation, async (req, res) => {
  const params = req.query;
  const result = await scrapeTransactions(browserInstance, params);
  res.send(result);
});

module.exports = router;
