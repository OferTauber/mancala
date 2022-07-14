import { useSocket } from '../../contecst/socket_provider';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import './wait_for_opponent.css';

const WaitForOpponent = ({ setUserId, setGameRoom, userId, userName }) => {
  const [spinner, setSpinner] = useState(false); //! style
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

  return (
    <div className="full-screen wait-for-opponent">
      <h2 className="blue-font">Welcome {userName}</h2>;
      <h3>We are wating for an opponent to start the game</h3>
      <img
        className="search"
        src="https://cdn.dribbble.com/users/1015322/screenshots/6521465/buscando_v01.gif"
        alt="search"
      />
    </div>
  );
};

export default WaitForOpponent;
