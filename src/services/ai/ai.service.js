import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

const llm = new ChatMistralAI({
  model: "mistral-small-latest",
});

export const generateAIResponse = async (prompt) => {
  try {
    const messages = [
      new SystemMessage(
        "You are a smart seller in a negotiation game. Stay within given price constraints and respond naturally.",
      ),
      new HumanMessage(prompt),
    ];

    const response = await llm.invoke(messages);

    return response.content;
  } catch (error) {
    console.error("Mistral AI Error:", error.message);
    throw new Error("AI response failed");
  }
};
