io.on('connection', (socket) => {
    console.log(`connect ke server`);
  
    socket.on('login', function (payload) {
      users.push(payload);
      socket.emit('sendUserLogin', payload);
      io.emit('sendRooms', rooms);
    });
  
    socket.on('logout', function (payload) {
      users = users.filter((user) => user.id !== payload.id);
      socket.emit('signOut', users);
    });
  
    socket.on('getUser', function (payload) {
      users.map((data) => {
        data.id === payload.id ? socket.emit('sendUser', data) : null;
      });
    });
  
    socket.on('createRoom', function (payload) {
      rooms.push(payload);
      io.emit('sendRooms', rooms);
    });
  
    socket.on('getRooms', function () {
      io.emit('sendRooms', rooms);
    });
  
    socket.on('getRoom', function (payload) {
      rooms.map((data) => {
        data.id === payload.id ? socket.emit('sendRoom', data) : null;
      });
    });
  
    socket.on('joinRoom', function (payload) {
      rooms.forEach((el) => {
        if (el.id === payload.idRoom) {
          el.players.push({ id: payload.idUser, name: payload.name });
          io.emit('sendRoom', el);
        }
      });
      io.emit('sendRooms', rooms);
    });
  
    socket.on('exitRoom', function (payload) {
      rooms.map((data) => {
        if (data.id === payload.idRoom) {
          data.players = data.players.filter((u) => u.id !== payload.idUser);
          if (data.players.length === 0) {
            rooms = rooms.filter((room) => room.id !== payload.idRoom);
          } else {
            io.emit('sendRoom', data);
          }
        }
      });
      io.emit('sendRooms', rooms);
    });
  
    socket.on('createGame', function (payload) {
      games.push(payload);
      io.emit('sendPlay', payload);
    });
  });