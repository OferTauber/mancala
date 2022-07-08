import { useState, useEffect } from 'react';

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

export default Pit;
