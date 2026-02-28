/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useOptimistic, useRef, useState } from "react";
import { useTransition } from "react";
import { createTodoAction } from "@/app/actions";
import TodoItem from "./TodoItem";
import CreateForm from "./CreateForm";
import { useRouter } from "next/navigation";
import { TodoSchema } from "@/lib/validations";
import SearchBar from "./SearchBar";
import { emitMutationEvent } from "@/lib/mutation-events";
import EmptyState from "./EmptyState";
import { Todo } from "@/types/todo";

type Props = {
  initialTodos: Todo[];
};

export default function TodoList({ initialTodos }: Props) {
  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state, newTodo: any) => [newTodo, ...state],
  );
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const requestIdRef = useRef(0);
  const isSearchingActive = debouncedQuery.trim().length > 0;
  const todosToRender = isSearchingActive ? searchResults : optimisticTodos;
  const isEmpty = todosToRender.length === 0;

  async function handleCreate(formData: FormData) {
    const rawTitle = formData.get("title") as string;

    const parsed = TodoSchema.safeParse({ title: rawTitle });

    // 🚫 If invalid, stop immediately
    if (!parsed.success) {
      setError(parsed.error.flatten().fieldErrors.title?.[0] ?? null);
      return;
    }

    const title = parsed.data.title;
    const tempId = crypto.randomUUID();

    setError(null);

    startTransition(() => {
      addOptimisticTodo({
        _id: tempId,
        title,
        completed: false,
        version: 1,
        isPending: true,
      });
    });

    const result = await createTodoAction(formData);

    if (result?.error) {
      setError(result.error);
      router.refresh();
    } else {
      // Defer event emission
      setTimeout(() => {
        emitMutationEvent();
      }, 0);
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (!trimmed) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const currentRequestId = ++requestIdRef.current;
    setIsSearching(true);

    async function fetchResults() {
      try {
        const res = await fetch(`/api/todos?q=${encodeURIComponent(trimmed)}`);
        const data = await res.json();

        // Prevent stale overwrites
        if (currentRequestId === requestIdRef.current) {
          setSearchResults(data);
        }
      } catch (error) {
        console.error(error || "Search failed");
      } finally {
        if (currentRequestId === requestIdRef.current) {
          setIsSearching(false);
        }
      }
    }

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="p-5">
      {isPending && (
        <div className="mt-4 text-center text-sm text-slate-500">
          Syncing changes...
        </div>
      )}
      <SearchBar value={query} onChange={setQuery} isSearching={isSearching} />
      <CreateForm onSubmit={handleCreate} error={error} />
      <div className="mt-4">
        {isEmpty ? (
          <EmptyState isSearching={isSearchingActive} />
        ) : (
          <ul className="space-y-3">
            {todosToRender.map((todo: any) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
