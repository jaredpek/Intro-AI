import { genAIEmbedding } from "@/lib/genAI";
import { NextResponse } from "next/server";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import MongoDbClient from "@/lib/mongo.js";

export const POST = async (req) => {
  try {
    const directoryLoader = new DirectoryLoader("profile/", {
      ".pdf": (path) => new PDFLoader(path),
    });
    const docs = await directoryLoader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
    });
    const splitDocs = await textSplitter.splitDocuments(docs);
    const collection = MongoDbClient.db(process.env.MONGODB_DB).collection(
      process.env.MONGODB_COLLECTION
    );
    const vectorStore = new MongoDBAtlasVectorSearch(genAIEmbedding, {
      collection,
      indexName: "default",
      textKey: "text",
      embeddingKey: "embedding",
    });
    const result = await vectorStore.addDocuments(splitDocs);
    const response = {
      pdfs: docs.length,
      chunks: splitDocs.length,
      docs: result.length,
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
