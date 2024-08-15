import { auth } from "@/auth";
import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";

export default async function NavBar() {
  const session = await auth();

  return <div className="fixed top-0 left-0 w-full py-3 border-b bg-white">
    <div className="max-w-xl flex items-center justify-between m-auto">
      <Link href={"/"} className="font-semibold text-xl">IntroAI</Link>
      <div className="flex gap-1">
        <Link className="btn" href={"/"}>Home</Link>
        <Link className="btn" href={"/profile"}>Profile</Link>
        <Link className="btn" href={`/chat/${session.user.id}`}>Chat</Link>
        <LogoutButton />
      </div>
    </div>
  </div>
}