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
    url: 'http://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50',
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

app.get('/api/coinmarketcap/ids', (req, res) => {

  const options = {
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map',
    method: 'GET',
    headers: {
        'X-CMC_PRO_API_KEY':'242959b4-5be2-480f-8f7d-5ea0df877d00'
    }
  };

  request(options, function(err, response, body) {
    if (!err && response.statusCode == 200) {
        let cryptoIds = JSON.parse(body);

        let result = cryptoIds.data.map(a => a.id);

        res.json({result});
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

  function getAllNumbersBetween(x, y) {
    var numbers = [];
    // Set a temporary variable i to start at value x.
    // As long as the value of i is less than the value y, increment it.
    // The loop will end when i is equal to y.
    for (var i = x; i < y; i++) {
      numbers.push(i);
    }
    return numbers;
  }

  function getFields(input, field) {
    var output = [];
    for (var i=0; i < input.length ; ++i)
        output.push(input[i][field]);
    return output;
}