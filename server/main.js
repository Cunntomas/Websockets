require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')
const Message = require('../models/messages')

let messages;

server.listen(8080, function(){
  console.log('Servidor corriendo en localhost:8080')
})

function connectMongoose () {
  const mongoose = require('mongoose')
  mongoose.Promise = Promise
  console.log('mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB)
  return mongoose.connect('mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB, { useNewUrlParser: true })
}

connectMongoose();


app.use(express.static('public'));

io.on('connection', (socket)=>{
	console.log('Un usuario se ha conectado');
  Message.find().then(msgs => {
        if(msgs){
          messages = msgs;
          socket.emit('messages', messages);
        }
    });


    socket.on('new-message', (data)=>{
      // messages.push(data);

      Message.create({username: data.username, text: data.text});
      messages.push(data);
      io.sockets.emit('messages', messages);

    })
});




  // socket.emit('new-message', mensaje);
