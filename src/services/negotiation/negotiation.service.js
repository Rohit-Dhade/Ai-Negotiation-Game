import { analyzeIntent } from "./intent.analyzer.js";
import { calculateNextPrice } from "./price.engine.js";
import { applyStrategy } from "./strategy.handler.js";
import { advanceRound, checkGameStatus } from "./round.manager.js";
import { buildPrompt } from "../ai/prompt.builder.js";
import { generateAIResponse } from "../ai/ai.service.js";
import { parseAIResponse } from "../ai/response.parser.js";
import { updateLeaderBoard } from "../leaderboard/leaderboard.service.js";

export const processUserMessage = async ({ game, userMessage }) => {
  const intent = analyzeIntent(userMessage);

  const { nextPrice, accepted } = calculateNextPrice(game, intent);
  const {modifiedPrice, tone } = applyStrategy({
    game,
    price: nextPrice,
    intent,
  });

  await advanceRound(game);

  const status = checkGameStatus({ game, accepted, price: modifiedPrice });

  game.currentPrice = modifiedPrice;
  game.status = status;

  const prompt = buildPrompt({ game, tone, userMessage, price: modifiedPrice });
  const rawAIResponse = await generateAIResponse(prompt);
  const aiText = parseAIResponse(rawAIResponse);

  game.messages.push(
    { role: "user", text: userMessage },
    { role: "ai", text: aiText },
  );

  // console.log("Final price before save:", modifiedPrice);
  await game.save();

  return {
    aiResponse: aiText,
    price: modifiedPrice,
    status,
    tone,
    round: game.currentRound,
  };
};
