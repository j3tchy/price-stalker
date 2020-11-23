const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

require('dotenv').config({ path: __dirname + '/.env' });

const transformer = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASS,
  },
});

const options = {
  viewEngine: {
    layoutsDir: `${__dirname}/views/layouts`,
    extname: '.hbs',
  },
  extName: '.hbs',
  viewPath: `${__dirname}/views`,
};

const mailOptions = (productName, context) => ({
  from: process.env.SENDER_EMAIL,
  to: process.env.RECEPIENT_EMAIL,
  subject: `Alert | ${productName}`,
  template: 'scrapperLinks',
  context: {
    name: productName,
    websiteData: context,
  },
});

transformer.use('compile', hbs(options));

const scraperEmail = (productName, context) => {
  transformer.sendMail(mailOptions(productName, context), (error, info) => {
    const date = Date(Date.now()).toString();

    if (error) {
      console.log(`${date} ${error}`);
    } else {
      console.log(`${date} - Email sent: ${info.response}`);
    }
  });
};

module.exports = scraperEmail;
