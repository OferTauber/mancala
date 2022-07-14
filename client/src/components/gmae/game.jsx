import { useState, useEffect } from 'react';
import './game.css';
import { GameBord } from './game_bord/game_bord';
import { gameMove, gameOver } from '../../utils/game_moves';
import { useSocket } from '../../contecst/socket_provider';

const Game = ({ userName, userId, gameRoom, restartGame }) => {
  const [gameData, setGameData] = useState({
    userPits: [4, 4, 4, 4, 4, 4],
    userBank: 0,
    opponentPits: [4, 4, 4, 4, 4, 4],
    opponentBank: 0,
  });
  const [freezeGame, setFreezeGame] = useState(false);
  const [userTurn, setUserTurn] = useState(userId !== gameRoom.firstPlayerId);
  const [massage, setMassage] = useState('');
  const [opponentDisconected, setOpponentDisconected] = useState(false);
  // const [opponentDisconected, setOpponentDisconected] = useState(true);

  const { socket } = useSocket();

  useEffect(() => {
    setMassage(
      userId !== gameRoom.firstPlayerId
        ? 'You starts'
        : `${gameRoom.opponent.name} starts`
    );
  }, [userId, gameRoom]);

  //* Opponent move
  useEffect(() => {
    if (!socket) return;
    socket.on('opponent-move', onOpponentMove);
    return () => socket.off('opponent-move');
  });
  const onOpponentMove = (pitNum) => {
    playerMove(pitNum, 'opponent');
  };

  //* Opponenet disconect
  useEffect(() => {
    const handelOpponentDIsconnect = (opponentId) => {
      if (opponentId === gameRoom.opponent.id) {
        console.log('Opponent has disconected');
        setOpponentDisconected(true);
      }
    };
    if (!socket) return;
    socket.on('opponent disconnected', handelOpponentDIsconnect);
    return () => socket.off('opponent disconnected');
  });

  //* User move
  const onUserMove = async (pitNum) => {
    if (freezeGame || !userTurn) return;
    try {
      setFreezeGame(true);
      socket.emit('move', { pitNum, room: gameRoom.room });
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
        switchTurn();
        break;
      case 'game over':
        onGameOver();
        break;
      case 'another turn':
      default:
        displatAnotherTurnMassage();
        break;
    }
  };

  const switchTurn = () => {
    const player = !userTurn ? 'Your' : gameRoom.opponent.name + "'s";
    setMassage(player + ' turn');
    setUserTurn(!userTurn);
  };

  const onGameOver = async () => {
    setFreezeGame(true);
    const res = await gameOver(
      { ...gameData },
      setGameData,
      userTurn ? 'user' : 'opponent'
    );
    setMassage('Game Over - ' + res);
  };

  const displatAnotherTurnMassage = () => {
    const player = userTurn ? 'You' : gameRoom.opponent.name;
    setMassage(player + ' have another turn');
  };

  if (!gameData || !gameData.userPits) return;

  return (
    <div
      className={`game full-screen centerd-column ${
        opponentDisconected && 'blure'
      }`}
    >
      <MassageBox massage={massage} />
      {opponentDisconected && (
        <OpponentHasLeft
          restartGame={restartGame}
          opponent={gameRoom.opponent.name}
        />
      )}
      {/* {winner && <Winner winner={winner} />} */}
      <div className="row">
        <div
          className={`player centerd-column blue opponent ${
            !userTurn && 'active'
          }`}
        >
          <div className="title">{gameRoom.opponent.name}</div>
        </div>
      </div>

      <GameBord
        data={gameData}
        onPlayersMove={onUserMove}
        userTurn={userTurn}
      />
      <div className="row row-revers">
        <div
          className={`player centerd-column blue user ${userTurn && 'active'}`}
        >
          <div className="title">{userName}</div>
        </div>
      </div>
    </div>
  );
};

export default Game;

const MassageBox = ({ massage }) => {
  const [displaydMassage, setDisplaydMassage] = useState('');
  useEffect(() => {
    setDisplaydMassage(massage);
    const timeOut = setTimeout(() => {
      setDisplaydMassage('');
      return () => {
        clearTimeout(timeOut);
      };
    }, 5000);
  }, [massage]);

  if (!displaydMassage) return;
  return (
    <dialog className="massage-box" open>
      {displaydMassage}
    </dialog>
  );
};

const OpponentHasLeft = ({ restartGame, opponent }) => {
  const { socket } = useSocket();
  return (
    <dialog className="disconnect centerd-column" open>
      <h2>Oh no!</h2> <h3>{opponent} has disconected!</h3>
      <button
        className="btn blue-font"
        onClick={() => {
          socket.emit('Find me an opponent');
          restartGame();
        }}
      >
        Look for new opponent
      </button>
    </dialog>
  );
};
