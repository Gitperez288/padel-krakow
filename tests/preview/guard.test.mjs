import test from 'node:test';
import assert from 'node:assert/strict';
import { previewOrigin, validatePullRequest, approvedReviewers, requestHeaders, repository } from './guard.mjs';
const origin = 'https://padel-krakow-1qyrlgubo-gitperez288s-projects.vercel.app';
const sha = 'a'.repeat(40);
test('preview allowlist rejects production, aliases, credentials and foreign hosts', () => {
  assert.equal(previewOrigin(origin), origin);
  for (const value of ['https://padel-krakow.vercel.app', origin + '.evil.com', origin + '?token=x', origin + '/api', origin.replace('https:', 'http:'), origin.replace('https://', 'https://user:pass@'), origin.replace('1qyrlgubo', 'git-main'), origin + ':444']) assert.throws(() => previewOrigin(value));
});
test('forks, stale revisions and closed PRs are rejected', () => {
  const pr = { state: 'open', head: { sha, repo: { full_name: repository } }, base: { ref: 'main', repo: { full_name: repository } } };
  validatePullRequest(pr, sha);
  assert.throws(() => validatePullRequest(pr, 'b'.repeat(40)));
  assert.throws(() => validatePullRequest({ ...pr, state: 'closed' }, sha));
  assert.throws(() => validatePullRequest({ ...pr, head: { ...pr.head, repo: { full_name: 'attacker/fork' } } }, sha));
});
test('approval must apply to this exact commit and not be withdrawn', () => {
  const review = { user: { login: 'owner' }, commit_id: sha, state: 'APPROVED' };
  assert.deepEqual(approvedReviewers([review], sha), ['owner']);
  assert.deepEqual(approvedReviewers([review], 'b'.repeat(40)), []);
  assert.deepEqual(approvedReviewers([review, { ...review, state: 'CHANGES_REQUESTED' }], sha), []);
  assert.deepEqual(approvedReviewers([review, { ...review, state: 'DISMISSED' }], sha), []);
});
test('authorization is scoped to exact origin and stripped elsewhere', () => {
  const secret = 'dummy-test-value';
  assert.equal(requestHeaders(origin + '/pl', origin, {}, secret)['x-vercel-protection-bypass'], secret);
  const supplied = { 'X-Vercel-Protection-Bypass': secret, 'x-vercel-set-bypass-cookie': 'true', accept: 'text/html' };
  assert.deepEqual(requestHeaders('https://example.com', origin, supplied, secret), { accept: 'text/html' });
  assert.deepEqual(requestHeaders(origin + '.evil.com', origin, supplied, secret), { accept: 'text/html' });
});
