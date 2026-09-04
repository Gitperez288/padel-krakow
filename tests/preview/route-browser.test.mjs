import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { chromium } from 'playwright';
import { previewRouteHandler, drainPreviewRoutes } from './route-handler.mjs';

// Real Chromium, loopback servers, dummy credential only. No Vercel/app/database.
test('real browser: navigation with pending requests and cross-origin redirects', { timeout: 60_000 }, async () => {
  const secret = 'dummy-browser-regression';
  let slowResponse;
  let signalSlow;
  let externalHeader;
  const receivedSlow = () => new Promise(resolve => { signalSlow = resolve; });
  const external = createServer((req, res) => {
    externalHeader = req.headers['x-vercel-protection-bypass'];
    res.end('external destination');
  });
  external.listen(0, '127.0.0.1'); await once(external, 'listening');
  const externalOrigin = `http://127.0.0.1:${external.address().port}`;
  const server = createServer((req, res) => {
    if (req.headers['x-vercel-protection-bypass'] !== secret) { res.writeHead(401); res.end(); return; }
    if (req.url === '/slow') { slowResponse = res; signalSlow(); return; }
    if (req.url === '/redirect') { res.writeHead(302, { location: externalOrigin }); res.end(); return; }
    res.setHeader('content-type', 'text/html');
    res.end(req.url === '/start' ? '<a href="/next">EN</a><script>fetch("/slow").catch(()=>{})</script>' : '<h1>Destination</h1>');
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  let browser;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext({ serviceWorkers: 'block' });
    const errors = [];
    const handler = previewRouteHandler(`http://127.0.0.1:${server.address().port}`, secret);
    // Capture failures explicitly; assert them after draining, never ignore them.
    await context.route('**/*', route => handler(route).catch(error => { errors.push(error.message); }));
    const page = await context.newPage();
    const origin = `http://127.0.0.1:${server.address().port}`;
    for (let i = 0; i < 5; i++) {
      const pending = receivedSlow();
      await page.goto(`${origin}/start`);
      await pending;
      await page.getByRole('link', { name: 'EN', exact: true }).click();
      await page.waitForURL(`${origin}/next`);
      slowResponse.end('completed after navigation');
    }
    await page.goto(`${origin}/redirect`);
    assert.equal(page.url(), externalOrigin + '/');
    assert.equal(externalHeader, undefined);
    await drainPreviewRoutes(context);
    assert.deepEqual(errors, []);
    await context.close();
  } finally {
    slowResponse?.end();
    await browser?.close();
    server.closeAllConnections(); external.closeAllConnections();
    await Promise.all([new Promise(resolve => server.close(resolve)), new Promise(resolve => external.close(resolve))]);
  }
});
