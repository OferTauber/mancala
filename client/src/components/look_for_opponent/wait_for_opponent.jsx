import { useSocket } from '../../contecst/socket_provider';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';

const WaitForOpponent = ({ setUserId, setGameRoom, userId }) => {
  const [spinner, setSpinner] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    const handelLogin = ({ id }) => {
      console.log('user Id: ' + id);
      setUserId(id);
      setSpinner(false);
    };
    if (!socket) return;
    socket.on('login', handelLogin);
    return () => socket.off('login');
  }, [socket, setUserId]);

  useEffect(() => {
    const handelGameStart = ({ room, players, firstPlayerId }) => {
      const opponent = players.find((player) => player.id !== userId);
      console.log('room: ', room);
      console.log('player1: ', players[0]);
      console.log('player2: ', players[1]);
      console.log('firstPlayerId: ', firstPlayerId);
      console.log('userId: ', userId);
      console.log('opponent: ', opponent);
      setGameRoom({ room, opponent, firstPlayerId });
    };
    if (!socket) return;
    socket.on('game-start', handelGameStart);
    return () => socket.off('game-start');
  }, [socket, setGameRoom, userId]);

  if (spinner) return <Spinner />;

  return <h1>Wait For Game To Start</h1>;
};

export default WaitForOpponent;
