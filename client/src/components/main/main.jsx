import Navbar from './navbar/navbar';
import Game from '../gmae/game';
import { SocketProvider } from '../../contecst/socket_provider';

const Main = (/* user */) => {
  return (
    <SocketProvider>
      <Navbar />
      <Game />
    </SocketProvider>
  );
};

export default Main;
