const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/api",{ 
      target: "http://[::1]:3000",
      secure: false,
      headers: {
        "Connection": "keep-alive"
      },
      changeOrigin: true,
      logLevel: 'debug',
     }));
};