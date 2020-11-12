const { stripOutPoundsSign } = require('./string');

it('should strip out pound sign', () => {
  const price = '£79.99';

  expect(stripOutPoundsSign(price)).toBe('79.99');
});
