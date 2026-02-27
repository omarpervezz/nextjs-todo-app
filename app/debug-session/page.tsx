import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function DebugSessionPage() {
  const session = await getServerSession(authOptions);

  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}
