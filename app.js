var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var GPIOController = require("./GPIOController/GPIOController.js");


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
    GPIOController.writeToHighOnPin(12);
    }else if (msg == 'close'){
    GPIOController.writeToLowOnPin(12);
    console.log('door close');
    }else if (msg == 'blink'){
      GPIOController.blinkOnPin(12);
      console.log('door blink');
    }else if (msg == 'read'){
      GPIOController.readOnPin(12);
    }else if (msg == 'cblink'){
      GPIOController.continueBlinkOnPin(12);
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


