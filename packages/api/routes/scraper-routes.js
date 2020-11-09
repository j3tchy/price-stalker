const express = require('express');

const ScraperCtrl = require('../controllers/scraper-ctrl');

const router = express.Router();

router.get('/scrapers', ScraperCtrl.getScrapers);
router.post('/scraper', ScraperCtrl.createScraper);
router.put('/scraper/:id', ScraperCtrl.updateScraper);

module.exports = router;