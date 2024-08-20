import LoginButton from "@/components/auth/LoginButton";
import { auth } from "@/auth";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

export default async function Page() {
  const session = await auth();

  return <Layout title={session ? "Welcome Back" : "Welcome to IntroAI"}>
    {
      session ?
      <div className="flex flex-col gap-3">
        <div>What would you like to do today?</div>
        <div className="flex gap-1">
          <Link className="btn" href={"/profile"}>Update Profile</Link>
          <Link className="btn" href={`/chat/${session.user.id}`}>Start Chatting</Link>
        </div>
      </div> :
      <LoginButton />
    }
  </Layout>
}
