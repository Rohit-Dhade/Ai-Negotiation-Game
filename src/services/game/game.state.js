export const increamentRound = async (game) => {
  game.currentRound += 1;
  return await game.save();
};

export const isMaxRoundsReached = (game) => {
  return game.currentRound >= game.maxRounds;
};

export const markGameAsCompleted = async (game, finalPrice) => {
  game.status = "completed";
  game.finalPrice = finalPrice;
  return await game.save();
};

export const markGameAsFailed = async (game) => {
  game.status = "failed";
  return await game.save();
};
