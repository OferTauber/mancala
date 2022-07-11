export const gameMoveRecursive = async (
  data,
  setData,
  clickedPit,
  player,
  line,
  setWinner
) => {
  const organizedData = organizeDataByPlayer(data, player);
  const beansInHand = organizedData[line][clickedPit];
  organizedData[line][clickedPit] = 0;

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
    setTimeout(() => {
      gameOver(
        REorganizeDataByPlayer(organizedData, player),
        setData,
        5,
        setWinner
      );
    }, 500);
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
  console.log(organizedData);
  return organizedData.closePits.every((pit) => pit === 0);
};

const gameOver = async (data, setData, i, setWinner) => {
  if (i < 0) {
    let winner = 'user';
    if (data.userBank === data.opponentBank) winner = 'tie';
    if (data.userBank < data.opponentBank) winner = 'opponent';
    setWinner(winner);
    return;
  }

  await sleep(250);
  data.userBank += data.userPits[i];
  data.userPits[i] = 0;

  data.opponentBank += data.opponentPits[i];
  data.opponentPits[i] = 0;
  setData(data);
  gameOver({ ...data }, setData, i - 1, setWinner);
};

const gameLoopRecursive = async (
  organizedData,
  setData,
  clickedPit,
  line,
  beansInHand,
  player
) => {
  await sleep(200);

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
