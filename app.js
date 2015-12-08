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
var socketUserMapping = {};


var addSocketToUser = function(museumId, socketId){
  socketUserMapping[socketId] = museumId;
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


var removeSocketFromUserSession = function(userId, socketId){
  delete socketUserMapping[socketId];
  if (museumSocketStore[userId]){
    var idx = museumSocketStore[userId].indexOf(socketId);
    if (idx > -1){
      museumSocketStore[userId].splice(idx, 1);

      if (museumSocketStore[userId].length == 0){
        museumSocketStore[userId] = undefined;
      }
    }
  }
};

var getSocketsOfUserSession = function(userId){
  if (museumSocketStore[userId]){
    return museumSocketStore[userId];
  }
};



io.on('connection', function(socket){
  console.log('a user connected...', socket.id);


  socket.on('disconnect', function () {
    console.log('a user disconnected.', socket.id);

    removeSocketFromUserSession(socketUserMapping[socket.id], socket.id);
  });


  socket.on('registerCode', function(data) {
    console.log('registerCode', data);
    codeStore[data.code] = data.userId;
  });

  socket.on('setUserSession', function(data) {
    console.log('setUserSession', data);
    if (data.userId){
      addSocketToUser(data.userId, socket.id);
    } else if (data.code){
      console.log('set with code',data.code,  codeStore[data.code], socket.id);
      addSocketToUser(codeStore[data.code], socket.id);
    }
  });

  socket.on('publishPreview', function(data){
    //console.log('publishPreview', data);
    var sockets = getSocketsOfUserSession(socketUserMapping[socket.id]);
    console.log("SEND TO: ", JSON.stringify(sockets));
    sockets.forEach(function(socketId) {
      //console.log('publish' +capitalizeFirstLetter(data.type)+'PreviewData', data.obj);
      io.sockets.connected[socketId].emit('publish' +capitalizeFirstLetter(data.type)+'PreviewData', data.obj);
    });

  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});

