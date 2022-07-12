import { useState, useEffect } from 'react';
import './game.css';

import { GameBord } from './game_bord/game_bord';
import { gameMove, gameOver } from '../../utils/game_moves';
import { useSocket } from '../../contecst/socket_provider';
const tempArr = [0, 0, 0, 0, 2, 1];

const Game = (/* user */) => {
  const [gameData, setGameData] = useState({
    // userPits: [4, 4, 4, 4, 4, 4],
    userPits: [...tempArr],
    userBank: 0,
    opponentPits: [4, 4, 4, 4, 4, 4],
    // opponentPits: [...tempArr],
    opponentBank: 0,
  });
  const [freezeGame, setFreezeGame] = useState(false);
  const [userTurn, setUserTurn] = useState(true);
  const [winner, setWinner] = useState('');
  const [opponentName, setOpponentName] = useState('');

  const socket = useSocket();

  // Temp! //* socket.on massage
  useEffect(() => {
    const printMassage = (text) => {
      console.log(text);
    };
    if (!socket) return;
    socket.on('massage', printMassage);
    return () => socket.off('massage');
  }, [socket]);

  // Temp! //*setOpponentName('Omri');
  useEffect(() => {
    setOpponentName('Omri');
  }, []);

  //* Opponent move
  useEffect(() => {
    if (!socket) return;
    socket.on('opponent-move', onOpponentMove);
    return () => socket.off('opponent-move');
  });
  const onOpponentMove = (pitNum) => {
    playerMove(pitNum, 'opponent');
  };

  //* User move
  const onUserMove = async (pitNum) => {
    if (freezeGame || !userTurn) return;
    try {
      setFreezeGame(true);
      socket.emit('move', pitNum);
      playerMove(pitNum, 'user');
    } catch (e) {
      console.error(e);
    }
    setFreezeGame(false);
  };

  const playerMove = async (pitNum, player) => {
    const moveStatus = await gameMove(gameData, setGameData, pitNum, player);
    handelTurnStatus(moveStatus);
  };

  const handelTurnStatus = async (turnStatus) => {
    switch (turnStatus) {
      case 'switch turns':
        togglTurn();
        break;
      case 'game over':
        onGameOver();
        break;
      case 'another turn':
      default:
        //TODO
        displatAnotherTurnMassage();
        break;
    }
  };

  const togglTurn = () => {
    setUserTurn(!userTurn);
  };

  const onGameOver = async () => {
    setFreezeGame(true);
    console.log(gameData);
    const res = await gameOver(
      { ...gameData },
      setGameData,
      userTurn ? 'user' : 'opponent'
    );
    setWinner(res);
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
