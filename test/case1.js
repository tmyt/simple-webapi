var app = require('..')(13000);
var request = require('request');

request('http://localhost:13000/api/test', function(err, res, body){
  if(!err && res.statusCode == 200 && body.toString() == 'ok'){
    console.log('pass');
  }else{
    console.log('fail');
  }
  process.exit(0);
});
