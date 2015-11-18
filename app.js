var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/out'));


var port = process.env.PORT || 1338
server.listen(port);
console.log("Listen on port "+ port)



io.on('connection', function(socket){
  console.log('a user connected ');


  socket.on('publishPreview', function(data){
    console.log('publishPreview', data.type, data.id, data.data);

    io.emit('navigateTo', {'type': data.type, 'id': data.id});
    io.emit('publishPreviewData', data);
  });
});

