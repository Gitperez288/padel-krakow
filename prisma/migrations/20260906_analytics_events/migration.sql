CREATE TABLE "UsageEvent" (
    "id" TEXT NOT NULL,
    "occurredAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "sponsor" TEXT,
    CONSTRAINT "UsageEvent_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "UsageEvent_occurredAt_id_idx" ON "UsageEvent"("occurredAt", "id");
