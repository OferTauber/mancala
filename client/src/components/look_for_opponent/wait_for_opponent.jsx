import { useSocket } from '../../contecst/socket_provider';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import './wait_for_opponent.css';

const WaitForOpponent = ({ setUserId, setGameRoom, userId, userName }) => {
  const [spinner, setSpinner] = useState(true);
  const { socket, isSocketConected } = useSocket();

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
    setTimeout(() => {
      setSpinner(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const handelGameStart = ({ room, players, firstPlayerId }) => {
      const opponent = players.find((player) => player.id !== userId);
      setGameRoom({ room, opponent, firstPlayerId });
    };
    if (!socket) return;
    socket.on('game-start', handelGameStart);
    return () => socket.off('game-start');
  }, [socket, setGameRoom, userId]);

  if (spinner) return <Spinner />;
  if (!isSocketConected) return <FailToConnect />;

  return (
    <div className="full-screen wait-for-opponent">
      <h2 className="blue-font">Welcome {userName}</h2>;
      <h3>Waiting for an opponent to start the game</h3>
      <img
        className="search"
        src="https://cdn.dribbble.com/users/1015322/screenshots/6521465/buscando_v01.gif"
        alt="search"
      />
    </div>
  );
};

export default WaitForOpponent;

const FailToConnect = () => {
  return (
    <div className="connection-filed full-screen centerd-column white blue-font">
      <div>
        <h1>Something went wrong</h1>
        <h3>Unable to connect to server</h3>
      </div>
      <div>
        <h4>
          I would be grateful if you <br />
          can update me on the issue{' '}
          <a href="mailto: ofertauber@gmail.com">
            <i className="fa-solid fa-envelope red-font"></i>
          </a>
        </h4>
      </div>
    </div>
  );
};
