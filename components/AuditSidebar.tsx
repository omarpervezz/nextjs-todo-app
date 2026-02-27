/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { subscribeToMutations } from "@/lib/mutation-events";

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
    <aside className="w-80 border-l p-4 h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Audit Logs</h2>
      <ul className="space-y-2 text-sm">
        {logs.map((log) => (
          <li key={log._id} className="border-b pb-2">
            <p>{log.message}</p>
            <p className="text-gray-400 text-xs">
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
