const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../db');

const app = express();
const apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

db.catch((err) => console.error(`Unable to connect to Mongo db: ${err}`));

app.get('/', (req, res) => {
  console.log("hello world");
});

app.listen(apiPort, () => {
  console.log(`listening on port ${apiPort}`);
});