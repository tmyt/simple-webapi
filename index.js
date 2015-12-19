var fs = require('fs')
  , path = require('path');

function run(dir, port){
  if(port == undefined){
    port = dir;
    dir = 'api';
  }

  var express = require('express');
  var app = express();
  
  var files = fs.readdirSync(path.resolve(dir));
  var methods = ['get', 'post', 'put', 'delete'];
  
  for(var i = 0; i < files.length; ++i){
    var api = require(path.resolve(path.join(dir, files[i])));
    var m = files[i].match(/(.*?)\.js/);
    for(var j = 0; j < methods.length; ++j){
      if(api[methods[i]]) app[methods[i]]('/api/' + m[1], api[methods[i]]);
    }
  }

  app.listen(port);
  return app;
}

module.exports = run;
