export const repository = 'Gitperez288/padel-krakow';

export function previewOrigin(value) {
  const url = new URL(value);
  // Accept only this project's immutable deployment hostnames, not aliases or production.
  if (url.protocol !== 'https:' || url.port || url.username || url.password ||
      url.search || url.hash || url.pathname !== '/' ||
      !/^padel-krakow-[a-z0-9]{9}-gitperez288s-projects\.vercel\.app$/.test(url.hostname)) {
    throw new Error('Target is not an approved immutable Padel Krakow preview URL');
  }
  return url.origin;
}

export function validatePullRequest(pr, sha) {
  if (!/^[a-f0-9]{40}$/.test(sha) || pr.state !== 'open' ||
      pr.head.repo?.full_name !== repository || pr.base.repo?.full_name !== repository ||
      pr.base.ref !== 'main' || pr.head.sha !== sha) {
    throw new Error('Only the current commit of an open, same-repository PR into main may be tested');
  }
}

export function approvedReviewers(reviews, sha) {
  const latest = new Map();
  for (const review of reviews) {
    if (['APPROVED', 'CHANGES_REQUESTED', 'DISMISSED'].includes(review.state)) latest.set(review.user.login, review);
  }
  return [...latest.values()].filter(r => r.state === 'APPROVED' && r.commit_id === sha).map(r => r.user.login);
}

export function requestHeaders(url, origin, headers, secret) {
  const clean = Object.fromEntries(Object.entries(headers).filter(([key]) => !/^x-vercel-(protection-bypass|set-bypass-cookie)$/i.test(key)));
  // Never authorize redirected or third-party destinations through global headers/cookies.
  return new URL(url).origin === origin ? { ...clean, 'x-vercel-protection-bypass': secret } : clean;
}
