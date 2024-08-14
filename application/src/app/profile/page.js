import { auth } from "@/auth";
import ProfileForm from "@/components/profile/ProfileForm";

export default async function Page() {
  const {user} = await auth() || {};
  return <>
    <div>
      Profile
      <ProfileForm user={user} />
    </div>
  </>
}