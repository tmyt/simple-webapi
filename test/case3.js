var router = require('..')();
var express = require('express');
var request = require('request');

var app = express();
app.use('/custom/route', router);
app.listen(13000);

request('http://localhost:13000/custom/route/test', function(err, res, body){
  if(!err && res.statusCode == 200 && body.toString() == 'ok'){
    console.log('pass');
  }else{
    console.log('fail');
  }
  process.exit(0);
});
