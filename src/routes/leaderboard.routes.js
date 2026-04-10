import express from "express";
import { getLeaderBoardController } from "../controllers/leaderboard.controller.js";

const LeaderboardRouter = express.Router();

LeaderboardRouter.get("/get-leaderboard", getLeaderBoardController);

export default LeaderboardRouter;
