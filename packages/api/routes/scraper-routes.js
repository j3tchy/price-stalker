const express = require('express');

const ScraperCtrl = require('../controllers/scraper-ctrl');

const router = express.Router();

router.get('/scrapers', ScraperCtrl.getScrapers);
router.post('/scrapers', ScraperCtrl.createScraper);
router.put('/scrapers/:id', ScraperCtrl.updateScraper);

module.exports = router;