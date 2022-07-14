import Game from '../gmae/game';
import Login from '../login/login';
import WaitForOpponent from '../look_for_opponent/wait_for_opponent';
import { SocketProvider } from '../../contecst/socket_provider';
import { useState } from 'react';
import './main.css';

const Main = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [gameRoom, setGameRoom] = useState({});

  if (!userName) return <Login setName={setUserName} />;

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
        <Game userName={userName} userId={userId} gameRoom={gameRoom} />
      )}
    </SocketProvider>
  );
};

export default Main;
