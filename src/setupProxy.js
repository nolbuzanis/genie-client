const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy(['/user', '/api', '/spotify', '/songs', '/followers'], {
      target: 'http://localhost:5000'
    })
  );
};
