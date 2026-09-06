# Community analytics

The admin dashboard reports today plus the preceding 29 UTC calendar dates.
`UsageDaily` remains the source of aggregate totals, preserving pre-update history.
`UsageEvent` records anonymous timestamped actions and optional allowlisted sponsor
IDs. Both writes occur in one transaction. Existing timestamps are not backfilled.

Sponsor codes and their instructions appear after a button click. A reveal is
counted once per mounted sponsor card; another visit can produce another reveal.
Sponsor links record outbound clicks separately. These are action counts, not
unique people, confirmed redemptions, purchases, bookings or WhatsApp joins.
Codes are public member benefits, not secrets or access credentials.

The dashboard shows the latest 100 timestamped actions; the Excel export contains
all recorded actions in the reporting window plus summary, daily, page, language
and sponsor sheets. Export values refresh at download time. Both dashboard and
export require a current admin role. Export responses are private and uncached.

Daily totals retain the existing 400-day policy. Timestamped actions are excluded
from reports after their 30-calendar-day window and pruned on new tracking traffic,
at most once per day per instance. An idle database can retain older records until
traffic resumes. No visitor identifiers, URLs, referrers or raw IPs are stored.
DNT, GPC, bot filtering and analytics environment opt-in remain in force.

## Rollout

1. Apply `20260906_analytics_events` on the isolated PR preview database and
   verify the admin report and code reveals in EN and PL. Keep preview analytics
   isolated and explicitly enabled only when testing tracking.
2. Before merging, obtain approval for the additive production migration and
   create a recovery point. Deploy the migration before the application update.
   The old application safely ignores the new table.
3. Complete the exact-revision protected preview checks in the development runbook.
4. Merge after approval and verify production separately.

If the migration has not been applied, the dashboard/export explicitly report
unavailability and telemetry returns 503 without blocking code or invitation
reveals. Do not deploy the application first. Roll back application code if needed;
the additional table can remain in place, preserving collected data.

Validation: the exact migration DDL, index and an insert with server timestamp
were tested in a rolled-back transaction on `vercel-dev`. Regression tests cover
privacy, sponsor allowlisting, period boundaries, workbook round trips, admin-only
export and export pagination beyond 2,000 events. These tests do not replace a
protected live preview check.
