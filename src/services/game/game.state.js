export const increamentRound = (game) => {
  game.currentRound += 1;
  return game.save();
};

export const isMaxRoundsReached = (game) => {
  return game.currentRound >= game.maxRounds;
};

export const markGameAsCompleted = (game, finalPrice) => {
  game.status = "completed";
  game.finalPrice = finalPrice;
  return game.save();
};

export const markGameAsFailed = (game) => {
  game.status = "failed";
  return game.save();
};
