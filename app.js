var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/out'));


var port = process.env.PORT || 8081
server.listen(port);
console.log("Listen on port "+ port)



io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('navigate', function(data){
    console.log('navigate', data);
    io.emit('navigateTo', data);
  });
});

