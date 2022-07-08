import { useEffect } from 'react';
import { useState } from 'react';
import {
  playersMove,
  generateInitGame,
  areBeansToSteal,
  stealBeans,
} from '../../utils/game_moves';
import PitClass from '../../utils/pit_class';

import './game.css';
// import Pit from './pit/pit';

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

const GameBord = ({ data, onPlayersMove }) => {
  const doNothing = (arg) => void arg;

  return (
    <div className="game-bord">
      <Bank bins={data.opponentBank} owner="opponent" />
      <div className="pist-section">
        <PitsLine
          onPlayersMove={doNothing}
          owner="opponent"
          data={data.opponentPits}
        />
        <PitsLine
          onPlayersMove={onPlayersMove}
          owner="user"
          data={data.userPits}
        />
      </div>
      <Bank bins={data.userBank} owner="user" />
    </div>
  );
};

const Bank = ({ bins, owner }) => {
  return (
    <div className={`bank-wraper ${owner}`}>
      <div className="bank">{bins.getBins()}</div>
    </div>
  );
};

const PitsLine = ({ data, owner, onPlayersMove }) => {
  const mapPits = () => {
    return data.map((pit, index) => {
      return (
        <Pit
          key={index}
          pit={new PitClass(pit.getBins(), pit.getDelay())}
          pitNum={index}
          onPlayersMove={onPlayersMove}
        />
      );
    });
  };
  return <div className={`pits-line ${owner}`}>{mapPits()}</div>;
};

const Pit = ({ pit, onPlayersMove, pitNum }) => {
  const [bins, setBins] = useState(pit.getBins());

  useEffect(() => {
    setBins(pit.getBins());
  }, [pit]);

  if (!pit) return;

  return (
    <div
      className="pit"
      onClick={() => {
        onPlayersMove(pitNum);
      }}
    >
      {bins}
    </div>
  );
};
