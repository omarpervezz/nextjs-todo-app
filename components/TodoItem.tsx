/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { toggleTodoAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmModal";
import { Trash2, Loader2 } from "lucide-react";
import { emitMutationEvent } from "@/lib/mutation-events";

export default function TodoItem({ todo }: any) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleToggle() {
    if (isPending) return;

    startTransition(async () => {
      const result = await toggleTodoAction(
        todo._id,
        !todo.completed,
        todo.version,
      );

      if (result?.conflict) {
        emitMutationEvent();
      }
    });
  }

  async function handleDeleteConfirm() {
    setIsDeleting(true);
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo._id }),
    });
    setIsDeleting(false);
    setIsModalOpen(false);
    router.refresh();
    emitMutationEvent();
  }

  return (
    <>
      <li
        className={`
    flex items-center justify-between
    rounded-lg border border-slate-200
    px-4 py-3
    transition-all duration-300
    hover:bg-slate-50
    ${isPending || isDeleting ? "opacity-50 pointer-events-none" : ""}
  `}
      >
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            disabled={isPending}
            className="h-4 w-4 accent-blue-600 cursor-pointer"
          />

          <span
            className={`text-sm font-medium transition-all ${
              todo.completed ? "line-through text-slate-400" : "text-slate-800"
            }`}
          >
            {todo.title}
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {todo.completed && (
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
              Completed
            </span>
          )}

          <button
            onClick={() => !isDeleting && setIsModalOpen(true)}
            disabled={isDeleting}
            className={`flex items-center gap-1.5 text-red-500 border px-2 py-1 rounded-md text-sm transition min-w-22.5 justify-center
    ${isDeleting ? "bg-red-50 cursor-not-allowed" : "hover:bg-red-50 cursor-pointer"}
  `}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </li>

      <ConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
