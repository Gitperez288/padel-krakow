import { requestHeaders } from './guard.mjs';

// Never retry a terminal route operation (fulfill/continue/abort). Playwright
// may mark the route handled before that operation's promise rejects.
async function complete(operation) {
  try { await operation(); }
  catch { throw new Error('Preview route completion failed (sensitive diagnostics suppressed)'); }
}

export function previewRouteHandler(origin, secret) {
  return async route => {
    const request = route.request();
    const headers = requestHeaders(request.url(), origin, request.headers(), secret);
    if (new URL(request.url()).origin !== origin) {
      return complete(() => route.continue({ headers }));
    }
    let response;
    try {
      // Redirects must return to the browser for a fresh origin check.
      response = await route.fetch({ headers, maxRedirects: 0 });
    } catch {
      // Only a fetch failure may abort: no terminal operation has started yet.
      return complete(() => route.abort('failed'));
    }
    return complete(() => route.fulfill({ response }));
  };
}

export async function drainPreviewRoutes(context) {
  // Drain page overrides first (the invitation-error test uses one), while
  // context routing is still available for fallback. Do not ignore errors.
  for (const page of context.pages()) await page.unrouteAll({ behavior: 'wait' });
  await context.unrouteAll({ behavior: 'wait' });
}
