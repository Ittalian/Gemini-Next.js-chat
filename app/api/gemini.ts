//chat.ts
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export const run = async (prompt: string) => {
// Text
const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    maxOutputTokens: 2048,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
  });

  // Batch and stream are also supported
  const res = await model.invoke([
    [
      "human",
      prompt,
    ],
  ]);

  console.log(res.content);
  return res.content;

};