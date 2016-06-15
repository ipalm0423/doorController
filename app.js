var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/indexHTML/index.html');
});



io.on('connection', function(socket){
  console.log('a user connected');
  
  
  socket.on('cmd', function(msg){
    console.log('cmd: ' + msg);
  });
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.emit('chat message', msg);
    if (msg == 'open'){
    console.log('door open');
    }else if (msg == 'close'){
    console.log('door close');
    }
  });
  
  socket.on('close door', function(msg){
    console.log('close door: ' + msg);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});