import PitClass from './pit_class';

const playersMove = (data, selectedPitNum) => {
  const move = initialMove({ ...data }, selectedPitNum);

  const toReturn = {
    moveResalt: move.moveResalt,
    moveStatus: 1,
  };

  console.log(toReturn);
  console.log(toReturn.moveResalt);
  console.log(toReturn.moveResalt.userPits);
  return toReturn;
};

const initialMove = (
  { userPits, opponentPits, userBank, opponentBank },
  selectedPitNum
) => {
  let binsInHand = userPits[selectedPitNum].getBins();
  userPits[selectedPitNum].setBins(0);
  let i = selectedPitNum + 1;
  let lastPit = i;

  while (binsInHand) {
    for (; i < 6 && binsInHand; i++) {
      binsInHand--;
      userPits[i].incrementBins();
      lastPit = i + '';
    }

    if (binsInHand) {
      userBank.incrementBins();
      binsInHand--;
      lastPit = 'bank';
    }

    for (i = 0; i < 6 && binsInHand; i++) {
      binsInHand--;
      opponentPits[i].incrementBins();
      lastPit = 'opponent';
    }
    i = 0;
  }

  const toReturn = {
    moveResalt: { userPits, opponentPits, userBank, opponentBank },
    lastPit,
  };
  console.log('TO RETURN', toReturn.moveResalt.userPits);

  return toReturn;
};

export default playersMove;

export const generateInitGame = () => {
  const data = {
    userPits: [4, 4, 4, 4, 4, 4],
    userBank: new PitClass(0, 0),
    opponentPits: [4, 4, 4, 4, 4, 4],
    opponentBank: new PitClass(0, 0),
  };

  data.userPits = data.userPits.map((bins) => {
    return new PitClass(bins, 0);
  });
  data.opponentPits = data.opponentPits.map((bins) => {
    return new PitClass(bins, 0);
  });

  return data;
};
