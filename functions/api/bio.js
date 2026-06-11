/**
 * POST /api/bio
 * Uses Workers AI to generate a short profile bio.
 * Body: { tone?: string, keywords?: string }
 * Returns: { bio: string }
 */

export async function onRequestPost(context) {
  const { env, request } = context;

  if (!env.AI) {
    return new Response(
      JSON.stringify({ error: 'Workers AI binding not configured. Add ai.binding=AI to wrangler.jsonc and set it in the Cloudflare dashboard.' }),
      { status: 503, headers: { 'content-type': 'application/json' } }
    );
  }

  let body = {};
  try { body = await request.json(); } catch (_) {}

  const tone     = body.tone     || 'confident and professional';
  const keywords = body.keywords || 'creator, exclusive content, bookings, online presence';

  const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: [
      {
        role: 'system',
        content: `You write short, punchy link-in-bio profile descriptions.
                  Rules: under 25 words, no hashtags, no emojis, clean direct copy only.
                  Return only the bio text, nothing else.`
      },
      {
        role: 'user',
        content: `Write a bio in a ${tone} tone using these themes: ${keywords}`
      }
    ],
    max_tokens: 80
  });

  return new Response(
    JSON.stringify({ bio: result.response }),
    { headers: { 'content-type': 'application/json; charset=utf-8' } }
  );
}

// Allow preflight CORS for local testing
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
