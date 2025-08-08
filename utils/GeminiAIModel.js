// lib/gemini.js or wherever appropriate

import { GoogleGenerativeAI } from "@google/generative-ai";

// Load your API key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Configuration for the model
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Create a chat session using the appropriate model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // or "gemini-1.5-pro"
  generationConfig,
});

export async function AIResponse(InputPrompt) {
  try {
    const result = await model.generateContent(InputPrompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error in Gemini AIResponse:", error);
    return "Failed";
  }
}

export const chatSessionPromise = model.startChat();