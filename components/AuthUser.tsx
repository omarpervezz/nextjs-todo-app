"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface Props {
  name: string;
  image: string;
}

export default function AuthUser({ name, image }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Brand */}
        <div className="flex items-center">
          <h1 className="text-sm sm:text-base font-semibold text-slate-800">
            Todo App
          </h1>
        </div>

        {/* Right: User Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full px-3 py-1 bg-slate-100 transition">
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt="avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <span className="hidden sm:block text-sm font-medium text-slate-700">
              {name}
            </span>
          </div>
          {/* Logout Button with Tooltip */}
          <div className="relative group">
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 hover:bg-slate-50 active:scale-95 transition focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4 text-slate-600" />
            </button>

            {/* Tooltip */}
            <div
              className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 
                  whitespace-nowrap rounded-sm bg-slate-700 px-2 py-1 
                  text-xs text-white opacity-0 scale-95 
                  transition-all duration-150 
                  group-hover:opacity-100 group-hover:scale-100
group-focus-within:opacity-100 group-focus-within:scale-100"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
