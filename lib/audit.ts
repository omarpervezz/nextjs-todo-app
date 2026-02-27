import clientPromise from "@/lib/mongodb";

export async function logAction(message: string, userId: string) {
  const client = await clientPromise;
  const db = client.db();

  await db.collection("audit_logs").insertOne({
    userId,
    message,
    createdAt: new Date(),
  });
}

export async function getAuditLogs(userId: string) {
  const client = await clientPromise;
  const db = client.db();

  const logs = await db
    .collection("audit_logs")
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(20)
    .toArray();

  return logs.map((log) => ({
    _id: log._id.toString(),
    message: log.message,
    createdAt: log.createdAt.toISOString(),
  }));
}
