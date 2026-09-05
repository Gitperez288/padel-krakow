# Setup and Deployment Guide

The GitHub repository, Vercel project, and Neon project are all named
`padel-krakow` and are already connected. This guide covers maintaining that
setup; it does not create replacement infrastructure.

## Existing production resources

- Repository: `Gitperez288/padel-krakow`
- Production branch: `main`
- Production URL: https://padel-krakow.vercel.app
- Vercel project: `padel-krakow`
- Neon project: `padel-krakow`
- Neon production branch: `production`
- Neon development branch: `vercel-dev`

## First local setup

1. Install Node.js 22, npm, Git, and the Vercel CLI.
2. Clone the repository and install locked dependencies:

   ```bash
   git clone https://github.com/Gitperez288/padel-krakow.git
   cd padel-krakow
   npm ci
   ```

3. Link the directory to the existing Vercel project.
4. Pull the Vercel Development environment into `.env.local`.
5. Confirm variable names are present without printing their values:

   - `DATABASE_URL`
   - `DATABASE_URL_UNPOOLED`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

6. Keep local `NEXTAUTH_URL` set to `http://localhost:3000`.
7. Run:

   ```bash
   npm run typecheck
   npm run dev
   ```

The Development database URL should point to Neon's `vercel-dev` branch. Do
not initialize, reset, push, migrate, or seed a database during routine setup.

## Pull-request previews

Every feature branch should be delivered through a pull request. Vercel builds
a preview and the Neon integration creates `preview/<git-branch>` from
production. This gives the preview production-like data without allowing it to
write to production.

Before merging:

1. GitHub CI must pass.
2. The Vercel deployment must be ready.
3. The matching Neon preview branch must exist.
4. The affected pages must be checked on the preview.
5. Vercel build and runtime logs must not contain unexplained errors.

Deleting the Git branch allows the integration to clean up its Neon preview
branch automatically.

## Production deployment

Merging an approved pull request into `main` triggers the Vercel production
deployment. Do not deploy production from an unreviewed local directory.

After a merge, verify:

- https://padel-krakow.vercel.app/
- https://padel-krakow.vercel.app/blog
- https://padel-krakow.vercel.app/sitemap.xml
- https://padel-krakow.vercel.app/api/auth/session

## Environment ownership

- Neon integration: `DATABASE_URL`, `DATABASE_URL_UNPOOLED`, and PostgreSQL
  compatibility variables.
- Vercel project settings: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and Blob credentials.
- Repository: placeholder names only; never secret values.

## Database changes

The Prisma migration history begins at `prisma/migrations/0_init`. Production
is recorded as already containing that baseline, so the initial migration must
never be replayed manually or edited.

Future schema changes require a new migration, an isolated Neon preview test,
and explicit approval before production deployment. `prisma migrate deploy`
is intentionally not part of the Vercel build command; migration deployment
remains a separate, controlled operation.

## Recovery and destructive commands

Commands such as `prisma migrate reset`, database deletion, branch reset, and
production seeding can destroy data. They require explicit approval, a verified
target branch, and a recovery plan. They are never troubleshooting defaults.
