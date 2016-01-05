# simple webapi

simple express wrapper.

## brief

this module provides simply method for implements web api.

## usage

write the code in your script.

```javascript
require('simple-webapi')(3000);
```

and add your webapi in api directory.

```
exports.get = function(req, res){
   res.send('hello world');
}
```

## api

```javascript
// listen port 3000, api loads from /api
var app = require('simple-webapi')(3000);

// listen port 3000, api loads from /some/dir
var app = require('simple-webapi')('/some/dir', 3000);

// api loads from /api, but not listen.
var router = require('simple-webapi')();

// api laods from /some/dir, but not listen.
var router = require('simple-webapi')('/some/dir');
```

