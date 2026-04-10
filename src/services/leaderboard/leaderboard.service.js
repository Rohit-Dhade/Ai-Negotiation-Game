import Leaderboard from "../../models/leaderboard.model.js";

export const updateLeaderBoard = async ({ userId, finalPrice, game }) => {
  const existing = await Leaderboard.findOne({ userId });

  if (!existing) {
    await Leaderboard.create({
      userId,
      bestPrice: finalPrice,
      gameId: game._id,
      product: game.product,
    });
  } else {
    if (finalPrice < existing.bestPrice) {
      existing.bestPrice = finalPrice;
      existing.gameId = game._id;
      existing.product = game.product;
      await existing.save();
    }
  }
};

export const getLeaderBoard = async () => {
  const players = await Leaderboard.find().sort({ bestPrice: 1 }).limit(10);

  return players;
};
