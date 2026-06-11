/**
 * GET /updates
 * A lightweight updates/changelog feed page.
 * Updates are read from KV (key: site_updates) if available,
 * otherwise falls back to hardcoded defaults.
 *
 * To push a new update from the CLI:
 *   npx wrangler kv key put --binding=VULKYRI_KV site_updates '[{"date":"Jun 2026","text":"New projects dropping soon."}]'
 */

const DEFAULT_UPDATES = [
  { date: 'Jun 2026', text: 'New projects dropping soon — watch this space.' }
];

export async function onRequestGet(context) {
  const { env } = context;
  let updates = DEFAULT_UPDATES;
  if (env.VULKYRI_KV) {
    try {
      const raw = await env.VULKYRI_KV.get('site_updates');
      if (raw) updates = JSON.parse(raw);
    } catch (_) {}
  }

  const items = updates.map(u => `
    <article class="update">
      <time class="update-date">${u.date}</time>
      <p class="update-text">${u.text}</p>
    </article>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Updates · vulkyri.com</title>
  <meta name="description" content="Latest updates from @vulkyri" />
  <link rel="canonical" href="https://vulkyri.com/updates" />
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin />
  <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{
      min-height:100dvh;
      font-family:'Satoshi',system-ui,-apple-system,sans-serif;
      background:#0f0f0e;color:#e8e7e4;
      display:flex;flex-direction:column;align-items:center;
      padding:2rem 1rem;
    }
    .page{width:100%;max-width:520px;display:flex;flex-direction:column;gap:2rem;padding-top:3rem}
    header{display:flex;flex-direction:column;gap:0.5rem}
    .back{font-size:0.8rem;color:#7a7876;text-decoration:none;display:inline-flex;align-items:center;gap:4px;margin-bottom:0.5rem;transition:color 150ms ease}
    .back:hover{color:#6aa3ff}
    h1{font-size:1.4rem;font-weight:700;letter-spacing:-0.02em}
    .subtitle{font-size:0.85rem;color:#7a7876}
    .feed{display:flex;flex-direction:column;gap:0}
    .update{
      padding:1.25rem 0;
      border-bottom:1px solid rgba(255,255,255,0.06);
      display:flex;flex-direction:column;gap:0.35rem;
    }
    .update:first-child{padding-top:0}
    .update-date{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#5a5955}
    .update-text{font-size:0.9rem;color:#c8c7c4;line-height:1.65}
    footer{font-size:0.75rem;color:#5a5955;text-align:center;padding-bottom:2rem}
  </style>
</head>
<body>
  <main class="page">
    <header>
      <a class="back" href="/">&#8592; vulkyri.com</a>
      <h1>Updates</h1>
      <p class="subtitle">Latest news &amp; announcements from @vulkyri</p>
    </header>
    <section class="feed" aria-label="Updates feed">${items}</section>
    <footer>vulkyri.com &middot; ${new Date().getFullYear()}</footer>
  </main>
</body>
</html>`;

  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }
  });
}
