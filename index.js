var fs = require('fs')
  , path = require('path')
  , express = require('express')
  , bodyParser = require('body-parser');

function run(dir, port){
  if(typeof dir === 'string' && dir == parseInt(dir)){
    dir = parseInt(dir);
  }
  if(port == undefined && typeof dir === 'number'){
    port = dir;
    dir = 'api';
  }
  if(typeof port === 'string' && port == parseInt(port)){
    port = parseInt(port);
  }
  if(dir == undefined){
    dir = 'api';
  }

  var router = express.Router();
  
  var root = path.dirname(require.main.filename);
  var files = fs.readdirSync(path.join(root, dir));
  var methods = ['get', 'post', 'put', 'delete'];
  
  for(var i = 0; i < files.length; ++i){
    var api = require(path.join(root, dir, files[i]));
    var m = files[i].match(/(.*?)\.js/);
    for(var j = 0; j < methods.length; ++j){
      if(api[methods[j]]) router[methods[j]]('/' + m[1], api[methods[j]]);
    }
  }

  // if port is undefined, return router
  if(port === undefined){
    return router;
  }
  // listen on specified port
  var app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/api', router);
  app.listen(port);
  return app;
}

module.exports = run;
