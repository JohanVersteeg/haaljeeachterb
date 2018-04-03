var express = require('express');
var minimist = require('minimist');

var args = minimist(process.argv.slice(2));
var port = args.port || 8080;

var app = express();
app.get('*', express.static(__dirname + '/'));
app.listen(port);

console.log('Server listening at port localhost:' + port + '!'); 