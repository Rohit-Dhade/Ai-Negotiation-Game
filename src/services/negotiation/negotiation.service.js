import { analyzeIntent } from "./intent.analyzer.js";
import { calculateNextPrice } from "./price.engine.js";
import { applyStrategy } from "./strategy.handler.js";
import { advanceRound, checkGameStatus } from "./round.manager.js";
import { buildPrompt } from "../ai/prompt.builder.js";
import { generateAIResponse } from "../ai/ai.service.js";
import { parseAIResponse } from "../ai/response.parser.js";

export const processUserMessage = async ({ game, UserMessage }) => {
  const intent = analyzeIntent(UserMessage);

  const { nextPrice, accepted } = calculateNextPrice(game, intent);
  const { price: modifiedPrice, tone } = applyStrategy({
    game,
    price: nextPrice,
    intent,
  });

  advanceRound(game);

  const status = checkGameStatus({ game, accepted, price: modifiedPrice });

  game.currentPrice = modifiedPrice;
  game.status = status;

  const prompt = buildPrompt({ game, tone, UserMessage, price: modifiedPrice });
  const rawAIResponse = await generateAIResponse(prompt);
  const aiText = parseAIResponse(rawAIResponse);

  game.message.push(
    { role: "user", text: UserMessage },
    { role: "ai", text: aiText },
  );
  await game.save();

  return {
    aiResponse: aiText,
    price: modifiedPrice,
    status,
    tone,
    round: game.currentRound,
  };
};
