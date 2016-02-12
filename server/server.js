// server.js
// basic express server to serve all static files from public directory

var express = require('express');
var app = express();
var port = process.env.PORT || 4569;
var eventRouter = express.Router();

require('./config/middleware.js')(app, express);

// express.Router.  use this to route requests
// use routes that i configured

app.listen(port);
