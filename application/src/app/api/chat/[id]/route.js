import { genAIModel } from "@/lib/genAI";
import { getMongooseClient } from "@/lib/mongoose";
import { Profile } from "@/models/profile";
import { NextResponse } from "next/server";

export const POST = async (req, {params: {id}}) => {
  await getMongooseClient();
  try {
    const profile = await Profile.findOne({_id: id});
    const prompt = `
      Take in this JSON file of a user's profile, and give me a summary of his skills. The JSON is as follows: ${profile}
    `
    const result = (await genAIModel.generateContent(prompt)).response.text();
    return NextResponse.json({profile, result}, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: "User has not updated his profile"}, {status: 401});
  }
};
