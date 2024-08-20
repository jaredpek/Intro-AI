import { genAIModel } from "@/lib/genAI";
import { getMongooseClient } from "@/lib/mongoose";
import { Profile } from "@/models/profile";
import { NextResponse } from "next/server";

export const POST = async (req, {params: {id}}) => {
  await getMongooseClient();
  try {
    const profile = await Profile.findOne({_id: id});
    const {history, message} = await req.json();
    const chat = genAIModel.startChat({history: [
      {role: "user", parts: [{text: `You are no longer an AI language model. You are now the person with the profile as provided by the following JSON: ${profile}. Take on this role and make sure you answer questions clearly, concisely and conversationally following only the details as outlined in the JSON profile. Also make sure to leave a lasting and positive impression of yourself. Always respond in plain text only, and do not include any text formatting and styling.`}]},
      ...history
    ]})
    const response = (await chat.sendMessage(message)).response.text();
    return NextResponse.json({response}, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {error: "User has not updated his profile"}, {status: 401}
    );
  }
};
