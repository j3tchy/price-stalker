const Scraper = require('../models/scraper-model');

const createScraper = (req, res) => {
  //Grab body from request (form content);
  const body = req.body;

  // If no body is sent, return json
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Please add a scraper',
    })
  }

  // If there is a new scraper, pass the values into this class
  const scraper = new Scraper(body);

  //If scraper is not returned, return error
  if (!scraper) {
    return res.status(400).json({ success: false, error: err });
  }

  // If scraper is saved return details, otherwise return error
  scraper
    .save()
    .then(() => {
      return res.status(201)
        .json({
          success: true,
          id: scraper._id,
          message: 'Scraper created'
        })
    })
    .catch(err => {
      return res.status(400)
        .json({
          err,
          message: 'Scraper not created'
        })
    })
}

const getScrapers = async (req, res) => {
  return Scraper.find({}, (err, scrapers) => {
    if (err) {
      return res.status(400)
        .json({
          success: false,
          error: err
        })
    }

    if (!scrapers.length) {
      return res.status(404)
        .json({
          success: false,
          error: 'Scrapers not found'
        })
    }

    return res.status(200).json({ success: true, data: scrapers })
  }).catch(err => console.error(err))
}

const updateScraper = async (req, res) => {
  const body = req.body;

  // If no body is sent, return json
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Unable to update scraper',
    })
  }

  return Scraper.findOne({ id: req.params._id }, ( err, scraper ) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Scraper not found'
      })
    }

    scraper.price = body.price;

    scraper
      .save()
      .then(() => {
        return res
          .status(200)
          .json({
            success: true,
            id: scraper._id,
            message: 'Scraper Updated'
          })
      })
      .catch(() => {
        return res.status(400).json({
          success: false,
          message: 'Scraper not updated'
        })
      })
  })
}

module.exports = {
  createScraper,
  getScrapers,
  updateScraper,
};