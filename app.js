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

io.on('connection', socket => {
  console.log (`connect ke server`)
});


server.listen(3000);