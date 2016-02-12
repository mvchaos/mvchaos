// server.js
// basic express server to serve all static files from public directory

var express = require('express');
var app = express();
var port = process.env.PORT || 4569;
var path = require('path');// install
var eventRouter = express.Router();

// express.Router.  use this to route requests
// use routes that i configured

app.post('/api/events', function(req, res){
  console.log('simple form post');
  res.send(req.query.data);
});

app.get('/api/events', function(req, res){
  console.log('simple form get');
  res.send('simple form');
});


app.use(express.static(__dirname + '/../public'));
app.listen(port);
