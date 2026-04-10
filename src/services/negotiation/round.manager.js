import { updateLeaderBoard } from "../leaderboard/leaderboard.service.js";

export const advanceRound = async (game) => {
  game.currentRound += 1;
  return await game.save();
};

export const checkGameStatus = async ({ game, accepted, price }) => {
  const { minPrice } = game.aiConfig;

  if (accepted || price <= minPrice) {
    await updateLeaderBoard({ userId: game.userId, finalPrice: price, game });
    return "completed";
  }

  if (game.currentRound >= game.maxRounds) {
    return "failed";
  }

  return "ongoing";
};
