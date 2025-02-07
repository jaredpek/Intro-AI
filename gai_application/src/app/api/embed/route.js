import { 
  database, splitter, vectorStore ,
  // localVectorStore, 
} from "@/lib/genAI";
import { NextResponse } from "next/server";
import { TextLoader } from "langchain/document_loaders/fs/text";

export const POST = async (req) => {
  try {
    // initialise profile and split loaded text into chunks
    const loader = new TextLoader("src/app/api/embed/profile.txt");
    const profile = await loader.load();
    const chunks = splitter.splitDocuments(profile);
    
    // remove the old collection
    await database.dropCollection(process.env.MONGODB_COLLECTION);

    // generate vector embeddings on provided documents and save to collection
    // const result = localVectorStore.addDocuments(await chunks);
    const result = vectorStore.addDocuments(await chunks);

    const response = {
      chunks: {
        data: await chunks,
        count: (await chunks).length,
      },
      documents: {
        count: (await result).length,
      },
    };
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error generating vector embeddings from profile" },
      { status: 401 },
    );
  }
};
