/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/[...nextauth]/authOptions.ts
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // This ensures we can access a stable "user id" from session on the server.
    async session({ session, token }) {
      if (session.user && token.sub) {
        // Attach NextAuth's user id (provider account id mapped) to the session
        // We'll use this as userId in Mongo.
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
