import { 
  genAIModel, genInstruction, vectorStore,
  // localGenAIModel, localVectorStore,
} from "@/lib/genAI";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { history, message } = await req.json();

    // initialise vector search index retriever
    // const retriever = localVectorStore.asRetriever(4);
    const retriever = vectorStore.asRetriever(4);
    const context = await retriever.invoke(message, {});

    // generate system prompt with instructions and embedded context
    const instruction = `
      ${genInstruction}
      Here are the provided contexts:
      ${context.map((chunk, i) => `Context ${i + 1}: ${chunk.pageContent}\n`)}
    `;

    // generate response based on provided messages and chat context
    // const chat = localGenAIModel.invoke([
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
      { status: 401 },
    );
  }
};
