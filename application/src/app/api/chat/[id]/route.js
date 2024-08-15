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
      {role: "user", parts: [{text: `You are to assume the role of the person following the provided JSON profile, and answer any questions that anyone might have clearly and concisely. The JSON is as follows: ${profile}.`}]},
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
