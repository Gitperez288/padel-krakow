# Development Guide

## Architecture

The application uses the Next.js App Router. Public pages are rendered from a
mix of repository content and Neon Postgres data. Protected API routes support
credentials authentication, blog administration, and image uploads.

| Layer | Technology |
| --- | --- |
| Application | Next.js 15, React 18, TypeScript |
| Styling | Tailwind CSS |
| Database | Neon Postgres 17 |
| ORM | Prisma 5 |
| Authentication | NextAuth.js 4 with bcrypt |
| Hosting | Vercel |
| Object storage | Vercel Blob |
| Rate limiting | Upstash Redis, optional |

## Commands

```bash
npm run dev        # Local development server
npm run typecheck  # TypeScript verification
npm run build      # Prisma generation and production build
npm run start      # Serve a completed production build
```

Database commands exist for deliberate administration only:

```bash
npm run db:migrate:status  # Inspect migration state
npm run db:migrate:deploy  # Apply committed migrations to the current database
npm run db:push            # Prototype schema changes; never use in production
npm run db:seed            # Explicit initial-user seed
```

Do not run database-write commands against production without explicit approval,
a verified target, and a recovery point.

## Environment variables

Required:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Pooled Neon connection used by Prisma |
| `NEXTAUTH_SECRET` | Signs and encrypts authentication state |
| `NEXTAUTH_URL` | Canonical authentication URL |

Available from the Neon integration:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL_UNPOOLED` | Direct connection for future migrations and administration |

Optional integrations:

| Variable | Purpose |
| --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Blog image uploads |
| `UPSTASH_REDIS_REST_URL` | Shared login rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Shared login rate limiting |

The old `AUTH_ADMIN_*` and `AUTH_USER_*` variables are not used. Application
users and bcrypt password hashes are stored in the `User` table.

## Database environments

- `production` is used only by production deployments.
- `vercel-dev` is the persistent local-development branch.
- `preview/<git-branch>` is created automatically for each Vercel preview.

The integration injects the correct database URL into each deployment. Never
copy the production URL into Preview or Development manually.

## Pull-request checks

GitHub CI installs the locked dependencies, generates the Prisma client, and
runs TypeScript verification. Vercel performs the full production build using
the isolated preview database.

For application-wide changes, smoke-test:

- `/`
- `/blog`
- `/sitemap.xml`
- `/api/auth/session`

Also inspect the Vercel build logs and recent runtime errors.

## Database migrations

The migration history begins at `prisma/migrations/0_init`. That baseline was
generated from `prisma/schema.prisma` and validated against the existing
production schema.

For each schema change:

1. create a new migration from the latest `main` on `vercel-dev`;
2. review the generated SQL and commit it with the Prisma schema change;
3. verify it on the pull request's isolated Neon preview branch;
4. obtain explicit approval before applying it to production;
5. run `npm run db:migrate:deploy` against the verified target;
6. confirm migration status and application health.

Never edit `0_init` or any migration already recorded as applied. Automated
production migration deployment remains disabled until a later, dedicated
workflow decision.

## Troubleshooting

### Build reports a missing `DATABASE_URL`

Confirm the deployment is linked to the Neon integration. Preview deployments
should have a matching `preview/<git-branch>` Neon branch.

### Authentication fails locally

Confirm `NEXTAUTH_SECRET` is set and `NEXTAUTH_URL` is
`http://localhost:3000`. Clear local cookies after changing either value.

### Uploads fail

Confirm `BLOB_READ_WRITE_TOKEN` is present in the current Vercel environment.

### Login rate limiting is inactive

The application deliberately disables distributed rate limiting when either
Upstash variable is absent.
