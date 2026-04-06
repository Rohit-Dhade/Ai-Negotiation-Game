export const advanceRound = (game) => {
  game.currentRound += 1;
  return game.save();
};

export const checkGameStatus = ({ game, accepted, price }) => {
  const { minPrice } = game.aiConfig;

  if (accepted || price <= minPrice) {
    return "completed";
  }

  if (game.currentRound >= game.maxRounds) {
    return "failed";
  }

  return "ongoing";
};
