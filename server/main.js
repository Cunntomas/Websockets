const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


server.listen(8080, function(){
  console.log('Servidor corriendo en localhost:8080');
})

app.use(express.static('public'));

let messages = [
  {
    author: "Carlos",
      text: "Hola! que tal?"
  },{
  	author: "Pepe",
      text: "Muy bien! y tu??"
  },{
  	author: "Paco",
      text: "Genial!"
  }
]

io.on('connection', (socket)=>{
	console.log('Un usuario se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', (data)=>{
      messages.push(data);
      console.log(messages);

      io.sockets.emit('messages', messages);
    })
});




  // socket.emit('new-message', mensaje);
