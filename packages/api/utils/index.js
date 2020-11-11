const createRoute = (url, params) => {
  return Object.keys(params).reduce((prev, cur) => prev.replace(`:${cur}`, params[cur]), url);
}

module.exports = {
  createRoute
}