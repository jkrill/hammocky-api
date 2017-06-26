var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const ee = new EventEmitter();


module.exports = function routes(app, config) {
  MongoClient.connect(config.mongo_connection_uri, function(err, db) {
    if (err) ee.emit('error', new Error('Unable to connect to db:\n' + err));
    api_ready(app, config, db);
  });
}

function api_ready(app, config, db) {

  app.get('/api', function(req, res) {
    res.json({})
  });

  app.get('/api/featured', function(req, res) {
    res.json({
      error: 'not implemented'
    });
  });
 
  app.get('/api/img/:id', function(req, res) {
    var img_path = path.join(config.img_path, req.params.id);
    if (fs.existsSync(img_path)) {
      res.sendFile(img_path);
    }
    else {
      res
        .status(404)
        .json({
          error: 'Not found: ' + req.params.id
        });
    }
  });

}
