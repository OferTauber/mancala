import Navbar from './navbar/navbar';
import Game from '../gmae/game';
import Login from '../login/login';
import { SocketProvider } from '../../contecst/socket_provider';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

const Main = (/* user */) => {
  const [userName, setUserName] = useState('a');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId(uniqid());
  }, []);

  if (!userName) return <Login setName={setUserName} />;

  return (
    <SocketProvider id={userId}>
      <Navbar />
      <Game userName={userName} />
    </SocketProvider>
  );
};

export default Main;
