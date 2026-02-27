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

export default function TodoList({ initialTodos }: any) {
  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state, newTodo: any) => [...state, newTodo],
  );
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const requestIdRef = useRef(0);

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
    <div>
      <SearchBar value={query} onChange={setQuery} />
      <CreateForm onSubmit={handleCreate} error={error} />
      <ul className="space-y-2 mt-6">
        {(debouncedQuery.trim() ? searchResults : optimisticTodos).map(
          (todo: any) => (
            <TodoItem key={todo._id} todo={todo} />
          ),
        )}
      </ul>
    </div>
  );
}
