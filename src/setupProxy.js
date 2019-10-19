const proxy = require('http-proxy-middleware');

// https://asia-east2-sdg-progress.cloudfunctions.net/country_budgets

module.exports = function(app) {
  app.use(
    '/api/country_budgets',
    proxy({
      target: 'https://asia-east2-sdg-progress.cloudfunctions.net/country_budgets',
      changeOrigin: true,
    })
  );
};
