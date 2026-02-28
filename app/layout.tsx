import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AuthHeader from "@/components/AuthHeader";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description:
    "A simple todo app built with Next.js 16, TypeScript, MongoDB, and NextAuth.js for authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.className} antialiased bg-slate-50`}>
        <AuthHeader />
        {children}
      </body>
    </html>
  );
}
