import { signOut } from "@/auth"

export default function LogoutButton() {
  const logout = async () => {
    "use server";
    await signOut();
  }
  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  )
}