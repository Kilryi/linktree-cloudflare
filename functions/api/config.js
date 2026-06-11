/**
 * GET  /api/config  — returns the live site config from KV.
 * POST /api/config  — updates the live config in KV (requires ADMIN_SECRET header).
 *
 * Once KV is wired up (see wrangler.jsonc), the frontend will automatically
 * load config from here on every page load instead of using the hardcoded defaults.
 *
 * To seed initial config:
 *   npx wrangler kv key put --binding=VULKYRI_KV site_config '{"status":{"status":"online","text":"Open to opportunities"}}'
 */

const DEFAULT_CONFIG = {
  status: { status: 'online', text: 'Open to opportunities' },
  countdown: null,
  updates: [
    { date: 'Jun 2026', text: 'New projects dropping soon — watch this space.' }
  ],
  featuredLinks: [
    {
      title: 'Book / Enquire',
      description: 'Send a private, discreet enquiry',
      icon: '📩',
      url: 'mailto:hello@vulkyri.com',
      badge: 'Bookings open',
      delay: 0.05
    }
  ],
  links: [
    { title: 'GitHub',    description: 'Projects, repos & open source', icon: 'gh', url: 'https://vulkyri.com/go/github', delay: 0.1, copyable: { value: 'vulkyri', label: 'Copy username' } },
    { title: 'X / Twitter', description: 'Thoughts & updates',          icon: 'x',  url: 'https://vulkyri.com/go/x',      delay: 0.15 },
    { title: 'LinkedIn',  description: 'Professional profile',           icon: '💼', url: 'https://vulkyri.com/go/linkedin', delay: 0.2 },
    { title: 'Instagram', description: 'Photos & life updates',          icon: '📸', url: 'https://vulkyri.com/go/instagram', delay: 0.25 }
  ]
};

export async function onRequestGet(context) {
  const { env } = context;
  let config = DEFAULT_CONFIG;
  if (env.VULKYRI_KV) {
    try {
      const raw = await env.VULKYRI_KV.get('site_config');
      if (raw) config = { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
    } catch (_) {}
  }
  return new Response(JSON.stringify(config), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });
}

export async function onRequestPost(context) {
  const { env, request } = context;
  const secret = request.headers.get('x-admin-secret');
  const expected = env.ADMIN_SECRET;
  if (!expected || secret !== expected) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'content-type': 'application/json' } });
  }
  if (!env.VULKYRI_KV) {
    return new Response(JSON.stringify({ error: 'KV not configured' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }
  let body;
  try { body = await request.json(); } catch (_) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
  const existing = await env.VULKYRI_KV.get('site_config').then(r => r ? JSON.parse(r) : {}).catch(() => ({}));
  const merged = { ...existing, ...body };
  await env.VULKYRI_KV.put('site_config', JSON.stringify(merged));
  return new Response(JSON.stringify({ ok: true, config: merged }), {
    headers: { 'content-type': 'application/json' }
  });
}
