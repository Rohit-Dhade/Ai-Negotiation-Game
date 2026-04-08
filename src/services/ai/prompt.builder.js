export const buildPrompt = ({ game, tone, userMessage, price }) => {
  const { strategy, minPrice, targetPrice } = game.aiConfig;

  const history = game.messages
    .slice(-5)
    .map((msg) => `${msg.role}: ${msg.text}`)
    .join("\n");

  return `
You are a ${strategy} seller negotiating a product.

STRICT RULES:
- Never go below ₹${minPrice}
- Try to stay near ₹${targetPrice}
- Current round: ${game.currentRound}/${game.maxRounds}

Tone:
- ${tone}

Conversation so far:
${history}

User just said:
"${userMessage}"

Your target response price: ₹${price}

Instructions:
- Respond like a real human seller
- Be persuasive and natural
- Include the price ₹${price} clearly in your response
- Keep response short (1-3 sentences)
- Do NOT go below ₹${minPrice}

Respond now:
`;
};
