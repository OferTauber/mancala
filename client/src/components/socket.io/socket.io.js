// import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'https://ofer-mancala.herokuapp.com';

function Socket() {
  // const [response, setResponse] = useState('');
  const pings = ['Ping!', 'Pssss', 'Pong', 'Hi!!', 'Oi!'];

  const socket = socketIOClient(ENDPOINT);
  socket.on('massage', (data) => {
    console.log(data);
  });

  const ping = () => {
    const rand = Math.floor(Math.random() * 5);
    socket.emit('ping', pings[rand]);
  };

  return (
    <div>
      <p>Welcome</p>
      <button onClick={ping}>Ping</button>
    </div>
  );
}

export default Socket;
