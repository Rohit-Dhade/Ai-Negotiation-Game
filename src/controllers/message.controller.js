import { processUserMessage } from "../services/negotiation/negotiation.service.js";
import { getGameById } from "../services/game/game.service.js";

export const SendMessageController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;
    const game = await getGameById(sessionId);

    if (game.status !== "ongoing") {
      return res.status(400).json({ error: "Game already ended" });
    }
    const result = await processUserMessage({ game, userMessage: message });

    res.status(200).json({
      success: true,
      message: "Message processed successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
