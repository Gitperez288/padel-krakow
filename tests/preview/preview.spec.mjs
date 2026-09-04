import { test, expect } from '@playwright/test';
import { previewOrigin, requestHeaders } from './guard.mjs';
import { previewRouteHandler, drainPreviewRoutes } from './route-handler.mjs';

const origin = previewOrigin(process.env.PREVIEW_URL);
const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const polish = process.env.EXPECT_POLISH === 'true';
const production = 'https://padel-krakow.vercel.app';

test.beforeEach(async ({ context }) => {
  await context.route('**/*', previewRouteHandler(origin, secret));
});

test.afterEach(async ({ context }) => {
  // Finish active handlers before Playwright tears down pages and the context.
  await drainPreviewRoutes(context);
});

for (const path of ['/', '/blog', '/sitemap.xml', '/api/auth/session']) {
  test(`smoke ${path}`, async ({ request }) => {
    let response;
    try {
      response = await request.get(`${origin}${path}`, {
        headers: requestHeaders(`${origin}${path}`, origin, {}, secret),
        maxRedirects: 0,
      });
    } catch { throw new Error('Preview HTTP request failed (sensitive request diagnostics suppressed)'); }
    expect(response.status()).toBe(200);
    const body = await response.text();
    if (path === '/sitemap.xml') expect(body.includes('<urlset')).toBe(true);
    else if (path === '/api/auth/session') expect(() => JSON.parse(body)).not.toThrow();
    else expect(body.includes('<html')).toBe(true);
  });
}

const pairs = [['/', '/pl'], ['/courts', '/pl/korty'], ['/community', '/pl/spolecznosc'], ['/levels', '/pl/poziomy']];
for (const [en, pl] of pairs) {
  for (const [path, lang, alternate] of [[en, 'en', pl], ...(polish ? [[pl, 'pl', en]] : [])]) {
    test(`metadata ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect.poll(async () => new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).href).toBe(new URL(path, production).href);
      await expect(page).not.toHaveTitle('');
      if (polish) {
        await expect.poll(async () => new URL(await page.locator(`link[rel="alternate"][hreflang="${lang === 'en' ? 'pl' : 'en'}"]`).getAttribute('href')).href).toBe(new URL(alternate, production).href);
        const switcher = page.getByRole('link', { name: lang === 'en' ? 'PL' : 'EN', exact: true }).first();
        await switcher.click();
        await expect(page).toHaveURL(`${origin}${alternate}`);
      }
    });
  }
}

test('failed invitation reveal offers retry', async ({ page }) => {
  await page.goto('/community');
  await page.route('**/community', route => route.request().method() === 'POST' ? route.abort('failed') : route.fallback());
  await page.getByRole('button', { name: /Reveal Link/ }).click();
  await expect(page.getByRole('button', { name: /Try Again/ })).toBeVisible();
});

test('mobile navigation opens', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await expect(page.getByRole('link', { name: /Courts/ }).last()).toBeVisible();
});

test('court search filters results', async ({ page }) => {
  await page.goto('/courts');
  const sidebar = page.getByTestId('courts-sidebar-section');
  await expect(sidebar).toContainText('Błonia');
  const search = page.getByPlaceholder(/Search by name or address/);
  await search.fill('no-such-court-98765');
  await expect(sidebar).not.toContainText('Błonia');
  await search.fill('');
  await expect(sidebar).toContainText('Błonia');
});

for (const [path, reveal, join] of [['/community', /Reveal Link/, /Join WhatsApp Community/], ...(polish ? [['/pl/spolecznosc', /Pokaż link/, /Dołącz na WhatsAppie/]] : [])]) {
  test(`private invitation reveal ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    // Boolean assertions avoid putting the private invitation into failure logs.
    expect((await response.text()).includes('https://chat.whatsapp.com/')).toBe(false);
    await page.getByRole('button', { name: reveal }).click();
    const link = page.getByRole('link', { name: join });
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(Boolean(href && new URL(href).origin === 'https://chat.whatsapp.com')).toBe(true);
    // Never follow the invitation or join the group.
  });
}
