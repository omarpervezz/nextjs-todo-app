/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { toggleTodoAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmModal";
import { emitMutationEvent } from "@/lib/mutation-events";

export default function TodoItem({ todo }: any) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo._id }),
    });

    setIsModalOpen(false);
    router.refresh();
    emitMutationEvent();
  }

  return (
    <>
      <li
        className={`flex items-center justify-between border p-3 rounded transition-opacity ${
          isPending ? "opacity-50" : ""
        }`}
      >
        <span className={todo.completed ? "line-through" : ""}>
          {todo.title}
        </span>

        <div className="flex gap-2">
          <button
            onClick={handleToggle}
            disabled={isPending}
            className="text-sm text-blue-500 disabled:opacity-50"
          >
            Toggle
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-red-500"
          >
            Delete
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
