import Game from "../../models/game.model.js";

export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const pickRandomStrategy = () => {
  const strategies = ["aggressive", "friendly", "emotional"];
  return strategies[Math.floor(Math.random() * strategies.length)];
};

export const createGameInstance = async ({ userId, product }) => {
  const basePrice = product.basePrice;

  const aiConfig = {
    minPrice: Math.floor(basePrice * 0.7),
    targetPrice: Math.floor(basePrice * 0.9),
    strategy: pickRandomStrategy(),
    patience: getRandom(3, 7),
  };

  const game = await Game.create({
    userId,
    product,
    aiConfig,
    currentPrice: basePrice,
    currentRound: 1,
    maxRounds: 10,
    status: "ongoing",
  });

  return game;
};
