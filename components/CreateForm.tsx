/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Plus } from "lucide-react";

type Props = {
  onSubmit: (formData: FormData) => Promise<any>;
  error: string | null;
};

export default function CreateForm({ onSubmit, error }: Props) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await onSubmit(formData);
    if (result?.error) return;

    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          name="title"
          placeholder="Add todo..."
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
        />
        <button
          type="submit"
          className="flex gap-x-1.5 items-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 active:scale-95 transition cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Create New Todo
        </button>
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </form>
  );
}
