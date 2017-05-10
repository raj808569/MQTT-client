var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));

app.set('port',(process.env.PORT||3000));
app.get('/',function(req,res){
  res.sendFile(__dirname + '/client.html');
});

http.listen (app.get('port'),function() {
  console.log("listening to port number "+app.get('port'));
});
 


io.on('connection',function(socket){

  client.subscribe('shubham.ucs2015@iitr.ac.in');
  

 
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(message.toString());
  var delta=message.toString();
  io.sockets.in(socket.id).emit('new_message',delta);
});

});