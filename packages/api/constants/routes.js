const API_BASE = 'http://localhost:5000/api';

const SLUGS = {
  SCRAPERS: 'scrapers',
  SCRAPER: 'scraper',
  SCRAPER_ID: ':scraperId'
}

const API_SCRAPERS = `${API_BASE}/${SLUGS.SCRAPERS}`;
const API_SCRAPER_ID = `${API_SCRAPERS}/${SLUGS.SCRAPER_ID}`;

const API_ROUTES = {
  API_SCRAPERS,
  API_SCRAPER_ID,
}

module.exports = {
  API_ROUTES
}
