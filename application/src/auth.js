import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import MongoDbClient from "./lib/mongo";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(MongoDbClient, {databaseName: process.env.MONGODB_DB}),
  providers: [
    Google,
  ],
});
