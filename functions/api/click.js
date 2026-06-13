/**
 * POST /api/click
 * Body: { "id": "github" }
 * Increments a click counter in KV for the given link id.
 *
 * GET /api/click?id=github
 * Returns the current click count for a link id.
 */
export async function onRequestPost({ request, env }) {
  if (!env.VULKYRI_KV) {
    return new Response(JSON.stringify({ error: 'KV not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  try {
    const { id } = await request.json();
    if (!id || typeof id !== 'string' || !/^[a-z0-9_-]{1,64}$/.test(id)) {
      return new Response(JSON.stringify({ error: 'Invalid id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const key = `click:${id}`;
    const current = parseInt(await env.VULKYRI_KV.get(key) || '0', 10);
    const next = current + 1;
    await env.VULKYRI_KV.put(key, String(next));
    return new Response(JSON.stringify({ id, clicks: next }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestGet({ request, env }) {
  if (!env.VULKYRI_KV) {
    return new Response(JSON.stringify({ error: 'KV not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id || !/^[a-z0-9_-]{1,64}$/.test(id)) {
    return new Response(JSON.stringify({ error: 'Invalid id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  const clicks = parseInt(await env.VULKYRI_KV.get(`click:${id}`) || '0', 10);
  return new Response(JSON.stringify({ id, clicks }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}
