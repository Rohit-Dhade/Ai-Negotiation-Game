import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

// Initialize the LLM instances
const llm = new ChatMistralAI({
  model: "mistral-small-latest",
});

