import Game from '../gmae/game';
import Login from '../login/login';
import HowToPlay from '../login/how-to_play/how-to_play';
import WaitForOpponent from '../look_for_opponent/wait_for_opponent';
import { SocketProvider } from '../../contecst/socket_provider';
import { useState } from 'react';
import './main.css';

const Main = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [confirmGameRouls, setConfirmGameRouls] = useState(false);
  const [gameRoom, setGameRoom] = useState({});
  const restartGame = () => {
    setGameRoom({});
  };

  if (!userName) return <Login setName={setUserName} />;
  if (!confirmGameRouls) return <HowToPlay confirm={setConfirmGameRouls} />;

  return (
    <SocketProvider name={userName}>
      {!gameRoom.room && (
        <WaitForOpponent
          userName={userName}
          setUserId={setUserId}
          setGameRoom={setGameRoom}
          userId={userId}
        />
      )}
      {gameRoom.room && (
        <Game
          userName={userName}
          userId={userId}
          gameRoom={gameRoom}
          restartGame={restartGame}
        />
      )}
    </SocketProvider>
  );
};

export default Main;
