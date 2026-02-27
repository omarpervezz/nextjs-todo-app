This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

I am building a Next.js 16 Todo App (App Router) with:

- MongoDB Atlas (native driver)
- NextAuth (GitHub provider)
- proxy.ts for route protection
- User-scoped todos (userId enforced at DB level)
- Version-based race condition handling for toggle
- useTransition with click-lock to prevent rapid requests
- Optimistic create with Server Actions
- Hybrid search (SSR initial + client API filtering)
- User-scoped audit logs with mutation event subscription
- Custom delete modal + router.refresh
- Project builds successfully in production

Current state:

- All core requirements implemented and working.
- No hydration issues.
- Race-condition safe.
- Audit logs user-isolated.
- Auth UI + logout implemented.

Now I want to add final polish features:

1. Add proper MongoDB indexes for performance.
2. Improve audit event optimization if needed.
3. Possibly add loading skeleton for search transition.
4. Add clean empty state UI per user.
5. Review for any production-level improvements.

Let’s continue from this state step-by-step with high architectural quality.
