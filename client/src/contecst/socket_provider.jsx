import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

// const ENDPOINT = 'https://ofer-mancala.herokuapp.com/';
// const ENDPOINT = 'http://127.0.0.1:5000/';
const ENDPOINT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'https://ofer-mancala.herokuapp.com/'
    : 'http://127.0.0.1:5000/';

const SocketContecst = React.createContext();

export function useSocket() {
  return useContext(SocketContecst);
}

export function SocketProvider({ name, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    try {
      const newSocket = io(ENDPOINT, { query: { name } });
      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } catch (e) {
      console.warn(e);
    }
  }, [name]);

  return (
    <SocketContecst.Provider value={socket}>{children}</SocketContecst.Provider>
  );
}
