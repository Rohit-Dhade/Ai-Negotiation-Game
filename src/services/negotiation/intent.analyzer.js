export const analyzeIntent = (message) => {
  const lower = message.toLowerCase();

  const priceMatch = lower.match(/\d+/);
  if (priceMatch) {
    return { type: "price_offer", price: Number(priceMatch[0]) };
  }

  if (
    lower.includes("please") ||
    lower.includes("help") ||
    lower.includes("urgent")
  ) {
    return { type: "emotional" };
  }

  if (
    lower.includes("final") ||
    lower.includes("last offer") ||
    lower.includes("take it or leave it")
  ) {
    return { type: "pressure" };
  }

  return { type: "neutral" };
};
