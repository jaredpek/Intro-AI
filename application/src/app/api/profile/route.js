import { auth } from "@/auth";
import { getMongooseClient } from "@/lib/mongoose";
import { Profile } from "@/models/profile";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await getMongooseClient();
  try {
    const {user: {id}} = await auth();
    const profile = await Profile.findById(id);
    return NextResponse.json(profile, {status: 200});
  } catch (error) {
    return NextResponse.json(
      {error: "Please login to view profile"}, {status: 401}
    );
  }
};

export const PUT = async (req) => {
  await getMongooseClient();
  try {
    const {user: {id: _id}} = await auth(), data = await req.json();
    const profile = await Profile.replaceOne({_id}, data);
    if (!profile.matchedCount) await Profile.create({_id, ...data});
    return NextResponse.json(
      {success: "Profile updated successfully"}, {status: 200}
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {error: "Please login to view profile"}, {status: 401}
    );
  }
};
