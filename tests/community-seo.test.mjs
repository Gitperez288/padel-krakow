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
const events = [];
const db = { $transaction: promises => Promise.all(promises), usageEvent: { create: async data => { if (failStorage) throw Error("offline"); events.push(data); }, deleteMany: async () => ({ count: 0 }) }, usageDaily: { upsert: async data => { if (failStorage) throw Error('offline'); writes.push(data); }, deleteMany: async () => ({ count: 0 }) } };
let session = null;
let role = 'author';
let exportReport;
let exportQueries = [];
db.user = { findUnique: async () => ({ role }) };
db.usageEvent.findMany = async query => { exportQueries.push(query); return []; };
const modules = new Map();
function load(relative) {
  const filename = path.resolve(root, relative.endsWith('.ts') ? relative : relative + '.ts');
  if (modules.has(filename)) return modules.get(filename).exports;
  const mod = { exports: {} }; modules.set(filename, mod);
  const code = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const localRequire = name => {
    if (name === '@/lib/db') return { db };
    if (name === '@/auth') return { auth: async () => session };
    if (name === '@/lib/analytics-report') return { getAnalyticsReport: async () => exportReport };
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
  assert.equal(events.length, 1);
  assert.ok(events[0].data.occurredAt instanceof Date);
  assert.equal(events[0].data.sponsor, null);
  const sponsorPayload = { event: 'sponsor_code_reveal', page: 'sponsors', locale: 'pl', sponsor: 'vicenti' };
  assert.equal((await POST(request({...sponsorPayload,sponsor:'unknown'}))).status,400);
  assert.equal((await POST(request({...sponsorPayload,page:'home'}))).status,400);
  assert.equal((await POST(request({...payload,sponsor:'vicenti'}))).status,400);
  assert.equal((await POST(request(sponsorPayload))).status,204);
  assert.equal(events.at(-1).data.sponsor, 'vicenti');
  assert.equal(events.at(-1).data.event, 'sponsor_code_reveal');
  assert.equal((await POST(request({...sponsorPayload,event:'sponsor_click',sponsor:'jan-glazek'}))).status,204);
  assert.equal(events.at(-1).data.sponsor, 'jan-glazek');
  failStorage = true;
  assert.equal((await POST(request(payload))).status,503);
  delete process.env.COMMUNITY_ANALYTICS_ENABLED;
});

test('30-day report includes exactly 30 UTC calendar dates and preserves historical counts', () => {
  const { analyticsWindow, summarizeAnalytics } = load('src/lib/analytics');
  const { start } = analyticsWindow(new Date('2026-09-06T10:30:45Z'));
  assert.equal(start.toISOString(), '2026-08-08T00:00:00.000Z');
  const summary = summarizeAnalytics([
    { day: start, event: 'page_view', page: 'community', locale: 'pl', count: 3 },
    { day: start, event: 'page_view', page: 'sponsors', locale: 'en', count: 2 },
    { day: start, event: 'sponsor_code_reveal', page: 'sponsors', locale: 'en', count: 1 },
  ], start);
  assert.equal(summary.metrics[0].value, 5);
  assert.equal(summary.metrics[1].value, 3);
  assert.equal(summary.metrics[5].value, 1);
  assert.equal(summary.daily.length, 30);
  assert.equal(summary.daily[29].date, '2026-09-06');
  assert.equal(summary.daily[0].actions, 1);
  assert.equal(summary.languages[1].views, 3);
});
test('Excel workbook round-trips numeric totals, dates and text without formulas', async () => {
  const { createAnalyticsWorkbook } = load('src/lib/analytics-workbook');
  const { analyticsWindow, summarizeAnalytics } = load('src/lib/analytics');
  const window = analyticsWindow(new Date('2026-09-06T10:30:45Z'));
  const report = { ...window, ...summarizeAnalytics([], window.start), rows: [], partners: [{name:'=1+1',reveals:2,clicks:3}] };
  const workbook = createAnalyticsWorkbook(report);
  const bytes = await workbook.xlsx.writeBuffer();
  const ExcelJS = require('exceljs');
  const restored = new ExcelJS.Workbook(); await restored.xlsx.load(bytes);
  assert.equal(restored.getWorksheet('Sponsors').getCell('A2').value, '=1+1');
  assert.equal(restored.getWorksheet('Sponsors').getCell('B2').value, 2);
  assert.equal(restored.getWorksheet('Read me').getCell('B3').value.toISOString(), window.end.toISOString());
  assert.equal(restored.getWorksheet('Daily trend').rowCount, 31);
  assert.equal(restored.getWorksheet('Summary').views[0].ySplit, 1);
});

test('Excel endpoint requires admin access and exports beyond the dashboard row limit', async () => {
  const { GET } = load('src/app/api/admin/analytics/export/route');
  assert.equal((await GET()).status, 401);
  session = { user: {email:'admin@example.test'} };
  assert.equal((await GET()).status, 403);
  assert.equal(exportQueries.length, 0);
  role = 'admin';
  const { analyticsWindow, summarizeAnalytics } = load('src/lib/analytics');
  const window = analyticsWindow(new Date('2026-09-06T10:30:45Z'));
  exportReport = { ...window, ...summarizeAnalytics([], window.start), rows: [], partners: [] };
  let page = 0;
  db.usageEvent.findMany = async query => {
    exportQueries.push(query);
    return Array.from({length: page++ === 0 ? 2000 : 1}, (_, i) => ({ id:`event-${page}-${i}`,
      occurredAt: window.end, event:'page_view', page:'community', locale:'en', sponsor:null }));
  };
  const response = await GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.match(response.headers.get('content-type'), /spreadsheetml/);
  const workbook = new (require('exceljs').Workbook)();
  await workbook.xlsx.load(Buffer.from(await response.arrayBuffer()));
  assert.equal(workbook.getWorksheet('Events').rowCount, 2002);
  assert.equal(exportQueries.length, 2);
  assert.equal(exportQueries[1].where.OR[1].id.gt, 'event-1-1999');
  db.usageEvent.findMany = async () => { throw Error('offline'); };
  assert.equal((await GET()).status, 503);
});
