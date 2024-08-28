import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { genAIEmbedding } from "./genAI.js";
import MongoDbClient from "./mongo.js";

const directoryLoader = new DirectoryLoader("profile/", {
  ".pdf": (path) => new PDFLoader(path),
});

const docs = await directoryLoader.load();

console.log(`Loaded ${docs.length} PDFs from the specified local directory.`);

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});

const splitDocs = await textSplitter.splitDocuments(docs);
console.log(
  `Split into ${splitDocs.length} text chunks using recursive character splitting.`
);

const collection = MongoDbClient.db(process.env.MONGODB_DB).collection(
  process.env.MONGODB_COLLECTION
);

const vectorStore = new MongoDBAtlasVectorSearch(genAIEmbedding, {
  collection,
  indexName: "default",
  textKey: "text",
  embeddingKey: "embedding",
});

// Insert the text chunks to the MongoDB Atlas vector store
const result = await vectorStore.addDocuments(splitDocs);

console.log(
  `Imported ${result.length} documents into the MongoDB Atlas vector store.`
);
