var app = require('..')('./some/dir', 13000);
var request = require('request');

request('http://localhost:13000/api/test2', function(err, res, body){
  if(!err && res.statusCode == 200 && body.toString() == 'alt2'){
    console.log('pass');
  }else{
    console.log('fail');
  }
  process.exit(0);
});
