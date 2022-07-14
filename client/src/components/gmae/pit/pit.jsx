import './pit.css';
import Bean from '../bean/bean';

const Pit = ({ beans, onPlayersMove, pitNum }) => {
  const mapBeans = () => {
    const beansArr = [];
    for (let i = 0; i < beans; i++) {
      beansArr.push(<Bean key={i} width={4.5} higet={4.5} />);
    }
    return beansArr;
  };

  return (
    <div
      className="pit"
      onClick={() => {
        onPlayersMove(pitNum);
      }}
    >
      {mapBeans()}
      <div className="counter">{beans > 4 && beans}</div>
    </div>
  );
};

export default Pit;
