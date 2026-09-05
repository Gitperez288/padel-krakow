# Padel Kraków Community Portal

The public website and lightweight content-management system for the Padel
Kraków Community. It includes the court directory, skill-level guide, community
groups, coaches, sponsors, news, and a protected blog administration area.

Production: https://padel-krakow.vercel.app

## Stack

- Next.js 15, React 18, and TypeScript
- Tailwind CSS
- Prisma ORM with Neon Postgres
- NextAuth.js 4 credentials authentication
- Vercel hosting and preview deployments
- Vercel Blob for blog image uploads
- Shared Neon-backed login rate limiting

## Development environments

Database environments follow the same branching model as the application:

| Application environment | Neon branch |
| --- | --- |
| Production (`main`) | `production` |
| Local development | `vercel-dev` |
| Vercel pull-request preview | `preview/<git-branch>` |

Vercel and Neon create preview database branches automatically. Do not use the
production connection string for local development or previews.

## Local setup

Prerequisites: Node.js 22, npm, Git, and access to the linked Vercel project.

```bash
git clone https://github.com/Gitperez288/padel-krakow.git
cd padel-krakow
npm ci
cp .env.local.example .env.local
```

Link this directory to the existing Vercel `padel-krakow` project and pull the
Development environment into `.env.local`. The Neon integration supplies the
pooled `DATABASE_URL` for `vercel-dev`. Keep `NEXTAUTH_URL` set to
`http://localhost:3000` when running locally.

Then start the application:

```bash
npm run dev
```

Open http://localhost:3000.

Do not run database push, migration, reset, or seed commands as part of routine
setup. The shared development branch already contains the application schema
and data cloned from production.

## Verification

```bash
npm run typecheck
npm run build
```

`npm run build` requires a working Postgres connection because the sitemap is
generated from published posts. Pull Vercel's Development environment first.

## Delivery workflow

1. Create a feature branch from `main`.
2. Make and type-check the change.
3. Open a pull request.
4. Wait for GitHub CI and the Vercel preview.
5. Verify the preview and its isolated Neon branch.
6. Merge only after the required checks pass.

See [AGENTS.md](./AGENTS.md) for the repository safety rules and
[DEVELOPMENT.md](./DEVELOPMENT.md) for technical details.

## Useful locations

- `src/app` — pages and API routes
- `src/auth.ts` — NextAuth configuration
- `src/lib/db.ts` — Prisma client
- `prisma/schema.prisma` — database schema
- `prisma/seed.js` — explicit initial-user seed script
- `public` — static assets

## SEO endpoints

- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
