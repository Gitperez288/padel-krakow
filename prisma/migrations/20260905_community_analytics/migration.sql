CREATE TABLE "UsageDaily" (
  "day" DATE NOT NULL,
  "event" TEXT NOT NULL,
  "page" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "UsageDaily_pkey" PRIMARY KEY ("day", "event", "page", "locale"),
  CONSTRAINT "UsageDaily_count_check" CHECK ("count" >= 0),
  CONSTRAINT "UsageDaily_locale_check" CHECK ("locale" IN ('en', 'pl'))
);
