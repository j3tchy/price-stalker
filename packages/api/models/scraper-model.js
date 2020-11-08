// Creates the schema (structure) of our db. 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Scraper = new Schema({
  retailer: { type: String, required: true },
  product: { type: String, required: true },
  url: { type: String, required: true },
  price: { type: Number, required: true },
  element: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('scraper', Scraper);