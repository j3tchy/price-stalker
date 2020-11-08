const express = require('express');

const ScraperCtrl = require('../controllers/scraper-ctrl');

const router = express.Router();

router.get('/scrapers', ScraperCtrl.getScrapers);
router.post('/scraper', ScraperCtrl.createScraper);

module.exports = router;