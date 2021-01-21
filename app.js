const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors')
const router = require('./routers/index')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', router)

let users = []

let rooms = []

let games =  []

io.on('connection', socket => {
  console.log (`connect ke server`)

  socket.on('login', function(payload){
    users.push(payload)
    socket.emit('sendUserLogin', payload)
    io.emit('sendRooms', rooms)
  })

  socket.on('logout', function(payload){
    users = users.filter(user => user.id !== payload.id)
    socket.emit('signOut', users)
  })

  socket.on('getUser', function(payload){
    users.map((data) => {
      data.id === payload.id ? socket.emit('sendUser', data) : null
    });
  })

  socket.on('createRoom', function(payload){
    rooms.push(payload)
    io.emit('sendRooms', rooms)
  })

  socket.on('getRooms', function () {
    io.emit('sendRooms', rooms);
  })

  socket.on('getRoom', function(payload){
    users.map((data) => {
      data.id === payload.id ? socket.emit('sendRoom', data) : null
    });
  })

  socket.on('removeRoom', function(payload){
    rooms = rooms.filter(room => room.id !== payload.id)
    io.emit('deleteRoom', rooms)
  })

  socket.on('joinRoom', function(payload){
    rooms.forEach(el => {
      if(el.id === payload.idRoom){
        el.players.push({id: payload.idUser, name: payload.name})
      }
    })
    io.emit('sendRoom', rooms)
  })

  socket.on('exitRoom', function(payload){
    rooms.map(data => {
      if(data === roomId){
        data.players = data.players.filter(u => u.id !== payload.id)
      }
    })
    io.emit('outRoom', rooms)
  })

  socket.on('gameStart', function(payload){
    games.push(payload)
    io.emit('games', games)
  })

});


server.listen(3000);