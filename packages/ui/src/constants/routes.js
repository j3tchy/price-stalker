const BASE = 'http://localhost:5000/api';

const SLUGS = {
  SCRAPERS: 'scrapers',
  FORCE_SCRAPERS: 'forceScrape',
  CRON_SCRAPERS: 'cronScrapers',
};

const API_SCRAPERS = `${BASE}/${SLUGS.SCRAPERS}`;
const API_FORCE_SCRAPERS = `${BASE}/${SLUGS.FORCE_SCRAPERS}`;
const API_CRON_SCRAPERS = `${BASE}/${SLUGS.CRON_SCRAPERS}`;

/* eslint-disable-next-line import/prefer-default-export */
export const API = {
  API_SCRAPERS,
  API_FORCE_SCRAPERS,
  API_CRON_SCRAPERS,
};
