import express from "express";
import { SendMessageController } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/:id/messages", SendMessageController);

export default messageRouter;
