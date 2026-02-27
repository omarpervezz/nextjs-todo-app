/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function requireUserId() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    // This is for server actions / route handlers:
    // middleware will usually prevent this, but we still guard.
    throw new Error("Unauthorized");
  }

  return userId as string;
}
