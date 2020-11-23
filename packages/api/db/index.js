// Connect to the MongoDB
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const dbName = 'pricestalker';
const url = `mongodb://127.0.0.1:27017/${dbName}`;

mongoose.connect(`${url}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => {
  console.error(err);
});

const db = mongoose.connection;

module.exports = db;
