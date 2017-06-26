var express = require('express');
var app = express();

var config = require('./config.json');

require('./app.admin/app.js')(app, config);
require('./app.api/app.js')(app, config);
require('./app.landing/app.js')(app, config);

app.listen(
  config.http_server_port || 8081,
  () => console.log("Server started (*:" + (config.http_server_port || 8081) + ")")
);

app.get('/style.css', function(req, res) {
  res.sendFile('./css.global/style.css');
});

