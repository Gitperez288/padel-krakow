import { previewOrigin } from './guard.mjs';

// Bootstrap outside the browser: never install global headers or proxy assets.
export async function authorizePreviewBrowser(context, requestFactory, url, secret) {
  const origin = previewOrigin(url);
  if (!secret) throw new Error('Preview bypass secret is missing');
  let bootstrap;
  try {
    bootstrap = await requestFactory.newContext();
    const response = await bootstrap.get(origin, {
      headers: {
        'x-vercel-protection-bypass': secret,
        'x-vercel-set-bypass-cookie': 'true',
      },
      maxRedirects: 0,
      timeout: 15000,
    });
    if (response.status() < 200 || response.status() >= 400) throw new Error();
    const { cookies } = await bootstrap.storageState();
    const host = new URL(origin).hostname;
    if (!cookies.length || cookies.some(cookie => cookie.domain.replace(/^\./, '') !== host)) {
      throw new Error();
    }
    // Host-only, HTTPS-only, inaccessible to page JS, session-only. Never persist
    // storageState or log response/error objects containing credentials.
    await context.addCookies(cookies.map(cookie => ({
      name: cookie.name, value: cookie.value, domain: host, path: '/',
      secure: true, httpOnly: true, sameSite: 'Lax', expires: -1,
    })));
  } catch {
    throw new Error('Preview cookie bootstrap failed (sensitive diagnostics suppressed)');
  } finally {
    if (bootstrap) await bootstrap.dispose().catch(() => {});
  }
}
