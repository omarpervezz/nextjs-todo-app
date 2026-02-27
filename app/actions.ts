"use server";
import { TodoSchema } from "@/lib/validations";
import { logAction } from "@/lib/audit";
import { createTodo, updateTodoStatus } from "@/lib/todos";
import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";

export async function createTodoAction(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
  };

  const parsed = TodoSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors.title?.[0],
    };
  }
  const userId = await requireUserId();
  await createTodo(parsed.data.title, userId);
  await logAction(`User created task: ${parsed.data.title}`, userId);

  revalidatePath("/");

  return { success: true };
}

export async function toggleTodoAction(
  id: string,
  completed: boolean,
  version: number,
) {
  const userId = await requireUserId();
  const result = await updateTodoStatus(id, completed, version, userId);

  if (result?.conflict) {
    return { conflict: true };
  }
  await logAction(`User updated status of task (ID: ${id})`, userId);

  revalidatePath("/");

  return { success: true };
}
