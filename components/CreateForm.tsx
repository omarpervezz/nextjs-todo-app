/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function CreateForm({ onSubmit, error }: any) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await onSubmit(formData);

    if (result?.error) {
      return;
    }

    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <div className="flex gap-2">
        <input
          name="title"
          placeholder="Add todo..."
          className="border p-2 flex-1 rounded"
        />
        <button type="submit" className="bg-black text-white px-4 rounded">
          Add
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
