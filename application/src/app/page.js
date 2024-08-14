import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import { auth } from "@/auth";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  return <>
    {
      session ?
      <div className="flex flex-col gap-3">
        Home
        <LogoutButton />
        <Link href={"/profile"}>View Profile</Link>
        <Link href={`/chat/${session.user.id}`}>Chat</Link>
      </div> :
      <div>
        <LoginButton />
      </div>
    }
  </>
}
