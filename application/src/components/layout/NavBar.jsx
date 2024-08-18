import { auth } from "@/auth";
import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";

export default async function NavBar() {
  const session = await auth();

  return <div className="fixed top-0 left-0 w-full py-3 border-b bg-white z-10">
    <div className="max-w-xl flex items-center justify-between m-auto px-3">
      <Link href={"/"} className="font-semibold text-xl">IntroAI</Link>
      <div className="flex gap-3 items-center">
        <Link className="nav-link" href={"/"}>Home</Link>
        <Link className="nav-link" href={"/profile"}>Profile</Link>
        <Link className="nav-link" href={`/chat/${session.user.id}`}>Chat</Link>
        <LogoutButton />
      </div>
    </div>
  </div>
}