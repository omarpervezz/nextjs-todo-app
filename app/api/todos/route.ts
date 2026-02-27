import { NextResponse } from "next/server";
import { deleteTodo, searchTodos } from "@/lib/todos";
import { getAuditLogs, logAction } from "@/lib/audit";
import { requireUserId } from "@/lib/auth";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const userId = await requireUserId();
    await deleteTodo(id, userId);
    await logAction(`User deleted task (ID: ${id})`, userId);
    await getAuditLogs(userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    console.log(q);
    const userId = await requireUserId();
    const results = await searchTodos(q, userId);

    return Response.json(results);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to search todos",
      },
      { status: 500 },
    );
  }
}
