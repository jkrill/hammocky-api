var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var fs = require('fs');

var connection_url = "mongodb://localhost:27017/hammocky";

MongoClient.connect(connection_url, db_connected);

var server = app.listen(8081, function() {
  console.log("Server started (*:8081)");
});

function db_connected(err, db) {
  app.get('/featured', function(req, res) {
    res.json({
      error: 'not implemented'
    });
  }); 
  app.get('/img/:id', function(req, res) {
    var path = "/var/www/hammocky.com/img/" + req.params.id;
    if (fs.existsSync(path)) {
      res.sendFile('/var/www/hammocky.com/img/' + req.params.id);
    }
    else {
      res
        .status(404)
        .send('Not found');
    }
  });
}
