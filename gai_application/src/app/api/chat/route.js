import { genAIEmbedding, genAIModel, genInstruction } from "@/lib/genAI";
import { NextResponse } from "next/server";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import MongoDbClient from "@/lib/mongo";

export const POST = async (req) => {
  // initialise vector search index retriever
  const vectorStore = new MongoDBAtlasVectorSearch(genAIEmbedding, {
    collection: MongoDbClient.db(process.env.MONGODB_DB).collection(process.env.MONGODB_COLLECTION),
    indexName: process.env.MONGODB_VECTOR, textKey: "text", embeddingKey: "embedding", 
  });
  const retriever = vectorStore.asRetriever(4);

  // generate response based on provided message and chat context
  try {
    const { history, message } = await req.json();
    const context = await retriever.invoke(message, {});
    const instruction = `
      ${genInstruction}
      Here are the provided contexts:
      ${context.map((chunk, i) => `Context ${i + 1}: ${chunk.pageContent}\n`)}
    `;
    const chat = genAIModel.invoke([
      ["system", instruction],
      ...history,
      ["human", message],
    ]);
    const response = (await chat).content;
    return NextResponse.json({ response, context }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 401 }
    );
  }
};
