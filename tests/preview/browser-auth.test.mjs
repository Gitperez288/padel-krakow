import { test } from 'node:test';
import assert from 'node:assert/strict';
import { authorizePreviewBrowser } from './browser-auth.mjs';

const origin = 'https://padel-krakow-123456789-gitperez288s-projects.vercel.app';
const host = new URL(origin).hostname;
function fixture(cookies = [{ name: 'bypass', value: 'dummy', domain: host }], status = 307) {
  const state = { disposed: false, added: [] };
  const api = {
    get: async (url, options) => { state.url = url; state.options = options; return { status: () => status }; },
    storageState: async () => ({ cookies }),
    dispose: async () => { state.disposed = true; },
  };
  return { state, api, factory: { newContext: async () => api }, context: { addCookies: async cookies => { state.added = cookies; } } };
}
test('one exact-host bootstrap, no redirects, narrowed session cookie, disposal', async () => {
  const f = fixture();
  await authorizePreviewBrowser(f.context, f.factory, origin, 'dummy');
  assert.equal(f.state.url, origin);
  assert.equal(f.state.options.maxRedirects, 0);
  assert.equal(f.state.options.headers['x-vercel-set-bypass-cookie'], 'true');
  assert.deepEqual(f.state.added, [{ name: 'bypass', value: 'dummy', domain: host, path: '/', secure: true, httpOnly: true, sameSite: 'Lax', expires: -1 }]);
  assert.equal(f.state.disposed, true);
});
for (const domain of ['.vercel.app', 'example.com', `child.${host}`]) {
  test(`reject cookie outside exact host: ${domain}`, async () => {
    const f = fixture([{ name: 'bypass', value: 'dummy', domain }]);
    await assert.rejects(authorizePreviewBrowser(f.context, f.factory, origin, 'dummy'), /bootstrap failed/);
    assert.deepEqual(f.state.added, []);
    assert.equal(f.state.disposed, true);
  });
}
for (const [cookies, status] of [[[], 307], [[], 401], [[], 500]]) {
  test(`fail closed without usable authorization (${status})`, async () => {
    const f = fixture(cookies, status);
    await assert.rejects(authorizePreviewBrowser(f.context, f.factory, origin, 'dummy'), /bootstrap failed/);
    assert.equal(f.state.disposed, true);
  });
}
test('reject production before creating a request context', async () => {
  await assert.rejects(authorizePreviewBrowser({}, { newContext: () => assert.fail('must not request') }, 'https://padel-krakow.vercel.app', 'dummy'));
});
test('redact transport errors and dispose', async () => {
  const f = fixture();
  f.api.get = async () => { throw new Error('secret-token-in-raw-error'); };
  await assert.rejects(authorizePreviewBrowser(f.context, f.factory, origin, 'dummy'), error => !error.message.includes('secret-token'));
  assert.equal(f.state.disposed, true);
});
