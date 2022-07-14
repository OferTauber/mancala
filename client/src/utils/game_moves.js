export const gameMove = async (data, setData, clickedPit, player) => {
  return await gameMoveRecursive(
    data,
    setData,
    clickedPit,
    player,
    'closePits'
  );
};

const gameMoveRecursive = async (data, setData, clickedPit, player, line) => {
  const organizedData = organizeDataByPlayer(data, player);
  const beansInHand = organizedData[line][clickedPit];
  organizedData[line][clickedPit] = 0;
  await sleep(100);

  setData(REorganizeDataByPlayer({ ...organizedData }, player));

  const res = await gameLoopRecursive(
    organizedData,
    setData,
    clickedPit + 1,
    line,
    beansInHand,
    player
  );

  if (isGameOver(organizedData)) {
    return 'game over';
  }
  if (res.line === 'activBank') {
    return 'another turn';
  }
  if (organizedData[res.line][res.clickedPit] !== 1) {
    return await gameMoveRecursive(
      REorganizeDataByPlayer(organizedData, player),
      setData,
      res.clickedPit,
      player,
      res.line
    );
  } else {
    return 'switch turns';
  }
};

const isGameOver = (organizedData) => {
  return (
    organizedData.closePits.every((pit) => pit === 0) ||
    organizedData.farPits.every((pit) => pit === 0)
  );
};

export const gameOver = async ({ ...data }, setData, player) => {
  data[player + 'Bank']++;
  const res = await gameOverRecursive(data, setData, 5);
  sleep(100);
  return res;
};

const gameOverRecursive = async ({ ...data }, setData, i) => {
  if (i < 0) {
    if (data.userBank === data.opponentBank) return 'tie';
    if (data.userBank < data.opponentBank) return 'opponent';
    return 'user';
  }

  await sleep(200);
  data.userBank += data.userPits[i];
  data.userPits[i] = 0;

  data.opponentBank += data.opponentPits[i];
  data.opponentPits[i] = 0;

  setData({ ...data });
  return await gameOverRecursive(data, setData, i - 1);
};

const gameLoopRecursive = async (
  organizedData,
  setData,
  clickedPit,
  line,
  beansInHand,
  player
) => {
  await sleep(300);

  if (!beansInHand) {
    setData(REorganizeDataByPlayer(organizedData, player));
    // Recursive ends
    if (clickedPit <= 0) {
      line = line === 'farPits' ? 'activBank' : 'farPits';
    }
    return { line, clickedPit: clickedPit - 1 };
  }

  if (clickedPit === 6) {
    line = line === 'closePits' ? 'activBank' : 'closePits';
    clickedPit = 0;
  }

  if (line === 'activBank') {
    organizedData.activBank++;
    setData(REorganizeDataByPlayer(organizedData, player));
    return await gameLoopRecursive(
      organizedData,
      setData,
      0,
      'farPits',
      beansInHand - 1,
      player
    );
  }
  organizedData[line][clickedPit]++;
  setData(REorganizeDataByPlayer(organizedData, player));

  return await gameLoopRecursive(
    organizedData,
    setData,
    clickedPit + 1,
    line,
    beansInHand - 1,
    player
  );
};

const organizeDataByPlayer = (data, player) => {
  const { userPits, opponentPits, userBank, opponentBank } = { ...data };
  return {
    closePits: player === 'user' ? userPits : opponentPits,
    farPits: player !== 'user' ? userPits : opponentPits,
    activBank: player === 'user' ? userBank : opponentBank,
    inactivBank: player !== 'user' ? userBank : opponentBank,
  };
};

const REorganizeDataByPlayer = (data, player) => {
  const { closePits, farPits, activBank, inactivBank } = { ...data };
  return {
    userPits: player === 'user' ? closePits : farPits,
    opponentPits: player !== 'user' ? closePits : farPits,
    userBank: player === 'user' ? activBank : inactivBank,
    opponentBank: player !== 'user' ? activBank : inactivBank,
  };
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
