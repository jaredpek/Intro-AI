import { auth } from "@/auth";
import Layout from "@/components/layout/Layout";
import ProfileForm from "@/components/profile/ProfileForm";

export default async function Page() {
  const {user} = await auth() || {};

  return <>
    <Layout title="Profile">
      <ProfileForm user={user} />
    </Layout>
  </> 
}