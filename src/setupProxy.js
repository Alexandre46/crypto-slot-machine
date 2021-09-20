const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/api",{ 
      target: "https://[::1]:3000",
      headers: {
        "Connection": "keep-alive"
      }
     }));
};