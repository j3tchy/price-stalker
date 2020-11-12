const createRoute = (url, params) => Object.keys(params).reduce((prev, cur) => prev.replace(`:${cur}`, params[cur]), url);

module.exports = {
  createRoute,
};
