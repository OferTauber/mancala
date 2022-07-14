import Pit from '../pit/pit';
import Bean from '../bean/bean';

export const GameBord = ({ data, onPlayersMove, userTurn }) => {
  const doNothing = (arg) => void arg;
  return (
    <div className="game-bord">
      <Bank beans={data.opponentBank} owner="opponent" />
      <div className={`pist-section ${userTurn && 'active'}`}>
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
      <Bank beans={data.userBank} owner="user" />
    </div>
  );
};

export const Bank = ({ beans, owner }) => {
  const mapBeans = () => {
    const beansArr = [];
    for (let i = 0; i < beans; i++) {
      beansArr.push(<Bean key={i} width={4.5} higet={12} />);
    }
    return beansArr;
  };

  return (
    <div className={`bank-wraper ${owner}`}>
      <div className="bank">{mapBeans()}</div>
      <div className="bank-count">{beans}</div>
    </div>
  );
};

export const PitsLine = ({ data, owner, onPlayersMove }) => {
  const mapPits = () => {
    return data.map((pit, index) => {
      return (
        <Pit
          key={index}
          beans={pit}
          pitNum={index}
          onPlayersMove={onPlayersMove}
        />
      );
    });
  };

  return <div className={`pits-line ${owner}`}>{mapPits()}</div>;
};
