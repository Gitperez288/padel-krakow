import test from 'node:test';
import assert from 'node:assert/strict';
import { previewRouteHandler, drainPreviewRoutes, routeErrorCategory } from './route-handler.mjs';

const origin = 'https://padel-krakow-1qyrlgubo-gitperez288s-projects.vercel.app';
const secret = 'dummy-regression-secret';
function fixture(url = origin) {
  const calls = [];
  const route = {
    request: () => ({ url: () => url, headers: () => ({ 'X-Vercel-Protection-Bypass': secret }) }),
    fetch: async options => { calls.push(['fetch', options]); return { status: 302 }; },
    fulfill: async options => { calls.push(['fulfill', options]); },
    continue: async options => { calls.push(['continue', options]); },
    abort: async reason => { calls.push(['abort', reason]); },
  };
  return { calls, route, run: () => previewRouteHandler(origin, secret)(route) };
}

test('same-origin fetch stops redirects and fulfills once', async () => {
  const f = fixture(); await f.run();
  assert.deepEqual(f.calls.map(c => c[0]), ['fetch', 'fulfill']);
  assert.equal(f.calls[0][1].maxRedirects, 0);
  assert.equal(f.calls[0][1].headers['x-vercel-protection-bypass'], secret);
  assert.equal(f.calls[1][1].response.status, 302);
});

test('foreign origin continues without bypass header or authenticated fetch', async () => {
  const f = fixture('https://example.com'); await f.run();
  assert.deepEqual(f.calls, [['continue', { headers: {} }]]);
});

test('fetch failure aborts once without exposing request diagnostics', async () => {
  const f = fixture();
  f.route.fetch = async () => { throw new Error(secret); };
  await assert.rejects(f.run(), { message: 'Preview route failure: operation=fetch; category=other; resource=other; origin=preview' });
  assert.deepEqual(f.calls, [['abort', 'failed']]);
});

test('fulfill rejection never attempts abort on an already-handled route', async () => {
  const f = fixture();
  f.route.fulfill = async () => { f.calls.push(['fulfill']); throw new Error(`Route is already handled! ${secret}`); };
  await assert.rejects(f.run(), error => error.message === 'Preview route failure: operation=fulfill; category=already-handled; resource=other; origin=preview' && !error.cause);
  assert.deepEqual(f.calls.map(c => c[0]), ['fetch', 'fulfill']);
});

test('abort and continue errors remain failures but never expose raw diagnostics', async () => {
  for (const method of ['abort', 'continue']) {
    const f = fixture(method === 'continue' ? 'https://example.com' : origin);
    if (method === 'abort') f.route.fetch = async () => { throw new Error(secret); };
    let attempts = 0;
    f.route[method] = async () => { attempts++; throw new Error(secret); };
    await assert.rejects(f.run(), { message: `Preview route failure: operation=${method}; category=other; resource=other; origin=${method === 'continue' ? 'external' : 'preview'}` });
    assert.equal(attempts, 1);
  }
});

test('diagnostic categories never return raw error text', () => {
  for (const [message, expected] of [
    ['Target page, context or browser has been closed', 'target-closed'],
    ['Invalid InterceptionId', 'request-gone'],
    ['Response has been disposed', 'response-disposed'],
    ['net::ERR_ABORTED', 'cancelled'],
    ['Timeout exceeded', 'timeout'],
    [secret, 'other'],
  ]) assert.equal(routeErrorCategory(new Error(message + ' ' + secret)), expected);
});

test('URLs, query tokens, resource names and raw error causes stay out of diagnostics', async () => {
  const f = fixture(origin + '/private/' + secret + '?token=' + secret);
  f.route.request = () => ({ url: () => origin + '/private/' + secret, headers: () => ({}), resourceType: () => secret });
  f.route.fulfill = async () => { throw new Error(secret); };
  await assert.rejects(f.run(), error => !error.message.includes(secret) && !error.cause && error.message.includes('resource=other'));
});

test('cleanup waits for page handlers before draining context handlers', async () => {
  const calls = [];
  let release;
  const pending = new Promise(resolve => { release = resolve; });
  const context = {
    pages: () => [{ unrouteAll: async options => { assert.equal(options.behavior, 'wait'); calls.push('page'); await pending; } }],
    unrouteAll: async options => { assert.equal(options.behavior, 'wait'); calls.push('context'); },
  };
  const cleanup = drainPreviewRoutes(context);
  assert.deepEqual(calls, ['page']);
  release(); await cleanup;
  assert.deepEqual(calls, ['page', 'context']);
});

test('cleanup does not silently swallow handler failures', async () => {
  await assert.rejects(drainPreviewRoutes({ pages: () => [], unrouteAll: async () => { throw new Error('cleanup failed'); } }), /cleanup failed/);
});
