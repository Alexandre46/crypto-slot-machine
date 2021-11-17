const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
var cache = require('memory-cache');
const path = require('path');

const PORT = process.env.PORT || 5001;
const app = express();

// #########################################################
//  API CALLS - coinMarketCap will serve our frontend
// ########################################################
app.get('/api/coinmarketcap/cryptocurrency', (req, res) => {
  const options = {
    url: 'http://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50',
    method: 'GET',
    headers: {
        'X-CMC_PRO_API_KEY':'242959b4-5be2-480f-8f7d-5ea0df877d00'
    }
  };

  if (!cache.get('cryptoData')) {
    request(options, function(err, response, body) {
      if (!err && response.statusCode == 200) {
          let cryptoData = JSON.parse(body);
          res.json({cryptoData});
          cache.put('cryptoData', cryptoData, 3600)
      }
    });
  } else {
    let cryptoData = cache.get('cryptoData');
    console.log('cryptoData ->' +cryptoData);
    return cryptoData;
  }
});

app.get('/api/coinmarketcap/ids', (req, res) => {
  const options = {
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map',
    method: 'GET',
    headers: {
        'X-CMC_PRO_API_KEY':'242959b4-5be2-480f-8f7d-5ea0df877d00'
    }
  };

  if (!cache.get('cryptoIds')) {
    request(options, function(err, response, body) {
      if (!err && response.statusCode == 200) {
          let cryptoIds = JSON.parse(body);
          let result = cryptoIds.data.map(a => a.id);
          res.json({result});
          cache.put('cryptoIds', result, 3600);
      }
    })
  } else {
    let res = cache.get('cryptoIds');
    console.log('crypto IDS '+res);
    return cache.get('cryptoIds');
  }
});

/*
if (process.env.NODE_ENV === "production") {
    //Set Static folder
    app.use("/", express.static("build"));
    app.all("/*", (req, res) => {
      res.sendFile(__dirname + "/build/index.html");
    });
  }
  */

  // Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// #########################################################
//  EXTRAS - methods
// ########################################################
  
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