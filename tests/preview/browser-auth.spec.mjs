import { test, expect } from '@playwright/test';
import { authorizePreviewBrowser } from './browser-auth.mjs';

const origin = 'https://padel-krakow-123456789-gitperez288s-projects.vercel.app';
const host = new URL(origin).hostname;
const external = 'https://external.example';
// Simulated gateway issues a dummy cookie. Real Chromium handles cookie scope,
// scripts, full document navigation and fixture teardown in Playwright Test.
test('native browser auth survives script navigation and isolates external requests', async ({ context, page }) => {
  let disposed = false;
  await authorizePreviewBrowser(context, { newContext: async () => ({
    get: async (url, options) => {
      expect(url).toBe(origin);
      expect(options.maxRedirects).toBe(0);
      return { status: () => 307 };
    },
    storageState: async () => ({ cookies: [{ name: 'bypass', value: 'dummy-cookie', domain: host }] }),
    dispose: async () => { disposed = true; },
  }) }, origin, 'dummy-token');
  expect(disposed).toBe(true);
  const violations = [];
  let scripts = 0;
  let externalRequests = 0;
  await context.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    const headers = await request.allHeaders();
    if (headers['x-vercel-protection-bypass']) violations.push('global bypass header');
    if (url.origin === external) {
      externalRequests++;
      if (headers.cookie) violations.push('external cookie');
      return route.fulfill({ contentType: 'text/html', body: '<h1>External</h1>' });
    }
    if (!headers.cookie?.includes('bypass=dummy-cookie')) violations.push('missing preview cookie');
    if (url.pathname === '/redirect') return route.fulfill({ status: 302, headers: { location: external } });
    if (url.pathname === '/app.js') {
      scripts++;
      return route.fulfill({ contentType: 'application/javascript', body: 'document.documentElement.dataset.ready = "yes";' });
    }
    return route.fulfill({ contentType: 'text/html', body: '<html><script src="/app.js"></script><a href="/pl">PL</a><a href="/">EN</a></html>' });
  });
  for (let i = 0; i < 8; i++) {
    await page.goto(origin);
    await expect(page.locator('html')).toHaveAttribute('data-ready', 'yes');
    expect(await page.evaluate(() => document.cookie)).toBe('');
    await page.getByRole('link', { name: 'PL', exact: true }).click();
    await expect(page).toHaveURL(`${origin}/pl`);
    await expect(page.locator('html')).toHaveAttribute('data-ready', 'yes');
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await expect(page).toHaveURL(`${origin}/`);
  }
  await page.goto(`${origin}/redirect`);
  await expect(page).toHaveURL(`${external}/`);
  expect(scripts).toBeGreaterThanOrEqual(16);
  expect(externalRequests).toBeGreaterThan(0);
  expect(violations).toEqual([]);
  await context.unrouteAll({ behavior: 'wait' });
});
