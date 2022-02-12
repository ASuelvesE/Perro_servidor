const express = require('express')
const path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/'));

// views is directory for all template files
app.set('views', __dirname + '/index.html');
app.set('view engine', 'ejs');

console.log("outside io");

io.on('connection', function(socket){

    console.log('Se ha conectado un usuario');

  socket.on('connect user', function(user){
    console.log("Usuario Conectado ");
    io.emit('connect user', user);
  });


  socket.on('chat mensaje', function(msg){
    console.log("Mensaje: " + msg);
    io.emit('chat mensaje', msg);
  });


});

http.listen(app.get('port'), function() {
  console.log('Servidor funcionando en el puerto:', app.get('port'));
});
