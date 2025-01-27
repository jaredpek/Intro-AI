import { genAIEmbedding } from "@/lib/genAI";
import { NextResponse } from "next/server";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import MongoDbClient from "@/lib/mongo.js";

// Index Configuration
const indexConfig = {
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 768,
      "similarity": "euclidean"
    }
  ]
}

export const POST = async (req) => {
  try {
    // initialise profile and split loaded text into chunks
    const loader = new TextLoader("src/app/api/embed/profile.txt");
    const profile = await loader.load();
    const splitter = new MarkdownTextSplitter({
      chunkSize: 2500, chunkOverlap: 0, keepSeparator: true
    })
    const chunks = splitter.splitDocuments(profile);
    
    // remove the old collection
    const database = MongoDbClient.db(process.env.MONGODB_DB);
    await database.dropCollection(process.env.MONGODB_COLLECTION);

    // generate vector embeddings on provided documents and save to collection
    const vectorStore = new MongoDBAtlasVectorSearch(genAIEmbedding, {
      collection: database.collection(process.env.MONGODB_COLLECTION),
      textKey: "text", embeddingKey: "embedding",
    });
    const result = vectorStore.addDocuments(await chunks);

    const response = {
      chunks: {
        data: await chunks,
        count: (await chunks).length
      },
      documents: {
        count: (await result).length
      },
    }
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error generating vector embeddings from profile" },
      { status: 401 }
    );
  }
};
