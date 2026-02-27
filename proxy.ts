import { withAuth } from "next-auth/middleware";

export default withAuth(
  function proxy() {
    // You can add logic here later if needed
  },
  {
    pages: {
      signIn: "/signin",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/((?!api/auth|signin|_next/static|_next/image|favicon.ico).*)"],
};
