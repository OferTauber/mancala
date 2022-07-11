import { useState, useEffect } from 'react';
import './game.css';

import { GameBord } from './game_bord/game_bord';
import { gameMove } from '../../utils/game_moves';
import { useSocket } from '../../contecst/socket_provider';

const Game = (/* user */) => {
  const [gameData, setGameData] = useState({
    userPits: [4, 4, 4, 4, 4, 4],
    userBank: 0,
    opponentPits: [4, 4, 4, 4, 4, 4],
    opponentBank: 0,
  });

  //TODO const [userTurn, setUserTurn] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on('massage', printMassage);
    return () => socket.off('massage');
  }, [socket]);

  const printMassage = (text) => {
    console.log(text);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('opponent-move', onOpponentMove);
    return () => socket.off('opponent-move');
  });

  const onOpponentMove = (pitNum) => {
    gameMove(gameData, setGameData, pitNum, 'opponent', 'closePits');
  };

  const onUserMove = (pitNum) => {
    socket.emit('move', pitNum);
    gameMove(gameData, setGameData, pitNum, 'user', 'closePits');
  };

  if (!gameData || !gameData.userPits) return;

  return (
    <div className="game">
      <div className="player opponent">
        <div className="title">Omri</div>
      </div>
      <GameBord data={gameData} onPlayersMove={onUserMove} />
      <div className="player user ">
        <div className="title">You</div>
      </div>
    </div>
  );
};

export default Game;
