// next.config.js
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 3000, // Check for changes every second
      aggregateTimeout: 300,
    };
    return config;
  },
};
