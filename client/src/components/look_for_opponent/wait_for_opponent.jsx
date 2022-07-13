import { useSocket } from '../../contecst/socket_provider';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';

const WaitForOpponent = ({ setUserId, setGameRoom }) => {
  const [spinner, setSpinner] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    const handelLogin = ({ id }) => {
      setUserId(id);
      setSpinner(false);
    };
    if (!socket) return;
    socket.on('login', handelLogin);
    return () => socket.off('login');
  }, [socket, setUserId]);

  useEffect(() => {
    const handelGameStart = ({ room, opponent, firstPlayerId }) => {};
    if (!socket) return;
    socket.on('game-start', handelGameStart);
    return () => socket.off('game-start');
  }, [socket]);

  if (spinner) return <Spinner />;

  return <h1>Wait For Game To Start</h1>;
};

export default WaitForOpponent;
