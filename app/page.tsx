import { getTodos } from "@/lib/todos";
import TodoList from "@/components/TodoList";
import AuditSidebar from "@/components/AuditSidebar";
import { requireUserId } from "@/lib/auth";

export default async function Home() {
  const userId = await requireUserId();
  const todos = await getTodos(userId);

  return (
    <main className="flex">
      <div className="flex-1 max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Todo App</h1>
        <TodoList initialTodos={todos} />
      </div>
      <AuditSidebar />
    </main>
  );
}
