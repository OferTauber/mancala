import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';

const ENDPOINT = 'https://ofer-mancala.herokuapp.com/';

// const ENDPOINT = 'http://127.0.0.1:5000/';
// const ENDPOINT =
//   !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
//     ? 'https://ofer-mancala.herokuapp.com/'
//     : 'http://127.0.0.1:5000/';
// const ENDPOINT = 'http://127.0.0.1:5000/';
// const ENDPOINT = 'http://127.0.0.1:5000/';

const SocketContecst = React.createContext();

export function useSocket() {
  return useContext(SocketContecst);
}

export function SocketProvider({ name, children }) {
  const [socket, setSocket] = useState();
  const [isSocketConected, setIsSocketConected] = useState(false);

  useEffect(() => {
    try {
      const newSocket = io(ENDPOINT, {
        query: { name },
      });
      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } catch (e) {
      console.warn(e);
    }
  }, [name]);

  useEffect(() => {
    if (!socket) return;
    socket.on('confirm connection', () => {
      setIsSocketConected(true);
    });
    return () => socket.off('confirm connection');
  }, [socket]);

  return (
    <SocketContecst.Provider value={{ socket, isSocketConected }}>
      {children}{' '}
    </SocketContecst.Provider>
  );
}
