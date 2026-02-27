import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import AuthUser from "@/components/AuthUser";

export default async function AuthHeader() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  return (
    <AuthUser name={session.user.name ?? ""} image={session.user.image ?? ""} />
  );
}
