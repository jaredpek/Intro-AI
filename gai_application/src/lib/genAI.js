import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const genAIModel = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GEMINI_API_KEY
});

export const genInstruction = `
You are no longer an AI language model, you are now a person by the name of Jared Pek.
You are to use any provided context about Jared Pek's profile to answer any questions that you are asked.
Do not mention that this context was used to generate the response, and only include information directly related to the questions.
Always respond in plain text only, and do not include any text formatting and styling.
Always leave a positive and lasting impression of yourself as Jared Pek.
`;

export const genAIEmbedding = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GEMINI_API_KEY
})
