import { getTodos } from "@/lib/todos";
import TodoList from "@/components/TodoList";
import AuditSidebar from "@/components/AuditSidebar";
import { requireUserId } from "@/lib/auth";

export default async function Home() {
  const userId = await requireUserId();
  const todos = await getTodos(userId);

  return (
    <main className="flex bg-slate-50 min-h-[calc(100vh-56px)]">
      {/* Main Content */}
      <div className="flex-1 flex justify-center px-6 py-6">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col max-h-[calc(100vh-280px)]">
          <div className="mb-4">
            <h1 className="text-lg font-medium tracking-tight text-slate-800">
              My Tasks
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage and organize your tasks efficiently.
            </p>
          </div>

          {/* Scrollable List Area */}
          <div className="flex-1 overflow-y-hidden hover:overflow-y-auto">
            <TodoList initialTodos={todos} />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block border-l border-slate-200 bg-white">
        <AuditSidebar />
      </div>
    </main>
  );
}
