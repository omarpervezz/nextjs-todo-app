import { requireUserId } from "@/lib/auth";

export default async function DebugUserIdPage() {
  const userId = await requireUserId();
  return <div>UserId: {userId}</div>;
}
