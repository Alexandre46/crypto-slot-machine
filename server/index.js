const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const request = require('request');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }, cors()));
app.use(pino);

app.get('/api/coinmarketcap/cryptocurrency', (req, res) => {

  const options = {
    url: 'http://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=1,2,3,4,5,6,7,8,9,10',
    method: 'GET',
    headers: {
        'X-CMC_PRO_API_KEY':'242959b4-5be2-480f-8f7d-5ea0df877d00'
    }
  };

  request(options, function(err, response, body) {
    if (!err && response.statusCode == 200) {
        let cryptoData = JSON.parse(body);
        res.json({cryptoData});
    }
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    //Set Static folder
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
  }
  
  
  //App listen to PORT
  app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
  });
