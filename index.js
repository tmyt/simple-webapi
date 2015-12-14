var fs = require('fs')
  , path = require('path');

var express = require('express');
var app = express();

var files = fs.readdirSync(path.resolve('api'));
var methods = ['get', 'post', 'put', 'delete'];

for(var i = 0; i < files.length; ++i){
  var api = require(path.resolve(path.join('api', files[i])));
  var m = files.match(/(.*?)\.js/);
  for(var j = 0; j < methods.length; ++j){
    if(api[methods[i]]) app[methods[i]]('/api/' + m[1], api[methods[i]]);
  }
}

module.exports = app;
