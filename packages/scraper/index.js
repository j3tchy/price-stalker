const fetch = require('node-fetch');
const jsdom = require('jsdom');
const { stripOutPoundsSign } = require('./utils/string')
const { API_ROUTES } = require("../api/constants/routes");
const { createRoute } = require("../api/utils");
const { PRICE_DIFFERENCE } = require("../api/constants/enums");
const { createFormBody } = require('./utils/form');

const { JSDOM } = jsdom;


// Call to the DB to get scraper details
async function getScrapers() {
  try {
    return await fetch(API_ROUTES.API_SCRAPERS);
  } catch (err) {
    console.error(err)
  }
}

// Call to the websites to scrape
async function scrapeWebsites (url, element, retailer, price, _id) {
  const product = {
    _id: _id,
    retailer: retailer,
    url: url,
    element: element,
    price: price,
    priceDifference: null
  }

  try {
    const response = await fetch(url);
    const text = await response.text();
    const dom = await new JSDOM(text);
    const currentPrice = dom.window.document.querySelector(element);
    const priceWithoutCurrency = stripOutPoundsSign(currentPrice.textContent);
    const websitePrice = Math.ceil(Number(priceWithoutCurrency))

    if (!currentPrice) {
      console.log(`Unable to retrieve price from ${retailer}`)

      return {
        ...productDetails,
        retailer: `${retailer}: Unable to retrieve price`,
        price: "N/A"
      }
    }

    // TODO: Setup email - with the returned object, add
    // an extra field for increase/decrease in price
    // and use field to style price within email
    
    if (websitePrice === price) {
      console.log("prices are the same");
      return product
    }

    if (websitePrice > price) {
      return {
        ...product,
        price: websitePrice,
        priceDifference: PRICE_DIFFERENCE.UP
      }
    } else {
      return {
        ...product,
        price: websitePrice,
        priceDifference: PRICE_DIFFERENCE.DOWN
      }
    }

  } catch (err) {
    console.error(`Unable to retrieve information from ${retailer}: ${err}`);
  }
}

// Update the DB
async function updateScraper(id, price) {
  const formData = {
    price
  };

  try {
    await fetch(createRoute(API_ROUTES.API_SCRAPER_ID, { scraperId: id }), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: createFormBody(formData),
    })
  } catch (err) {
    console.error(err);
  }
}

getScrapers()
  .then(res => res.json())
  .then(({ data }) => {
    // Get array of new product details
    // Loop through each details and create PUT request for each one
    const productsList = async () => Promise.all(data.map(async ({ url, element, retailer, price, _id }) => {
      const scraper = await scrapeWebsites(url, element, retailer, price, _id);
      
      return scraper;
    }));

    productsList()
      .then(products => {
        products.forEach(({ _id, price }) => updateScraper(_id, price))
      })
  })
  .catch(err => console.error(err));