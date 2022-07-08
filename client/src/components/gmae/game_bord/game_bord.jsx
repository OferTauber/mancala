import Pit from '../pit/pit';
import PitClass from '../../../utils/pit_class';

export const GameBord = ({ data, onPlayersMove }) => {
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

export const Bank = ({ bins, owner }) => {
  return (
    <div className={`bank-wraper ${owner}`}>
      <div className="bank">{bins.getBins()}</div>
    </div>
  );
};

export const PitsLine = ({ data, owner, onPlayersMove }) => {
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
