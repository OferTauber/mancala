import PitClass from './pit_class';

//*  ======================= Public - exported =======================
export const playersMove = (data, selectedPitNum) => {
  const move = initialMove({ ...data }, selectedPitNum);

  const toReturn = {
    moveResalt: move.moveResalt,
    moveStatus: undefined,
  };

  //* If a player's turn ends at the bank he gets another turn
  if (move.lastPit === 'bank') {
    toReturn.moveStatus = 'Another-turn';

    //* If a player's turn ends in his well - he steals the beans from the opponent's parallel well
  } else if (move.lastPit !== 'opponent') {
    toReturn.moveStatus = 'Beans to steal from ' + move.lastPit;
  }

  return toReturn;
};

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

export const areBeansToSteal = ({ opponentPits, userPits }, moveStatus) => {
  if (!moveStatus.startsWith('Beans to steal from')) return false; // Did the move ended in the user's side?

  const userLastPit = moveStatus.slice(-1) * 1;
  const pitToStealFrom = 5 - userLastPit;

  if (1 !== userPits[userLastPit].getBins()) return false; // Did the move ended up in an empty pit? (now have 1 bean)

  return 0 !== opponentPits[pitToStealFrom].getBins(); // Is ther anything to steal?!
};

export const stealBeans = (
  { userPits, opponentPits, userBank, opponentBank },
  moveStatus
) => {
  const userLastPit = moveStatus.slice(-1) * 1;
  const pitToStealFrom = 5 - userLastPit;

  const beansToSteal =
    opponentPits[pitToStealFrom].getBins() + userPits[userLastPit].getBins();

  opponentPits[pitToStealFrom].setBins(0);
  userPits[userLastPit].setBins(0);
  userBank.setBins(userBank.getBins() + beansToSteal);

  return { userPits, opponentPits, userBank, opponentBank };
};

//* ======================= Static - Local use only =======================
const initialMove = (
  { userPits, opponentPits, userBank, opponentBank },
  selectedPitNum
) => {
  let binsInHand = userPits[selectedPitNum].getBins();
  userPits[selectedPitNum].setBins(0);
  let i = selectedPitNum + 1;
  let lastPit = i;
  let delay = 1;

  while (binsInHand) {
    for (; i < 6 && binsInHand; i++) {
      binsInHand--;
      delay = updatePitAndIncDelay(userPits[i], delay);
      lastPit = i + '';
    }

    if (binsInHand) {
      delay = updatePitAndIncDelay(userBank, delay);
      binsInHand--;
      lastPit = 'bank';
    }

    for (i = 0; i < 6 && binsInHand; i++) {
      binsInHand--;
      delay = updatePitAndIncDelay(opponentPits[i], delay);
      lastPit = 'opponent';
    }
    i = 0;
  }

  const toReturn = {
    moveResalt: { userPits, opponentPits, userBank, opponentBank },
    lastPit,
  };

  return toReturn;
};

const updatePitAndIncDelay = (pit, delay) => {
  pit.incrementBins();
  pit.setDelay(delay);
  return delay + 1;
};
