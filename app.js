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
  const socketId = socket.id

  socket.on('login', function(payload){
    const data = {
      id: socketId,
      name: payload
    }
    users.push(data)
    io.emit('sendUser', users)
  })

  socket.on('logout', function(payload){
    users = []
    io.emit('signOut', users)
  })

  socket.on('createRoom', function(payload){
    rooms.push(payload)
    io.emit('sendRoom', rooms)
  })

  socket.on('removeRoom', function(payload){
    rooms = []
    io.emit('exitRoom', rooms)
  })

  socket.on('playGames', function(payload){
    games.push(payload)
    io.emit('answer', games)
  })

});


server.listen(3000);