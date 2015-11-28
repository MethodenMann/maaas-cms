var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/out'));


var port = process.env.PORT || 1338
server.listen(port);
console.log("Listen on port "+ port)


var codeStore = {};
var museumSocketStore = {};
var socketMuseumMapping = {};


var addSocketToMuseum = function(museumId, socketId){
  socketMuseumMapping[socketId] = museumId;
  if (!museumSocketStore[museumId]){
    museumSocketStore[museumId] = [];
    museumSocketStore[museumId].push(socketId);
  }
  else
  {
    if (museumSocketStore[museumId].indexOf(socketId) == -1){
      museumSocketStore[museumId].push(socketId);
    }
  }
};

var removeSocketFromMuseum = function(museumId, socketId){
  delete socketMuseumMapping[socketId];
  if (museumSocketStore[museumId]){
    var idx = museumSocketStore[museumId].indexOf(socketId);
    if (idx > -1){
      museumSocketStore[museumId].splice(idx, 1);

      if (museumSocketStore[museumId].length == 0){
        museumSocketStore[museumId] = undefined;
      }
    }
  }
};

var getSocketsOfMuseum = function(museumId){
  if (museumSocketStore[museumId]){
    return museumSocketStore[museumId];
  }
};



io.on('connection', function(socket){
  console.log('a user connected..  ', socket.id);


  socket.on('disconnect', function () {
    removeSocketFromMuseum(socketMuseumMapping[socket.id], socket.id);
  });


  socket.on('registerCode', function(data) {
    console.log('registerCode', data);
    codeStore[data.code] = data.museumId;
  });

  socket.on('setMuseum', function(data) {
    console.log('setMuseum', data);
    if (data.museumId){
      addSocketToMuseum(data.museumId, socket.id);
    } else if (data.code){
      console.log('set with code',data.code,  codeStore[data.code], socket.id);
      addSocketToMuseum(codeStore[data.code], socket.id);
    }

  });

  socket.on('publishPreview', function(data){
    console.log('publishPreview', data.type, data.id, data.data);
    var sockets = getSocketsOfMuseum(socketMuseumMapping[socket.id]);
    console.log("SEND TO: ", JSON.stringify(sockets));
    sockets.forEach(function(socketId) {
      io.sockets.connected[socketId].emit('navigateTo', {'type': data.type, 'id': data.id});
      io.sockets.connected[socketId].emit('publishPreviewData', data);
    });

  });
});

