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
  const [freezeGame, setFreezeGame] = useState(false);
  const [userTurn, setUserTurn] = useState(true);

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

  useEffect(() => {
    if (!socket) return;
    socket.on('opponent-turn-end', () => {
      setUserTurn(true);
    });
    return () => socket.off('opponent-turn-end');
  });

  const onOpponentMove = (pitNum) => {
    gameMove(gameData, setGameData, pitNum, 'opponent', 'closePits');
  };

  const onUserMove = async (pitNum) => {
    if (freezeGame || !userTurn) return;
    try {
      setFreezeGame(true);
      socket.emit('move', pitNum);
      const turnStatus = await gameMove(
        gameData,
        setGameData,
        pitNum,
        'user',
        'closePits'
      );
      handelTurnStatus(turnStatus);
    } catch (e) {
      console.error(e);
    }
    setFreezeGame(false);
  };

  const handelTurnStatus = (turnStatus) => {
    if (turnStatus === 'another turn') {
      displatAnotherTurnMassage();
    }
    if (turnStatus === 'switch turns') {
      setUserTurn(false);
      socket.emit('switch');
    }
  };

  const displatAnotherTurnMassage = () => {
    // TODO
    console.log('t!');
  };

  const notMyTurn = () => {
    setUserTurn(false);
  };

  if (!gameData || !gameData.userPits) return;

  return (
    <div className="game">
      <div className="temp">
        <button onClick={notMyTurn}>notMyTurn</button>
      </div>
      <div className={`player opponent ${!userTurn && 'active'}`}>
        <div className="title">Omri</div>
      </div>
      <GameBord
        data={gameData}
        onPlayersMove={onUserMove}
        userTurn={userTurn}
      />
      <div className={`player user ${userTurn && 'active'}`}>
        <div className="title">You</div>
      </div>
    </div>
  );
};

export default Game;
