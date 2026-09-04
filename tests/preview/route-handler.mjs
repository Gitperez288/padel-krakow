import { requestHeaders } from './guard.mjs';

// Never retry a terminal route operation (fulfill/continue/abort). Playwright
// may mark the route handled before that operation's promise rejects.
export function routeErrorCategory(error) {
  const message = String(error?.message ?? '');
  if (/Route is already handled/.test(message)) return 'already-handled';
  if (/Target.*closed|context.*closed|page.*closed/i.test(message)) return 'target-closed';
  if (/Invalid InterceptionId|Invalid interception|No resource with given identifier/i.test(message)) return 'request-gone';
  if (/Response has been disposed|Fetch response has been disposed/i.test(message)) return 'response-disposed';
  if (/ERR_ABORTED|NS_BINDING_ABORTED/.test(message)) return 'cancelled';
  if (/timeout|timed out/i.test(message)) return 'timeout';
  return 'other';
}

function diagnostic(operation, request, origin, error) {
  const resource = request.resourceType?.();
  const type = ['document', 'xhr', 'fetch', 'image', 'script', 'stylesheet', 'font'].includes(resource) ? resource : 'other';
  // Deliberately exclude raw messages, headers, bodies, URLs and causes.
  return `Preview route failure: operation=${operation}; category=${routeErrorCategory(error)}; resource=${type}; origin=${new URL(request.url()).origin === origin ? 'preview' : 'external'}`;
}

async function complete(operation, name, request, origin) {
  try { await operation(); }
  catch (error) { throw new Error(diagnostic(name, request, origin, error)); }
}

export function previewRouteHandler(origin, secret) {
  return async route => {
    const request = route.request();
    const headers = requestHeaders(request.url(), origin, request.headers(), secret);
    if (new URL(request.url()).origin !== origin) {
      return complete(() => route.continue({ headers }), 'continue', request, origin);
    }
    let response;
    try {
      // Redirects must return to the browser for a fresh origin check.
      response = await route.fetch({ headers, maxRedirects: 0 });
    } catch (error) {
      // Only a fetch failure may abort: no terminal operation has started yet.
      await complete(() => route.abort('failed'), 'abort', request, origin);
      throw new Error(diagnostic('fetch', request, origin, error));
    }
    return complete(() => route.fulfill({ response }), 'fulfill', request, origin);
  };
}

export async function drainPreviewRoutes(context) {
  // Drain page overrides first (the invitation-error test uses one), while
  // context routing is still available for fallback. Do not ignore errors.
  for (const page of context.pages()) await page.unrouteAll({ behavior: 'wait' });
  await context.unrouteAll({ behavior: 'wait' });
}
