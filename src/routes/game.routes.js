import express from "express";
import { StartGame, GetGame } from "../controllers/game.controller.js";

const gameRouter = express.Router();

gameRouter.post("/start", StartGame);
gameRouter.get("/:sessionId", GetGame);

export default gameRouter;
