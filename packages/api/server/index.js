const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../db');
const scraperRouter = require('../routes/scraper-routes');
const scraperCtrl = require('../controllers/scraper-ctrl');

const app = express();
const apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind('console', 'Unable to connect to Mongo db:'));

app.use('/api', scraperRouter);

app.use(scraperCtrl.forceScrape);


app.listen(apiPort, () => {
  console.log(`listening on port ${apiPort}`);
});
