"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col gap-4 w-64">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full rounded-md border bg-white px-4 py-2.5 text-sm shadow-sm hover:bg-slate-50 transition cursor-pointer"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full rounded-md bg-black px-4 py-2.5 text-sm text-white hover:opacity-90 transition cursor-pointer"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
