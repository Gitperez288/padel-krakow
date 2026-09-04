import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: '.', testMatch: 'browser-auth.spec.mjs', workers: 1, retries: 0,
  timeout: 30000, reporter: 'line', preserveOutput: 'never',
  use: { trace: 'off', screenshot: 'off', video: 'off', serviceWorkers: 'block' },
});
