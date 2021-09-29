const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 5000;

module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: `http://[::1]:${PORT}`,
        changeOrigin: true,
        secure: false
     })
    );
};