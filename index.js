var fs = require('fs')
  , path = require('path')
  , express = require('express');

function run(dir, port){
  if(port == undefined && typeof dir === 'number'){
    port = dir;
    dir = 'api';
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
      if(api[methods[i]]) router[methods[i]]('/' + m[1], api[methods[i]]);
    }
  }

  // if port is undefined, return router
  if(port === undefined){
    return router;
  }
  // listen on specified port
  var app = express();
  app.use('/api', router);
  app.listen(port);
  return app;
}

module.exports = run;
