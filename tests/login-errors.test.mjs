import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const { NextRequest } = require('next/server');
function load(file, mocks) {
  const code = ts.transpileModule(readFileSync(new URL('../' + file, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(`(function(require,module,exports){${code}\n})`, { console: { error() {} }, URL, Date, process: { env: {} } })(name => name in mocks ? mocks[name] : require(name), mod, mod.exports);
  return mod.exports;
}
async function routeResult(limit, segments = ['callback', 'credentials']) {
  let calls = 0;
  const { POST } = load('src/app/api/auth/[...nextauth]/route.ts', {
    '@/lib/ratelimit': { checkLoginRateLimit: limit },
    '@/auth': { authOptions: {} },
    'next-auth': { __esModule: true, default: () => async () => { calls++; return new Response('handled'); } },
  });
  const response = await POST(new NextRequest('https://example.com/api/auth/' + segments.join('/'), { method: 'POST' }), { params: Promise.resolve({ nextauth: segments }) });
  return { response, calls };
}
test('database failure returns a NextAuth-compatible 503 before credential verification', async () => {
  const { response, calls } = await routeResult(async () => { throw Error('offline'); });
  assert.equal(response.status, 503);
  assert.equal(new URL((await response.json()).url).searchParams.get('error'), 'ServiceUnavailable');
  assert.equal(calls, 0);
});
test('exhausted attempts return a parseable 429 and do not verify credentials', async () => {
  const { response, calls } = await routeResult(async () => ({ allowed: false, retryAfter: 123 }));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '123');
  assert.equal(new URL((await response.json()).url).searchParams.get('error'), 'RateLimit');
  assert.equal(calls, 0);
});
test('allowed attempts reach NextAuth and signout is not login-limited', async () => {
  assert.equal((await routeResult(async () => ({ allowed: true }))).calls, 1);
  assert.equal((await routeResult(async () => { throw Error('must not run'); }, ['signout'])).calls, 1);
});
test('limiter binds a keyed digest instead of IP and fails closed without secret', async () => {
  const bound = [];
  const db = { $transaction: async fn => fn({ $executeRaw: async () => 0, $queryRaw: async (...args) => { bound.push(args[1]); return [{ count: 6, retryAfter: 30 }]; } }) };
  // Override only this VM's environment; never read real credentials.
  const code = ts.transpileModule(readFileSync(new URL('../src/lib/ratelimit.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} }; const env = { NEXTAUTH_SECRET: 'test-only-secret' };
  vm.runInNewContext(`(function(require,module,exports){${code}\n})`, { process: { env } })(name => name === '@/lib/db' ? { db } : require(name), mod, mod.exports);
  assert.equal((await mod.exports.checkLoginRateLimit('192.0.2.1')).allowed, false);
  await mod.exports.checkLoginRateLimit('192.0.2.1');
  assert.match(bound[0], /^[a-f0-9]{64}$/);
  assert.equal(bound[0], bound[1]);
  delete env.NEXTAUTH_SECRET;
  await assert.rejects(mod.exports.checkLoginRateLimit('192.0.2.1'));
});
async function submit(signIn) {
  const values = []; let index = 0; const pushes = [];
  const { default: Login } = load('src/app/(en)/auth/login/page.tsx', {
    'next-auth/react': { signIn },
    'next/navigation': { useRouter: () => ({ push: x => pushes.push(x), refresh() {} }) },
    'react': { useState: initial => { const i = index++; values[i] = initial; return [initial, v => values[i] = v]; } },
    'next/link': { __esModule: true, default: 'a' },
  });
  function form(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'form') return node;
    for (const child of [node.props?.children].flat()) { const found = form(child); if (found) return found; }
  }
  await form(Login()).props.onSubmit({ preventDefault() {} });
  return { error: values[2], loading: values[3], pushes };
}
test('HTML error or network rejection releases the button and reports service failure', async () => {
  const result = await submit(async () => { throw new SyntaxError('Unexpected token <'); });
  assert.equal(result.loading, false);
  assert.match(result.error, /temporarily unavailable/);
  assert.equal(result.pushes.length, 0);
});
test('rate limiting is distinguished from incorrect credentials', async () => {
  const limited = await submit(async () => ({ status: 429, ok: false, error: 'RateLimit' }));
  assert.match(limited.error, /Too many/);
  assert.equal(limited.loading, false);
  const invalid = await submit(async () => ({ status: 401, ok: false, error: 'CredentialsSignin' }));
  assert.equal(invalid.error, 'Invalid email or password');
});
test('missing or unavailable responses cannot be mistaken for successful login', async () => {
  for (const response of [undefined, { status: 503, ok: false, error: 'ServiceUnavailable' }]) {
    const result = await submit(async () => response);
    assert.match(result.error, /temporarily unavailable/);
    assert.equal(result.loading, false);
    assert.equal(result.pushes.length, 0);
  }
});
test('successful authentication navigates to admin', async () => {
  const result = await submit(async () => ({ status: 200, ok: true, error: null }));
  assert.equal(result.error, '');
  assert.equal(result.loading, false);
  assert.deepEqual(result.pushes, ['/admin/blog']);
});
