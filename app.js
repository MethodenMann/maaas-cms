var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/out'));


var port = process.env.PORT || 1338
server.listen(port);
console.log("Listen on port "+ port)


var socketStore = {};


var addSession = function(client, socketId){
  if (!socketStore[client]){
    socketStore[client] = [];
    socketStore[client].push(socketId);
  }
  else
  {
    if (socketStore[client].indexOf(socketId) == -1){
      socketStore[client].push(socketId);
    }
  }
  console.log("---------------------------add to STore", JSON.stringify(socketStore))
};

var removeSession = function(client, socketId){
  if (socketStore[client]){
    var idx = socketStore[client].indexOf(socketId);
    if (idx > -1){
      socketStore[client].splice(idx, 1);

      if (socketStore[client].length == 0){
        socketStore[client] = undefined;
      }
    }
  }

  console.log("------------------------------REMOVE to STore", JSON.stringify(socketStore))
};

var getSocketsOfClient = function(client){
  if (socketStore[client]){
    return socketStore[client];
  }
};

io.on('connection', function(socket){
  console.log('a user connected  ', socket.handshake.address, socket.id);

  addSession(socket.handshake.address, socket.id);

  socket.on('disconnect', function () {
    removeSession(socket.handshake.address, socket.id);
  });


  socket.on('publishPreview', function(data){
    console.log('publishPreview', data.type, data.id, data.data);
    var sockets = getSocketsOfClient(socket.handshake.address);
    sockets.forEach(function(socketId) {
      io.sockets.connected[socketId].emit('navigateTo', {'type': data.type, 'id': data.id});
      io.sockets.connected[socketId].emit('publishPreviewData', data);
    });

  });
});

