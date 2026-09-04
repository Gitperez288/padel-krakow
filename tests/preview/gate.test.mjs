import test from 'node:test';
import assert from 'node:assert/strict';
import gate from './gate.mjs';
import { repository } from './guard.mjs';

function fixture() {
  const sha = 'a'.repeat(40);
  const output = {};
  const pr = { number: 12, state: 'open', head: { sha, repo: { full_name: repository } }, base: { ref: 'main', repo: { full_name: repository } } };
  const deployment = { id: 1, sha, creator: { login: 'vercel[bot]' }, production_environment: false, environment: 'Preview' };
  const status = { state: 'success', creator: { login: 'vercel[bot]' }, environment_url: 'https://padel-krakow-1qyrlgubo-gitperez288s-projects.vercel.app' };
  const context = { repo: { owner: 'Gitperez288', repo: 'padel-krakow' }, eventName: 'workflow_dispatch', ref: 'refs/heads/main', actor: 'owner', payload: { inputs: { pull_request: '12', reviewed_sha: sha } } };
  const summary = { addRaw: () => summary, write: async () => {} };
  const core = { setOutput: (key, value) => { output[key] = value; }, summary };
  const github = {
    paginate: async (fn, args) => (await fn(args)).data,
    rest: {
      repos: {
        getCollaboratorPermissionLevel: async () => ({ data: { permission: 'admin' } }),
        listPullRequestsAssociatedWithCommit: async () => ({ data: [pr] }),
        listDeployments: async () => ({ data: [deployment] }),
        listDeploymentStatuses: async () => ({ data: [status] }),
        getContent: async () => ({ data: {} }),
      },
      pulls: { get: async () => ({ data: pr }), listReviews: async () => ({ data: [] }) },
    },
  };
  return { sha, output, pr, deployment, status, context, core, github };
}

test('manual dispatch authorizes only reviewed current preview', async () => {
  const f = fixture();
  await gate(f);
  assert.equal(f.output.approved, 'true');
  assert.equal(f.output.sha, f.sha);
  assert.equal(f.output.polish, 'true');
});

test('wrong workflow branch, stale revision, production, foreign deployment fail closed', async () => {
  for (const mutate of [
    f => { f.context.ref = 'refs/heads/feature'; },
    f => { f.context.payload.inputs.reviewed_sha = 'b'.repeat(40); },
    f => { f.deployment.production_environment = true; },
    f => { f.deployment.creator.login = 'other'; },
    f => { f.status.environment_url = 'https://attacker.example'; },
    f => { f.status.state = 'failure'; },
    f => { f.github.rest.repos.getCollaboratorPermissionLevel = async () => ({ data: { permission: 'read' } }); },
  ]) {
    const f = fixture(); mutate(f);
    await assert.rejects(gate(f));
    assert.equal(f.output.approved, undefined);
  }
});

test('automatic run skips without exact-SHA maintainer approval', async () => {
  const f = fixture();
  f.context.eventName = 'workflow_run';
  f.context.payload = { workflow_run: { conclusion: 'success', head_repository: { full_name: repository }, head_sha: f.sha } };
  await gate(f);
  assert.equal(f.output.approved, undefined);
  f.github.rest.pulls.listReviews = async () => ({ data: [{ user: { login: 'owner' }, commit_id: f.sha, state: 'APPROVED' }] });
  await gate(f);
  assert.equal(f.output.approved, 'true');
});

test('Polish route absence disables Polish checks, unexpected API failures do not', async () => {
  const f = fixture();
  f.github.rest.repos.getContent = async () => { throw Object.assign(new Error('Not found'), { status: 404 }); };
  await gate(f);
  assert.equal(f.output.polish, 'false');
  const broken = fixture();
  broken.github.rest.repos.getContent = async () => { throw Object.assign(new Error('Forbidden'), { status: 403 }); };
  await assert.rejects(gate(broken));
  assert.equal(broken.output.approved, undefined);
});
