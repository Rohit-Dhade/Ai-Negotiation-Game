import { analyzeIntent } from "./intent.analyzer.js";
import { calculateNextPrice } from "./price.engine.js";
import { applyStrategy } from "./strategy.handler.js";
import { advanceRound, checkGameStatus } from "./round.manager.js";

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

  game.message.push(
    { role: "user", content: UserMessage },
    { role: "ai", content: `AI offers $${modifiedPrice} with a ${tone} tone.` },
  );
  await game.save();

  return {
    aiResponse: `I can offer you ₹${modifiedPrice}.`,
    price: modifiedPrice,
    status,
    tone,
    round: game.currentRound,
  };
};
