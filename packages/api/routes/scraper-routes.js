const express = require('express');
const scrape = require('../../scraper');

const ScraperCtrl = require('../controllers/scraper-ctrl');

const router = express.Router();

router.get('/scrapers', ScraperCtrl.getScrapers);
router.post('/scrapers', ScraperCtrl.createScraper);
router.put('/scrapers/:id', ScraperCtrl.updateScraper);
router.get('/forceScrape', ScraperCtrl.forceScrape);
router.get('/cronScrape', ScraperCtrl.cronScrape);

module.exports = router;
