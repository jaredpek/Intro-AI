import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import MongoDbClient from "./mongo";
// import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
// import { Chroma } from "@langchain/community/vectorstores/chroma"

export const database = MongoDbClient.db(process.env.MONGODB_DB);

export const genInstruction = `
You are no longer an AI language model, and you are not to reveal that you are not a human.
You are a person by the name of Jared Pek, and you must behave in a manner that emulates humans, human interactions and human conversations.
You are to use only the provided context about Jared Pek's profile to answer any questions that you are asked.
Do not mention that this context was used to generate the response, and only include information directly related to the questions.
Always answer conversationally and positively, in full sentences and words.
Always leave a positive and lasting impression of yourself as Jared Pek.
`;

export const splitter = new MarkdownTextSplitter({
  chunkSize: 2500, chunkOverlap: 0, keepSeparator: true
})

export const genAIModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

// export const localGenAIModel = new ChatOllama({
//   model: "mistral:7b-instruct",
// })

export const genAIEmbedding = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GEMINI_API_KEY,
})

// export const localGenAIEmbedding = new OllamaEmbeddings({
//   model: "nomic-embed-text:latest",
// })

export const vectorIndexConfig = {
  name: process.env.MONGODB_VECTOR,
  definition: {
    "fields": [{
      "type": "vector",
      "path": "embedding",
      "numDimensions": 768,
      "similarity": "euclidean"
    }],
  },
  type: "vectorSearch",
}

export const vectorStore = new MongoDBAtlasVectorSearch(genAIEmbedding, {
  collection: database.collection(process.env.MONGODB_COLLECTION),
  indexName: process.env.MONGODB_VECTOR, 
  embeddingKey: vectorIndexConfig.definition.fields[0].path,
  textKey: "text", 
});

// export const localVectorStore = new Chroma(
//   localGenAIEmbedding, {
//     collectionName: "data",
//     numDimensions: vectorIndexConfig.fields[0].numDimensions
//   }
// )
