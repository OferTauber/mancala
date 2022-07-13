import { useSocket } from '../../contecst/socket_provider';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import WaitForGameToStart from './wait_for_opponent';

const HostsList = ({ setUserId, userName, userId }) => {
  const [hosts, setHosts] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const handelLogin = ({ id, hostsList }) => {
      setHosts(hostsList);
      setUserId(id);
      console.log(hostsList);
    };
    if (!socket) return;
    socket.on('login', handelLogin);
    return () => socket.off('login');
  }, [socket, setUserId]);

  if (!hosts[0]) return <Spinner />;

  //   socket.emit('socket wants to host', userName + userId);

  return <h1>HostsList</h1>;
};

export default HostsList;
