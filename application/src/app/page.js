import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import { auth } from "@/auth";
import ProfileForm from "@/components/profile/ProfileForm";

export default async function Page() {
  const session = await auth();

  return <>
    {
      session ?
      <div>
        Home
        <LogoutButton />
        <ProfileForm session={session} />
      </div> :
      <div>
        <LoginButton />
      </div>
    }
  </>
}
