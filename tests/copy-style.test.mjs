import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const forbidden = /\u2014|&mdash;|&#0*8212;|&#x0*2014;|\\u(?:2014|\{0*2014\})/i;

test('English and Polish website source contains no literal or encoded em dashes', () => {
  const files = execFileSync('git', ['ls-files', '-z', 'src', '_posts', 'public', 'prisma'], { cwd: root, encoding: 'utf8' })
    .split('\0').filter(path => /\.(?:[cm]?[jt]sx?|json|mdx?|html|css|svg)$/i.test(path));
  assert.ok(files.length > 0, 'Website files must be checked');
  const violations = [];
  for (const path of files) {
    readFileSync(new URL(path, new URL('../', import.meta.url)), 'utf8').split('\n').forEach((line, index) => {
      if (forbidden.test(line)) violations.push(`${path}:${index + 1}`);
    });
  }
  assert.deepEqual(violations, [], 'Replace em dashes with natural punctuation in the listed files');
});

test('the guard detects Unicode, HTML entities and JavaScript escapes', () => {
  for (const text of [String.fromCodePoint(8212), '&mdash;', '&#8212;', '&#x2014;', String.raw`\u2014`, String.raw`\u{2014}`]) {
    assert.equal(forbidden.test(text), true);
  }
  for (const text of ['English: welcome.', 'Polski: witamy.', 'people-first', '10–12']) {
    assert.equal(forbidden.test(text), false);
  }
});
