var app = require('http').createServer(hander);
var io = require('socket.io').listen(app);
var fs = require('fs');

