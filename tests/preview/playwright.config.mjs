import { defineConfig, devices } from '@playwright/test';
import { previewOrigin } from './guard.mjs';

// Fail before any browser starts if the target or credential is missing.
const baseURL = previewOrigin(process.env.PREVIEW_URL);
if (!process.env.VERCEL_AUTOMATION_BYPASS_SECRET) throw new Error('Missing preview automation secret');

export default defineConfig({
  testDir: '.',
  testMatch: 'preview.spec.mjs',
  workers: 1,
  retries: 0,
  timeout: 45_000,
  reporter: 'line',
  preserveOutput: 'never',
  use: { baseURL, serviceWorkers: 'block', trace: 'off', screenshot: 'off', video: 'off' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
