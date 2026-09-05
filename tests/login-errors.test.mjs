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
async function middlewareResult(limit) {
  const { middleware } = load('src/middleware.ts', {
    '@/lib/ratelimit': { loginRatelimit: { limit } },
    'next-auth/jwt': { getToken: async () => null },
  });
  return middleware(new NextRequest('https://example.com/api/auth/callback/credentials', { method: 'POST' }));
}
test('rate-limit network failure returns a NextAuth-compatible 503', async () => {
  const res = await middlewareResult(async () => { throw Error('offline'); });
  assert.equal(res.status, 503);
  assert.equal(new URL((await res.json()).url).searchParams.get('error'), 'ServiceUnavailable');
  assert.equal(res.headers.get('retry-after'), '60');
});
test('timeout cannot silently bypass login protection', async () => {
  const res = await middlewareResult(async () => ({ success: true, reason: 'timeout', pending: Promise.resolve() }));
  assert.equal(res.status, 503);
});
test('exhausted attempts return a parseable 429', async () => {
  const res = await middlewareResult(async () => ({ success: false, reset: Date.now() + 900000, pending: Promise.resolve() }));
  assert.equal(res.status, 429);
  assert.equal(new URL((await res.json()).url).searchParams.get('error'), 'RateLimit');
});
test('allowed attempts proceed even if optional analytics fails', async () => {
  const res = await middlewareResult(async () => ({ success: true, pending: Promise.reject(Error('analytics offline')) }));
  assert.equal(res.headers.get('x-middleware-next'), '1');
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
