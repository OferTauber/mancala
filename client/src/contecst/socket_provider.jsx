import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://ofer-mancala.herokuapp.com/'
    : 'http://127.0.0.1:5000/';

const SocketContecst = React.createContext();

export function useSocket() {
  return useContext(SocketContecst);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(ENDPOINT, { query: { id } });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContecst.Provider value={socket}>{children}</SocketContecst.Provider>
  );
}
