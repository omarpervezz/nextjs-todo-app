"use client";

import { ClipboardList, Search } from "lucide-react";

type Props = {
  isSearching: boolean;
};

export default function EmptyState({ isSearching }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      {isSearching ? (
        <>
          <Search className="h-10 w-10 text-slate-300 mb-3" />
          <h3 className="text-sm font-semibold text-slate-700">
            No matching tasks
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search keywords.
          </p>
        </>
      ) : (
        <>
          <ClipboardList className="h-10 w-10 text-slate-300 mb-3" />
          <h3 className="text-sm font-semibold text-slate-700">No tasks yet</h3>
          <p className="text-xs text-slate-500 mt-1">
            Create your first task to get started.
          </p>
        </>
      )}
    </div>
  );
}
