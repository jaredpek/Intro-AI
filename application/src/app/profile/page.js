import { auth } from "@/auth";
import Layout from "@/components/layout/Layout";
import ProfileForm from "@/components/profile/ProfileForm";
import Link from "next/link";

export default async function Page() {
  const {user} = await auth() || {};

  return <>
    <Layout title="Profile">
      {
        !!user ? 
        <ProfileForm user={user} /> :
        <div className="flex gap-1">
          Please proceed to the 
          <Link href="/" className="text-blue-400">home page</Link> 
          to login!
        </div>
      }
    </Layout>
  </>
}