import Game from "../../models/Game.js";
import { createGameInstance } from "./game.factory.js";
import {
  increamentRound,
  isMaxRoundsReached,
  markGameAsCompleted,
  markGameAsFailed,
} from "./game.state.js";

export const startGame = async ({ userId, product }) => {
  const game = await createGameInstance({ userId, product });
  return game;
};

export const getGameById = async (sessionId) => {
  const game = await Game.findById(sessionId);

  if (!game) {
    throw new Error("Game not found");
  }
  return game;
};

export const advanceRound = async (game) => {
  increamentRound(game);

  if (isMaxRoundsReached(game)) {
    return markGameAsFailed(game);
  }
  await game.save();
  return game;
};

export const completeGame = async (game, finalPrice) => {
  markGameAsCompleted(game, finalPrice);
  await game.save();
  return game;
};
