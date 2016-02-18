// server.js
// basic express server to serve all static files from public directory

var express = require('express');
var app = express();
var port = process.env.PORT || 4569;
var Promise = require('bluebird');
var request = require('request');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/scripts', express.static(__dirname + '/../node_modules/'));


app.listen(port);

app.get('/api/events', function(req, res) {
    res.send('simple form');
});

var apiString = 'http://www.zipcodeapi.com/rest/1QKL24IjZSW1tW6CXisZOprzLWyf4t56kQRnUzGUrDWVA2yxl1w9qYJcUirYMx56/radius.json/'

var apiCall = function(data) {
  return new Promise(function(resolve, reject) {
    request(apiString + data.zipCode + '/1/mile/',
            function(error, response, body) {
              if (error) {
                return error;
              }
              if (response.statusCode !== 200) {
                ;
                // return console.log('Invalid Status Code Returned:', response.statusCode);
              }
              var answer = JSON.parse(body);
              resolve(answer);
            });
  });
};

app.post('/api/location', function(req, res) {
  console.log('req body: ', req.body);
    var firstpromise = apiCall(req.body);
    Promise.all([firstpromise]).then(function(results) {
        res.send(results);
    }).catch(function() {});
});
