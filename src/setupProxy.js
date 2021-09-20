const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: "http://[::1]:3000",
        changeOrigin: true,
     })
    );
};