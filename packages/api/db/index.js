// Connect to the MongoDB
const { MongoClient } = require("mongodb");

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'test-db';

const db = MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {
  console.error(err)
});

module.exports = db;