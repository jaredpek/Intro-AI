import { genAIEmbedding } from "@/lib/genAI";
import { NextResponse } from "next/server";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import MongoDbClient from "@/lib/mongo.js";

export const POST = async (req) => {
  try {
    // initialise profile and text splitter
    const loader = new TextLoader("src/app/api/embed/profile.txt");
    const profile = await loader.load();
    const splitter = new MarkdownTextSplitter({
      chunkSize: 1000, chunkOverlap: 0,
    })
    const chunks = await splitter.splitDocuments(profile);
    
    // reset vector embedding database
    const database = MongoDbClient.db(process.env.MONGODB_DB);
    database.dropCollection(process.env.MONGODB_COLLECTION);

    // initialise vector search index and add documents
    const vectorStore = new MongoDBAtlasVectorSearch(genAIEmbedding, {
      collection: database.collection(process.env.MONGODB_COLLECTION),
      indexName: "default",
      textKey: "text",
      embeddingKey: "embedding",
    });
    const result = await vectorStore.addDocuments(chunks);
    const response = {
      chunks: chunks.length,
      documents: result.length,
    }
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error generating response" },
      { status: 401 }
    );
  }
};
