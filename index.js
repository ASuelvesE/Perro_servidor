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

var usuarios  = [];
console.log("Usuarios conectados: " + usuarios.length)

io.on('connection', function(socket){

    console.log('Se ha conectado un usuario');

  socket.on('usuario nuevo', function(msg){
    io.emit('usuario nuevo', msg);
    usuarios.push (msg);
    for (var valor of usuarios) {
      console.log("Usuarios conectados: " + valor);
    }
  });


  socket.on('chat mensaje', function(msg){
    console.log("Mensaje: " + msg);
    io.emit('chat mensaje', msg);
    if(usuarios.length == 0){
      msg = "";
    }
  });

  socket.on('usuarios conectados', function(msg){
    console.log("Devolviendo los usuarios conectados");
    io.emit('usuarios conectados', usuarios);
    
  });

  socket.on('usuario desconectado', function(msg){
    let posicion = usuarios.indexOf(msg);
    usuarios.splice(posicion, 1);
    console.log("Se ha eliminado del array a: " + msg);
    for (var valor of usuarios) {
      console.log("Usuarios conectados: " + valor);
    }
  });

  socket.on('nuevo perro', function(perro,nombre){
    console.log(nombre +" ha creado un nuevo perro llamado: " + perro);
    io.emit('nuevo perro', perro,nombre);
  });

  socket.on('evento chat', function(chat,usuario){
    console.log(usuario+ " : " + chat);
    io.emit('evento chat', chat,usuario);
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
    usuarios.pop();
  });
});

http.listen(app.get('port'), function() {
  console.log('Servidor funcionando en el puerto:', app.get('port'));
});
