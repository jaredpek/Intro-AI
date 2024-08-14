import { signIn } from "@/auth"

export default function LoginButton() {
  const login = async () => {
    "use server";
    await signIn("google");
  }
  return (
    <form action={login}>
      <button type="submit">Login with Google</button>
    </form>
  )
}