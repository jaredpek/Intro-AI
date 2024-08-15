import { signOut } from "@/auth"

export default function LogoutButton() {
  const logout = async () => {
    "use server";
    await signOut();
  }
  return (
    <form action={logout}>
      <button className="bg-red-500 hover:bg-red-400" type="submit">Logout</button>
    </form>
  )
}