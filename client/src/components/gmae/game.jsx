import { useState, useEffect } from 'react';
import './game.css';

import { GameBord } from './game_bord/game_bord';
import { gameMoveRecursive } from '../../utils/game_moves';
import { useSocket } from '../../contecst/socket_provider';

const Game = (/* user */) => {
  const [gameData, setGameData] = useState({
    // userPits: [4, 4, 4, 4, 4, 4],
    userPits: [0, 0, 0, 0, 0, 1],
    userBank: 0,
    opponentPits: [4, 4, 4, 4, 4, 4],
    opponentBank: 0,
  });
  const [freezeGame, setFreezeGame] = useState(false);
  const [userTurn, setUserTurn] = useState(true);
  const [winner, setWinner] = useState('');
  const [opponentName, setOpponentName] = useState('');

  const socket = useSocket();

  //! Temp!
  useEffect(() => {
    if (!socket) return;
    socket.on('massage', printMassage);
    return () => socket.off('massage');
  }, [socket]);

  //! Temp!
  useEffect(() => {
    setOpponentName('Omri');
  }, []);

  const printMassage = (text) => {
    console.log(text);
  };

  //* Opponent move
  useEffect(() => {
    if (!socket) return;
    socket.on('opponent-move', onOpponentMove);
    return () => socket.off('opponent-move');
  });
  const onOpponentMove = (pitNum) => {
    gameMoveRecursive(
      gameData,
      setGameData,
      pitNum,
      'opponent',
      'closePits',
      setWinner
    );
  };

  //* Opponent turn end
  useEffect(() => {
    if (!socket) return;
    socket.on('opponent-turn-end', () => {
      setUserTurn(true);
    });
    return () => socket.off('opponent-turn-end');
  });

  //* User move
  const onUserMove = async (pitNum) => {
    if (freezeGame || !userTurn) return;
    try {
      setFreezeGame(true);
      socket.emit('move', pitNum);
      const turnStatus = await gameMoveRecursive(
        gameData,
        setGameData,
        pitNum,
        'user',
        'closePits',
        setWinner
      );
      handelTurnStatus(turnStatus);
    } catch (e) {
      console.error(e);
    }
    setFreezeGame(false);
  };

  const handelTurnStatus = (turnStatus) => {
    switch (turnStatus) {
      case 'switch turns':
        setUserTurn(false);
        socket.emit('switch');
        break;
      case 'game over':
        console.log('gameOver');
        //todo
        break;
      case 'another turn':
      default:
        displatAnotherTurnMassage();
        break;
    }
  };

  const displatAnotherTurnMassage = () => {
    // TODO
    console.log('t!');
  };

  //! Temp!
  const notMyTurn = () => {
    setUserTurn(false);
  };

  if (!gameData || !gameData.userPits) return;

  return (
    <div className="game">
      <div className="temp">
        <button onClick={notMyTurn}>notMyTurn</button>
      </div>
      {winner && <Winner winner={winner} />}
      <div className={`player opponent ${!userTurn && 'active'}`}>
        <div className="title">{opponentName}</div>
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

const Winner = ({ winner }) => {
  if (winner === 'tie') {
    return (
      <dialog open>
        <h2>It's a tie!</h2>
      </dialog>
    );
  } else {
    return (
      <dialog open>
        <h2>You {winner === 'user' ? 'Win!' : 'Lose!'} </h2>
      </dialog>
    );
  }
};
