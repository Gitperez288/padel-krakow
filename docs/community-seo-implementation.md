# Community-first SEO implementation, September 2026

Goal: be the trusted local guide that helps people find an actual game in Kraków. Keep `https://padel-krakow.vercel.app`. Membership is free; all levels, visitors, Polish speakers and English speakers are welcome.

## Implemented in this PR

- Eleven complete EN/PL route pairs, including coaches, blog, About, sponsors, guidelines and legal pages. Consistent navigation, canonicals and reciprocal language alternates.
- Polish versions of all three existing published articles, with localized links, excerpts and metadata. Future untranslated posts do not get a pretend Polish URL. Maintain translations in `src/lib/blog-translations.ts` and registered slugs in `src/lib/blog-locales.ts`.
- Home and community pages show 975+ members, rounded down from the owner's confirmed 979. This describes membership, not activity.
- Explicit Kraków headings and community calls to action from courts, coaches and articles.
- Joining instructions cover all five WhatsApp subgroups and the required manual subgroup step, with a matchmaking message template and practical FAQs.
- Both languages welcome, without a mandatory English translation. Subgroup names remain exactly as users will see them in WhatsApp.
- Carlos G. Viso and Angelika Bryła named in full; Victor Guedes retains Padel House's Instagram contact. No coach venue assignments are invented.
- Fran byline for the known launch article previously credited to Admin. The application mapping is scoped to that article and does not relabel other authors. No production account has been renamed. Changing the identified author's `User.name` to Fran later is appropriate; leave email, password, ID and role alone.
- Plain-text descriptions for stored HTML, sanitized article content, escaped JSON-LD, absolute blog titles without duplicate site suffixes, and publication dates preserved when an article is edited.
- `/index` permanently redirects to `/`; language links also normalize that alias.
- Court area filter distinguishes Kraków, nearby towns and the wider region. Indoor/outdoor filters include mixed venues; count labels correctly describe courts.
- Direct booking actions, practical notes with sources/check dates, and correct Fame Sport Club name. Existing Padel Spot and Błonia facilities are described in permanent terms as requested, without launch countdowns or invented events.
- Anonymous first-party measurement and an admin-only `/admin/analytics` dashboard. No new subscription or third-party analytics script.

## Booking sources and remaining gaps

| Club | Booking destination | Evidence / notes |
| --- | --- | --- |
| Ahoj Padel | [Padel Mates club profile](https://padelmates.se/club/ahojpadel) | Embedded by [official booking page](https://ahojpadel.pl/system-rezerwacji/). Official website confirms equipment rental and six courts. |
| Bajada | [Tenis4U 421](https://app.tenis4u.pl/court/421) | Public booking UI inspected. Two indoor doubles, one indoor singles, two outdoor doubles; rental, changing rooms and parking. |
| Błonia Sport | Existing TwojTenis club URL | Owner confirmed facilities. Keep permanent information without an opening countdown. |
| Fame Sport Club | [Tenis4U 104](https://app.tenis4u.pl/court/104) | Linked by [official website](https://famesport.pl/). Official address is Dekerta 21. The earlier audit's suspected spelling error was incorrect. |
| Garden Padel | [Tenis4U 483](https://app.tenis4u.pl/court/483) | Named public booking profile. |
| Libertów Padel Club | [Tenis4U 496](https://app.tenis4u.pl/court/496) | Profile link located through [club directory](https://zagrajwpadla.pl/). Booking page could not be fully rendered in this session; confirm the named destination during final booking checks. |
| Morelowa34 | [Tenis4U 407](https://app.tenis4u.pl/court/407) | Linked by [club Facebook page](https://www.facebook.com/PadelLoungeKrakow/). |
| Padel Arena Limanowa | [PlayPadel club booking](https://playpadel.com.pl/korty/1#rezerwacje) | Official booking page lists three outdoor courts, lighting and relaxation area. Updated former count of four to three. |
| Padel Factory Nowy Targ | Existing Gymmanager URL | Retained supplied booking destination. Confirm booking/pass flow in a future club check. |
| Padel House | [Tenis4U 480](https://app.tenis4u.pl/court/480) | Named public booking profile. |
| Padel Spot | Tenis4U, search “Padel SPOT” | Exact profile ID not verified. No guessed ID or temporary opening claim. Replace search destination when confirmed. |
| SAO Sports Hub | [Tenis4U 204](https://app.tenis4u.pl/court/204) | Named public booking profile. |
| Squash & Padel Skawina | Tenis4U, search “Squash&Padel” | Exact profile ID not verified. [Official site](https://squashpadel.pl/) retained for club contact. |

Only sourced practical facts are added. Prices, transport, parking and rental information must not be guessed for the other clubs. These can be expanded as verified information becomes available. No stock photos are described as community events. No Event or review schema is fabricated.

## How tracking works

Search Console measures Google impressions, Google clicks, search queries and landing pages. The website counters measure actions after someone arrives. They cannot be joined at visitor level and cannot determine whether a WhatsApp click became a member.

| Event | Meaning |
| --- | --- |
| `page_view` | Public page view, grouped by page category and EN/PL |
| `community_cta` | Click on an internal link to the community page |
| `invite_reveal` | Successful reveal of the invitation |
| `whatsapp_click` | Click on the outgoing WhatsApp invitation, not a confirmed join |
| `booking_click` | Click on a court booking or booking-search action |
| `coach_contact` | Click on a coach contact action |

`UsageDaily` stores day (UTC), event, page category, locale and count. It stores no visitor IDs, IP addresses, invitation tokens, full paths, queries or referrers. Do Not Track and Global Privacy Control suppress measurement. No analytics cookies. The handler uses bounded, temporary in-memory request hashes for best-effort abuse protection; it is not a distributed bot detection system. Repeat activity and blockers affect totals. Older-than-400-day totals are pruned when traffic resumes, at most once per day per instance.

Enable only after the migration is applied: set `COMMUNITY_ANALYTICS_ENABLED=true` for Production in Vercel and deploy. Leave Preview disabled, except an explicitly configured isolated test deployment. The route returns a harmless 204 when disabled; unavailable storage returns 503 without blocking the user's WhatsApp action. Admin reporting requires both a session and a current database admin role.

No GA4 property or measurement ID is required for this approach. It provides useful aggregate action totals, not individual funnels, attribution or unique-user analytics.

## Validation and production gate

- `npm run typecheck` includes copy-style, SEO and analytics tests. Run after staging new source so the no-em-dash guard includes new files.
- The new SQL migration and atomic increments were exercised on isolated Neon branch `local/community-first-seo` (`br-long-breeze-al0t3iyc`). A repeated sample event correctly counted 2. No production schema changes were made.
- Local Prisma client generation succeeded using installed tooling. Prisma migration CLI could not reach the isolated Postgres endpoint from this workspace. SQL execution through the connected Neon tool succeeded. The CLI migration is not claimed as passed.
- Local dev server started, but browser access to localhost was blocked by the browser service (`ERR_BLOCKED_BY_CLIENT`). No local visual/browser pass is claimed.
- Required remaining gate: exact-commit Vercel READY build, protected preview tests using the trusted workflow on `main`, and affected-route visual checks. A READY build alone is not a browser pass.

`AGENTS.md` requires explicit approval before a production migration and exact-revision authorization for the credential-backed preview workflow. Before requesting production approval, record the reviewed commit, immutable READY preview, CI result and a fresh recovery point.

Recovery plan: create a named Neon recovery branch from production immediately before migration and verify it exists. Apply only `20260905_community_analytics`, using the established Prisma migration history; do not reset, seed or db-push. If rollout fails, disable `COMMUNITY_ANALYTICS_ENABLED` and restore the previous Vercel deployment. The additive counter table may remain harmlessly; do not drop it or restore unrelated production data without a separate decision. Preserve all users and posts.

## Editorial and search maintenance

1. Submit the updated sitemap in the existing Search Console property after release and inspect `/`, `/pl`, the community/courts pairs and Polish blog pages. Request indexing for representative changed pages, without assuming immediate indexing or ranking gains.
2. Establish a 28-day baseline. Review Polish and English query/page performance separately and compare with the next 28-day period. Track non-brand searches for padel in Kraków, courts, beginners, partners and coaching.
3. Compare community visits, invitation reveals and WhatsApp clicks. Treat click-to-page-view ratios as approximate action ratios, not member conversion rates.
4. Monthly: review member-count wording, dead booking links, opening/facility changes and source dates. Refresh EN and PL together. Preserve historic article publication dates; mark substantive updates separately.
5. The federation article is an April 2026 archive, not current registration guidance. Its Polish version preserves that historical context. Recheck with the relevant federation before publishing a new current guide.
6. Add owner-supplied community photos with permission and factual captions. Add event pages and Event schema only after actual dates, locations and organizer details exist.
7. Pursue local club/coach backlinks and shared community links when the owner is ready. No emails, DMs or outreach messages have been sent. Clubs can link directly to `/pl/spolecznosc` or `/community`; player guides should remain useful independently of booking apps.
8. Keep named authors visible. If renaming the legacy Admin account, identify it by the launch post's author ID, confirm it is Fran's account, and update only its display name. Gabriele's bylines remain unchanged.
