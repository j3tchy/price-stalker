const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { stripOutPoundsSign } = require('./utils/string')

// Call to the DB to get scraper details
const getScrapers = async () => {
  try {
    return await fetch('http://localhost:5000/api/scrapers');
  } catch (err) {
    console.error(err)
  }
}

// Call to the websites to scrape
const scrapeWebsites = async (url, element, retailer, price) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const dom = await new JSDOM(text);
    const currentPrice = dom.window.document.querySelector(element);
    const priceWithoutCurrency = stripOutPoundsSign(currentPrice.textContent);
    const websitePrice = Math.ceil(Number(priceWithoutCurrency))

    if (!currentPrice) {
      console.log(`Unable to retrieve price from ${retailer}`)
    }

    // TODO: Setup email - with the returned object, add
    // an extra field for increase/decrease in price
    // and use field to style price within email
    
    if (websitePrice === price) {
      console.log("prices are the same");
    }

  } catch (err) {
    console.error(`Unable to retrieve information from ${retailer}: ${err}`);
  }
}

getScrapers()
  .then(res => res.json())
  .then(({ data }) => {
    // Get array of new product details
    // Loop through each details and create PUT request for each one
    data.map(({ url, element, retailer, price }) => {
      scrapeWebsites(url, element, retailer, price);
    })
  })
  .catch(err => console.error(err));