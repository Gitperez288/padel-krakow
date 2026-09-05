import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = fileURLToPath(new URL('../', import.meta.url));
const writes = [];
let failStorage = false;
const db = { usageDaily: { upsert: async data => { if (failStorage) throw Error('offline'); writes.push(data); }, deleteMany: async () => ({ count: 0 }) } };
const modules = new Map();
function load(relative) {
  const filename = path.resolve(root, relative.endsWith('.ts') ? relative : relative + '.ts');
  if (modules.has(filename)) return modules.get(filename).exports;
  const mod = { exports: {} }; modules.set(filename, mod);
  const code = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const localRequire = name => {
    if (name === '@/lib/db') return { db };
    if (name.startsWith('@/')) return load('src/' + name.slice(2));
    if (name.startsWith('.')) return load(path.relative(root, path.resolve(path.dirname(filename), name)));
    return require(name);
  };
  vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename })(localRequire, mod, mod.exports);
  return mod.exports;
}
const { localizedRoutes, localizePath } = load('src/lib/i18n');
const { pageMetadata } = load('src/lib/page-metadata');
const { plainText, jsonLd, publicAuthor } = load('src/lib/blog-content');
const { usagePage } = load('src/lib/usage');
const { POST } = load('src/app/api/usage/route');
const { NextRequest } = require('next/server');

test('every public language pair has matching canonicals and reciprocal alternates', () => {
  for (const [key,pair] of Object.entries(localizedRoutes)) {
    for (const locale of ['en','pl']) {
      assert.equal(localizePath(pair.en, locale), pair[locale]);
      const metadata = pageMetadata(key,locale);
      assert.equal(new URL(metadata.alternates.canonical).pathname, pair[locale]);
      assert.equal(new URL(metadata.alternates.languages.en).pathname, pair.en);
      assert.equal(new URL(metadata.alternates.languages.pl).pathname, pair.pl);
    }
  }
  assert.equal(localizePath('/index','en'),'/');
  assert.equal(localizePath('/index','pl'),'/pl');
  assert.equal(localizePath('/blog/untranslated-future-post','pl'),'/blog/untranslated-future-post');
});
test('blog descriptions strip HTML, keep entities readable and safely serialize JSON-LD', () => {
  assert.equal(plainText('<p>Padel &amp; people</p>'),'Padel & people');
  assert.equal(plainText('<script>alert(1)</script><p>Play</p>'),'Play');
  assert.ok(plainText('A long description '.repeat(30)).length <= 160);
  assert.ok(!jsonLd({ headline: '</script><script>alert(1)</script>' }).includes('<'));
  assert.equal(publicAuthor('unrelated','Admin'),'Admin');
  assert.equal(publicAuthor('a-new-beginning-for-padel-in-cracow-power-to-the-people','Admin'),'Fran');
});
test('analytics categories do not retain article slugs, tokens or admin paths', () => {
  assert.equal(usagePage('/pl/blog/example'),'article');
  assert.equal(usagePage('/admin/blog'),undefined);
  assert.equal(usagePage('/api/auth/session'),undefined);
  assert.equal(usagePage('/pl/spolecznosc'),'community');
});
const request = (body, headers = {}) => new NextRequest('https://example.com/api/usage', { method: 'POST', headers: { origin: 'https://example.com', 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
const payload = { event: 'whatsapp_click', page: 'community', locale: 'pl' };
test('analytics fails closed when disabled, rejects unapproved data, respects privacy and keeps clicks separate', async () => {
  delete process.env.COMMUNITY_ANALYTICS_ENABLED;
  assert.equal((await POST(request(payload))).status,204); assert.equal(writes.length,0);
  process.env.COMMUNITY_ANALYTICS_ENABLED = 'true';
  assert.equal((await POST(request(payload,{origin:'https://other.example'}))).status,403);
  assert.equal((await POST(request('{'))).status,400);
  assert.equal((await POST(request({...payload, invitation:'private-token'}))).status,400);
  assert.equal((await POST(request({...payload,event:'confirmed_join'}))).status,400);
  assert.equal((await POST(request({...payload,locale:'xx'}))).status,400);
  assert.equal((await POST(request('x'.repeat(513)))).status,413);
  assert.equal((await POST(request(payload,{'dnt':'1'}))).status,204);
  assert.equal((await POST(request(payload,{'sec-gpc':'1'}))).status,204);
  assert.equal((await POST(request(payload,{'user-agent':'Googlebot'}))).status,204);
  assert.equal(writes.length,0);
  assert.equal((await POST(request(payload))).status,204);
  assert.equal(writes.length,1);
  assert.deepEqual(Object.keys(writes[0].create).sort(),['count','day','event','locale','page']);
  assert.equal(writes[0].create.event,'whatsapp_click');
  failStorage = true;
  assert.equal((await POST(request(payload))).status,503);
  delete process.env.COMMUNITY_ANALYTICS_ENABLED;
});
