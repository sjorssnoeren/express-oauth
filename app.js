var http = require('http');
var express = require('express');
var OAuth = require('./lib/index.js');

var app = express();
var oauth = new OAuth({
  hostname: 'localhost',
  collection: 'oauth'
});

app.use(oauth.initialize());

http.createServer(app).listen(3000);
console.log("Server listening on port 3000");
