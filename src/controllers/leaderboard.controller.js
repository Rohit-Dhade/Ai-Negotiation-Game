import { getLeaderBoard } from "../services/leaderboard/leaderboard.service.js";

export const getLeaderBoardController = async (req, res) => {
  try {
    const data = await getLeaderBoard();
    res.status(200).json({
      success: true,
      message: "Leaderboard retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
