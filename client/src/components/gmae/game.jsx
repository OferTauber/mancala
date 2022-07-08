import './game.css';
// import Pit from './pit/pit';

const Game = (/* user */) => {
  return (
    <div className="game">
      <div className="player oponet">
        <div className="title">Omri</div>
      </div>
      <GameBord />
      <div className="player user ">
        <div className="title">You</div>
      </div>
    </div>
  );
};

export default Game;

const GameBord = (/* Data */) => {
  const onPlayersMove = (pitNum) => {
    console.log(pitNum);
  };
  const doNothing = (arg) => void arg;

  return (
    <div className="game-bord">
      <Bank owner="oponet" numOfBins={3} />
      <div className="pist-section">
        <PitsLine
          owner="oponet"
          binsArr={[4, 4, 4, 4, 4, 4]}
          onPlayersMove={doNothing}
        />
        <PitsLine
          owner="user"
          binsArr={[4, 4, 4, 4, 4, 4]}
          onPlayersMove={onPlayersMove}
        />
      </div>
      <Bank owner="user" numOfBins={3} />
    </div>
  );
};

const Bank = ({ owner, numOfBins }) => {
  return (
    <div className={`bank-wraper ${owner}`}>
      <div className="bank">{numOfBins}</div>
    </div>
  );
};

const PitsLine = ({ binsArr, owner, onPlayersMove }) => {
  const mapPits = () => {
    return binsArr.map((pit, index) => {
      return <Pit key={index} numOfBeans={pit} onPlayersMove={onPlayersMove} />;
    });
  };
  return <div className={`pits-line ${owner}`}>{mapPits()}</div>;
};

const Pit = ({ numOfBeans }) => {
  return <div className="pit">{numOfBeans}</div>;
};

function PitObj(bins, owner) {
  this.bins = bins;
  this.owner = owner;
  this.next = undefined;
}

const generateBord = () => {
  const userPits = [];
};
