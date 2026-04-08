import { startGame } from "../services/game/game.service.js";
import { getGameById } from "../services/game/game.service.js";

export const StartGame = async (req, res) => {
  try {
    const { userId, product } = req.body;
    const game = await startGame({ userId, product });
    res.status(201).json({
      success: true,
      message: "Game started successfully",
      data: game,
      gameId: game._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetGame = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const game = await getGameById(sessionId);
    res.status(200).json({
      success: true,
      message: "Game retrieved successfully",
      data: game,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
