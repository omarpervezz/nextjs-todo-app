"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/" })}
      className="px-4 py-2 rounded-md border"
    >
      Sign in with GitHub
    </button>
  );
}
