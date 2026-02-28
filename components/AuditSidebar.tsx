/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { subscribeToMutations } from "@/lib/mutation-events";
import { RefreshCcw } from "lucide-react";

export default function AuditSidebar() {
  const [logs, setLogs] = useState<any[]>([]);

  async function fetchLogs() {
    const res = await fetch("/api/audit");
    const data = await res.json();
    setLogs(data);
  }

  useEffect(() => {
    (async () => {
      await fetchLogs();
    })();

    const unsubscribe = subscribeToMutations(() => {
      fetchLogs();
    });

    return unsubscribe;
  }, []);

  return (
    <aside className="w-80 border-l border-slate-200 bg-white px-5 py-5 overflow-y-auto">
      <h2 className="text-base font-semibold text-slate-800 mb-4">
        Activity Audit Logs
      </h2>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200" />

        <ul className="space-y-5">
          {logs.map((log) => (
            <li key={log._id} className="relative pl-10">
              {/* Icon Circle */}
              <div className="absolute left-0 -top-1 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                <RefreshCcw className="h-4 w-4 text-slate-500" />
              </div>

              {/* Timestamp */}
              <p className="text-xs text-slate-400 mb-1">
                {new Date(log.createdAt).toLocaleString()}
              </p>

              {/* Message */}
              <p className="text-sm text-slate-700 leading-snug">
                {log.message}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
