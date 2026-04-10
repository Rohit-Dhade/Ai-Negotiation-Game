import Game from "../../models/game.model.js";
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
  await increamentRound(game);

  if (isMaxRoundsReached(game)) {
    return await markGameAsFailed(game);
  }
  return game;
};

export const completeGame = async (game, finalPrice) => {
  await markGameAsCompleted(game, finalPrice);
  return game;
};
