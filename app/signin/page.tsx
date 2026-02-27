import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import SignInButton from "@/components/SignInButton";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/"); // or "/todos" depending on your app route
  }

  return (
    <main className="min-h-screen grid place-items-center">
      <SignInButton />
    </main>
  );
}
