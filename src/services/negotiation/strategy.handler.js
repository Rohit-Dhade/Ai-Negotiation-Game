export const applyStrategy = ({ game, price, intent }) => {
  const strategy = game.aiConfig.strategy;

  let modifiedPrice = price;
  let tone = "neutral";

  switch (strategy) {
    case "aggressive":
      modifiedPrice = price * 0.99;
      tone = "firm";
      break;

    case "friendly":
      modifiedPrice = price * 0.97;
      tone = "friendly";
      break;

    case "emotional":
      if (intent.type === "emotional") {
        modifiedPrice = price * 0.94;
        tone = "soft";
      }
      break;

    default:
      break;
  }

  return { modifiedPrice: Math.floor(modifiedPrice), tone };
};
