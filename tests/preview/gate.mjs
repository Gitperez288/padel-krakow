import { approvedReviewers, previewOrigin, repository, validatePullRequest } from './guard.mjs';

export default async function gate({ github, context, core }) {
  const [owner, repo] = repository.split('/');
  const scope = { owner, repo };
  if (context.repo.owner !== owner || context.repo.repo !== repo) throw new Error('Unexpected repository');
  const manual = context.eventName === 'workflow_dispatch';
  let sha;
  let number;
  if (manual) {
    if (context.ref !== 'refs/heads/main') throw new Error('Run this workflow from main only');
    sha = context.payload.inputs.reviewed_sha;
    number = Number(context.payload.inputs.pull_request);
    const { data } = await github.rest.repos.getCollaboratorPermissionLevel({ ...scope, username: context.actor });
    if (!['admin', 'maintain', 'write'].includes(data.permission)) throw new Error('Maintainer approval required');
  } else {
    const run = context.payload.workflow_run;
    if (run.conclusion !== 'success' || run.head_repository?.full_name !== repository) return;
    sha = run.head_sha;
    const prs = await github.paginate(github.rest.repos.listPullRequestsAssociatedWithCommit, { ...scope, commit_sha: sha });
    number = prs.find(pr => pr.state === 'open' && pr.head.sha === sha && pr.head.repo?.full_name === repository && pr.base.ref === 'main')?.number;
    if (!number) return;
  }
  if (!Number.isSafeInteger(number) || number < 1) throw new Error('Invalid PR number');
  const { data: pr } = await github.rest.pulls.get({ ...scope, pull_number: number });
  validatePullRequest(pr, sha);
  if (!manual) {
    const reviews = await github.paginate(github.rest.pulls.listReviews, { ...scope, pull_number: number });
    let approved = false;
    for (const username of approvedReviewers(reviews, sha)) {
      const { data } = await github.rest.repos.getCollaboratorPermissionLevel({ ...scope, username });
      if (['admin', 'maintain', 'write'].includes(data.permission)) approved = true;
    }
    if (!approved) {
      await core.summary.addRaw('Not tested: this exact revision needs maintainer approval. After review, use Run workflow with the PR number and full head SHA.').write();
      return;
    }
  }
  // Fail closed: only GitHub deployment records published by Vercel for this SHA.
  const deployments = await github.paginate(github.rest.repos.listDeployments, { ...scope, ref: sha });
  let origin;
  for (const deployment of deployments) {
    if (deployment.sha !== sha || deployment.creator?.login !== 'vercel[bot]' ||
        deployment.production_environment === true || !/^preview$/i.test(deployment.environment)) continue;
    const { data: statuses } = await github.rest.repos.listDeploymentStatuses({ ...scope, deployment_id: deployment.id, per_page: 1 });
    const status = statuses[0];
    if (status?.state !== 'success' || status.creator?.login !== 'vercel[bot]') continue;
    origin = previewOrigin(status.environment_url);
    break;
  }
  if (!origin) throw new Error('No successful, approved Vercel preview for this SHA. Wait for Vercel, then run again.');
  let polish = false;
  try {
    await github.rest.repos.getContent({ ...scope, ref: sha, path: 'src/app/pl/page.tsx' });
    polish = true;
  } catch (error) { if (error.status !== 404) throw error; }
  core.setOutput('sha', sha);
  core.setOutput('origin', origin);
  core.setOutput('polish', String(polish));
  core.setOutput('approved', 'true');
  await core.summary.addRaw(`Approved PR #${number}, revision ${sha}. Target: ${origin}. Polish checks: ${polish}.`).write();
}
