/**
 * GET /go/:id
 * Tracks a link click then redirects to the destination.
 * Stores click counts in KV: { github: 42, x: 17, ... }
 */

const DESTINATIONS = {
  home:      "https://vulkyri.com/",
  github:    "https://github.com/vulkyri",
  x:         "https://twitter.com/vulkyri",
  linkedin:  "https://linkedin.com/in/vulkyri",
  instagram: "https://instagram.com/vulkyri"
};

export async function onRequestGet(context) {
  const { params, env, request } = context;
  const id = (params.id || '').toLowerCase();
  const destination = DESTINATIONS[id];

  if (!destination) {
    return new Response('Not found', { status: 404 });
  }

  // Fire-and-forget click count increment in KV
  if (env.VULKYRI_KV) {
    context.waitUntil(
      (async () => {
        try {
          const raw = await env.VULKYRI_KV.get('click_counts');
          const counts = raw ? JSON.parse(raw) : {};
          counts[id] = (counts[id] || 0) + 1;
          await env.VULKYRI_KV.put('click_counts', JSON.stringify(counts));
        } catch (_) {}
      })()
    );
  }

  // Redirect — 302 so counts always run
  return Response.redirect(destination, 302);
}
