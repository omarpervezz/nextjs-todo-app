/* eslint-disable @next/next/no-img-element */
"use client";

import { signOut } from "next-auth/react";

interface Props {
  name: string;
  image: string;
}

export default function AuthUser({ name, image }: Props) {
  return (
    <div className="flex items-center gap-3 border-b p-4">
      {image && (
        <img src={image} alt="avatar" className="w-8 h-8 rounded-full" />
      )}
      <span className="text-sm font-medium">{name}</span>

      <button
        onClick={() => signOut({ callbackUrl: "/signin" })}
        className="ml-auto text-sm text-red-500 hover:underline cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
