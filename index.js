var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var config = require('./config.json');

MongoClient.connect(config.mongo_connection_uri, db_connected);

var server = app.listen(config.http_server_port, function() {
  console.log("Server started (*:" + config.http_server_port + ")");
});

function db_connected(err, db) {
  app.get('/featured', function(req, res) {
    res.json({
      error: 'not implemented'
    });
  }); 
  app.get('/img/:id', function(req, res) {
    var img_path = path.join(config.img_path, req.params.id);
    if (fs.existsSync(img_path)) {
      res.sendFile(img_path);
    }
    else {
      res
        .status(404)
        .send('Not found: ' + req.params.id);
    }
  });
}
