# Reliable development and preview checks

## Normal path

1. Fetch `main`, inspect the worktree, and create a focused branch. Preserve
   unrelated user changes. Follow `AGENTS.md` for database isolation.
2. Run the application typecheck (`npm run typecheck`). Do not borrow production
   credentials to run a local build: sitemap generation reads the database.
3. Publish through a PR. Verify the published tree matches the local tree,
   particularly after connector-based uploads or route moves.
4. Wait for GitHub CI and Vercel READY. Read actual failing job/build logs;
   neither a queued job nor an authentication redirect is a compile error.
5. Review the exact PR revision, then run protected preview tests below.
6. Merge only after checks and review; verify production separately.

## Protected preview tests

One-time setup: create a Vercel **Protection Bypass for Automation** secret for
this project and save it as the GitHub Actions **repository secret** named
`VERCEL_AUTOMATION_BYPASS_SECRET`. Never paste the value into source or chat.
The workflow must be merged into `main` before it can run from trusted code.

For each PR:

1. Review the exact head commit, including any server/route code that could
   receive the bypass header. Only same-repository PRs into `main` are eligible.
2. Wait for its Vercel preview to become READY.
3. In GitHub **Actions → Preview browser tests → Run workflow**, choose `main`.
   Enter the PR number and the complete 40-character **reviewed PR head SHA**.
   Dispatch is explicit approval for this revision to receive the credential.
   A new commit requires review and a new SHA. Repository owners can use this
   path for their own PRs without trying to approve their own review.
4. Inspect the run and the `Preview browser tests` commit status. Skipped means
   **not tested**. Missing/mismatched deployment records fail closed: investigate
   the authorize job, do not relax the hostname guard or paste a different URL.

The workflow also runs after successful CI when a maintainer has already approved
the exact revision. A later review does not itself trigger it; manually dispatch
or rerun CI. If Vercel was not ready yet, dispatch again after READY.

The gate resolves the URL from successful GitHub deployment records made by
`vercel[bot]`, checks the exact commit and Preview environment, rejects production
and forks, and permits only this project's immutable Vercel hostnames. If Vercel
changes its deployment-record format, inspect that record and update the guard
through review; do not bypass it. The connector cannot read deployment records
in this workspace; the first live Actions run successfully reached all 17 tests.
The full suite still needs a green run after the routing fix and preview secret
configuration described below.

Tests and the small, separate dependency lockfile come from a pinned trusted
`main` commit, not the PR. No application install scripts or database migrations
run. Only the browser-test step receives the bypass secret. Browser authorization
uses one isolated API request to the validated origin with redirects disabled and
Vercel's documented `x-vercel-set-bypass-cookie: true` header. Cookies returned
outside the exact hostname are rejected; accepted cookies are narrowed to
host-only, Secure, HttpOnly session cookies in the disposable browser context.
Browser assets and navigation then load natively, without fetch/fulfill proxying.
HTTP smoke requests still use exact-origin headers with redirects disabled. Do not add
global `extraHTTPHeaders`, network traces, HARs, or unrestricted report uploads.

Coverage: basic HTTP routes, core-page metadata, language switching when Polish
routes exist, mobile navigation, court search, private invitation reveal, and its
retry state. Tests do not join WhatsApp, authenticate users, or mutate app data.
These checks do not replace visual review, map accuracy checks, or admin testing.

Local, secret-free checks:

```sh
cd tests/preview
npm ci --ignore-scripts --no-audit --no-fund
npm run test:guards
```

The ordinary CI job **Preview routing in Chromium (no secrets)** additionally
runs `node --test route-browser.test.mjs` after installing Chromium. It navigates
with pending requests and checks a cross-origin redirect using loopback servers
and a dummy credential. This test must run before merging routing-helper changes;
unit mocks alone cannot validate browser cancellation behavior.

CI also runs `npx playwright test --config browser-auth.config.mjs`: the actual
Playwright runner exercises repeated EN/PL document navigation with script loads,
HttpOnly cookies and cross-host redirects against a simulated gateway. Unit tests
cover bootstrap failures, cookie scope, redaction and disposal. Neither simulation
proves the deployed Vercel cookie exchange; record the protected live suite separately.

The retained legacy route regression reports only fixed operation/category/resource/origin labels.
Never log raw error text, causes, URLs, headers or response bodies to diagnose a
secret-backed run. Unknown errors remain failures. The repeated PR #12 failures
after PR #15 report `fulfill/already-handled/script/preview`. The underlying
Playwright race is not established; the deployed suite no longer uses that proxy.
Do not treat every cancellation as harmless. Keep all
17 deployed-page checks and the strict authentication status assertion enabled.

Do not run the preview suite against production or download the repository secret
into a development session. Keep protection enabled. Existing root CI already
uses npm caching; its dependency install can still take time on a cache miss.

## Verified lessons — 2026-09-04

| Symptom | Cause / evidence | Reliable approach |
| --- | --- | --- |
| `route.abort: Route is already handled!` in preview tests | The helper caught a rejected fulfill and attempted a second terminal operation | Catch fetch errors separately; never abort after fulfill/continue starts. Drain page and context handlers with `unrouteAll({ behavior: 'wait' })` before teardown. Regression tests cover rejection and cleanup ordering; confirm with the live suite after merge. |
| Preview `/api/auth/session` returns 500 | Runtime logs reported NextAuth `NO_SECRET`; production-only variables do not reach preview | Configure a separate Preview `NEXTAUTH_SECRET`, leave production unchanged, and redeploy. Never remove the HTTP 200 assertion to hide a configuration failure. |
| Redeployment repeats missing/truncated-file build errors | The redeployment rebuilt old commit `72547f0`, not corrected PR #12 head `48781e4` | Confirm the deployment's full Git SHA matches the current reviewed PR head before redeploying; a branch label alone is insufficient. |
| Local Git push fails despite a connected GitHub app | Local Git has no credentials; the connector is separately authenticated | Use authorized connector writes; never extract tokens or repeatedly retry an unauthenticated push. Stop if workflow-write permission is denied. |
| Uploaded code differs from local code | Large tool output was truncated during source transfer | Read files individually, reject truncation, compare the resulting Git tree SHA with the local tree **before** updating the remote branch. |
| A route move leaves old files behind | A prior multi-file operation did not produce the intended deletions | Inspect the actual tree and duplicate routes after editing; do not treat a success message as proof of the intended contents. |
| READY preview opens Vercel SSO instead of the site | Deployment Protection blocks unauthenticated browser access | Use the approved secret-backed workflow; READY proves build success, not page behavior. |
| Local npm wrapper is blocked while typecheck itself is available | Workspace execution/approval constraints differ from CI | A safe local-only alternative is `node node_modules/typescript/bin/tsc --noEmit`; otherwise report the blocker and use CI. Never seek another route around an explicit permission denial. |

Add future entries only after establishing the cause and testing the remedy.
Prefer updating a wrong entry over accumulating conflicting advice. A separate
personal Skill is useful only when a workflow generalizes across repositories;
this runbook remains the source of truth for this project's paths and safeguards.
