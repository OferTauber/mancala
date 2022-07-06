const express = require('express');
const cors = require('cors');
const http = require('http');
const route = require('./src/route');
const path = require('path');
// require('./mongodb/mongoose'); // todo  - set mongo atlas
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.text());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/', route);

server.listen(PORT, (req, res) => {
  void req, res;
  console.log('Listen to port: ' + PORT);
});
