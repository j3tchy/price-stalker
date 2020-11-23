const { stripOutPoundsSign } = require('./string');

const convertToNumber = (value) => {
  const priceWithoutCurrency = stripOutPoundsSign(value);
  const convertToValidNumber = priceWithoutCurrency.replace(/,/g, ".");

  return Math.ceil(Number(convertToValidNumber));
};

module.exports = {
  convertToNumber,
};
