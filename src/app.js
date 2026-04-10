import express from "express";
import authRouter from "./routes/auth.routes.js";
import gameRouter from "./routes/game.routes.js";
import messageRouter from "./routes/message.routes.js";
import leaderboardRouter from "./routes/leaderboard.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/auth", authRouter);
app.use("/api/game", gameRouter);
app.use("/api/messages", messageRouter);
app.use("/api/leaderboard", leaderboardRouter);

export default app;
