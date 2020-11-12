const { stripOutPoundsSign } = require('./string');

const convertToNumber = (value) => {
  const priceWithoutCurrency = stripOutPoundsSign(value);
  return Math.ceil(Number(priceWithoutCurrency));
};

module.exports = {
  convertToNumber,
};
