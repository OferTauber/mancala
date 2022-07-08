import { useState } from 'react';
import './game.css';
import { GameBord } from './game_bord/game_bord';
import {
  playersMove,
  generateInitGame,
  areBeansToSteal,
  stealBeans,
} from '../../utils/game_moves';

const Game = (/* user */) => {
  const [gameData, setGameData] = useState(generateInitGame());

  const onPlayersMove = (pitNum) => {
    if (gameData.userPits[pitNum].getBins() === 0) return;

    const { moveResalt, moveStatus } = playersMove(gameData, pitNum);
    setGameData(moveResalt);

    if (areBeansToSteal(moveResalt, moveStatus)) {
      setGameData(stealBeans(moveResalt, moveStatus));
    }
  };

  if (!gameData.userPits || !gameData.userPits[0]) return;

  return (
    <div className="game">
      <div className="player opponent">
        <div className="title">Omri</div>
      </div>
      <GameBord data={gameData} onPlayersMove={onPlayersMove} />
      <div className="player user ">
        <div className="title">You</div>
      </div>
    </div>
  );
};

export default Game;
