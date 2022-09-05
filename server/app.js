const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const uniqid = require('uniqid');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5000',
      'https://ofer-mancala.herokuapp.com',
      '/',
    ],
  },
});

let globalWatingUser = undefined;

const handelNewUser = async (socket) => {
  await sleep(200);
  io.to(socket.id).emit('login', {
    id: socket.id,
  });
  await sleep(200);
  if (globalWatingUser) startGame(socket, globalWatingUser);
  else waitForOpponent(socket);
};

const startGame = async (socket1, socket2) => {
  globalWatingUser = undefined;
  console.log('wating room is empty');
  firstPlayerId = randFirstPlayr(socket1, socket2);
  const room = uniqid();
  sleep(1200);

  await socket1.join(room);
  await socket2.join(room);

  io.emit('game-start', {
    room,
    firstPlayerId,
    players: [extractPlyerData(socket2), extractPlyerData(socket1)],
  });

  console.log('gameStart');
};

const waitForOpponent = (socket) => {
  globalWatingUser = socket;
  console.log(globalWatingUser.handshake.query.name + ' is wating');
};

const extractPlyerData = (socket) => {
  return {
    name: socket.handshake.query.name,
    id: socket.id,
  };
};

const randFirstPlayr = (socket1, socket2) => {
  return Math.random() * 2 > 1 ? socket1.id : socket2.id;
};

io.on('connection', async (socket) => {
  io.to(socket.id).emit('confirm connection');
  await socket.join('wating room');
  console.log(socket.handshake.query.name + ' has connected');
  handelNewUser(socket);

  socket.on('disconnect', () => {
    console.log(socket.handshake.query.name + ' has disconnected');
    if (globalWatingUser && socket.id === globalWatingUser.id)
      globalWatingUser = undefined;
    else {
      io.emit('opponent disconnected', socket.id);
    }
  });

  socket.on('move', ({ pitNum, room }) => {
    socket.to(room).emit('opponent-move', pitNum);
  });

  socket.on('Find me an opponent', async () => {
    await socket.join('wating room');
    handelNewUser(socket);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
