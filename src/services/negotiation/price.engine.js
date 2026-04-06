export const calculateNextPrice = (game, intent) => {
  const currentPrice = game.currentPrice;

  const { minPrice, targetPrice } = game.aiConfig;

  let nextPrice = currentPrice;
  let accepted = false;

  if (intent.type === "price_offer") {
    const offerPrice = intent.price;

    if (offerPrice >= targetPrice) {
      nextPrice = offerPrice;
      accepted = true;
    } else if (offerPrice >= minPrice) {
      nextPrice = Math.floor((currentPrice + offerPrice) / 2);
    } else {
      nextPrice = Math.max(currentPrice * 0.97, minPrice);
    }
  } else {
    nextPrice = currentPrice * 0.97;
  }

  if (intent.type === "emotional") {
    nextPrice *= 0.95;
  }

  nextPrice = Math.max(Math.floor(nextPrice), minPrice);

  if (nextPrice <= targetPrice * 0.95) {
    accepted = true;
  }

  return { nextPrice, accepted };
};
