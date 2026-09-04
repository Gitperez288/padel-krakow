# Repository Working Agreement

## Website writing style

- Do not use em dashes (Unicode U+2014) anywhere in English or Polish website
  copy, including page titles, metadata, image descriptions, errors and blog posts.
- Use commas, colons, parentheses or separate sentences as appropriate. Preserve
  meaning and natural grammar. Keep translation keys and their callers in sync.
- Do not encode em dashes as HTML entities or JavaScript escapes to bypass this
  rule. The source-copy check runs as part of `npm run typecheck`.

This repository is developed through GitHub pull requests, Vercel previews, and
isolated Neon database branches.

## Change workflow

1. Start from the latest `main` and create a descriptive `feat/`, `fix/`, or
   `chore/` branch.
2. Never commit directly to `main`.
3. Open a pull request and wait for both GitHub CI and the Vercel preview.
4. Verify the affected routes on the preview before merging.
5. Confirm production after the merge.

## Database safety

- Production data lives on the Neon `production` branch.
- Vercel preview deployments must use the automatically created
  `preview/<git-branch>` Neon branch.
- Local development should use the persistent `vercel-dev` Neon branch.
- Never point a preview or local environment at the production connection
  string.
- Do not run `prisma db push`, `prisma migrate`, `prisma migrate reset`, or the
  seed command against production without explicit approval and a recovery
  plan.
- The checked-in Prisma history begins at `prisma/migrations/0_init`; never
  modify an applied migration.
- Create and test every new migration on `vercel-dev` or an isolated preview
  branch before production.
- Applying migrations to production requires explicit approval, a verified
  target, and a recovery point.

## Required verification

- Run `npm run typecheck` for every code change.
- A successful Vercel preview is the production-build check because the build
  reads from Postgres while generating the sitemap.
- Smoke-test `/`, `/blog`, `/sitemap.xml`, and `/api/auth/session` when shared
  application behavior changes.
- Inspect Vercel build and runtime errors before merging.

## Secrets

- Never commit `.env`, `.env.local`, database URLs, passwords, or service
  tokens.
- Keep `.env.local.example` limited to placeholders and variable names.
- Vercel manages deployed secrets; the Neon integration manages database URLs.
