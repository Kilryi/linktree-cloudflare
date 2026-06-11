/**
 * GET /links
 * Returns the full link config as JSON.
 * Useful for bots, widgets, dashboards, and future AI features.
 */

const LINKS = [
  {
    id: "home",
    title: "vulkyri.com",
    description: "My home on the internet",
    icon: "🌐",
    url: "https://vulkyri.com/",
    featured: true
  },
  {
    id: "github",
    title: "GitHub",
    description: "Projects, repos & open source",
    icon: "gh",
    url: "https://github.com/vulkyri",
    copyable: { value: "vulkyri", label: "Copy username" }
  },
  {
    id: "x",
    title: "X / Twitter",
    description: "Thoughts & updates",
    icon: "x",
    url: "https://twitter.com/vulkyri"
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Professional profile",
    icon: "li",
    url: "https://linkedin.com/in/vulkyri"
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "Photos & life updates",
    icon: "ig",
    url: "https://instagram.com/vulkyri"
  }
];

export async function onRequestGet(context) {
  const { env } = context;

  // Optionally read click counts from KV
  let clicks = {};
  if (env.VULKYRI_KV) {
    try {
      const raw = await env.VULKYRI_KV.get('click_counts');
      if (raw) clicks = JSON.parse(raw);
    } catch (_) {}
  }

  const enriched = LINKS.map(link => ({
    ...link,
    clicks: clicks[link.id] || 0,
    short_url: `https://vulkyri.com/go/${link.id}`
  }));

  return new Response(
    JSON.stringify({
      site: "vulkyri.com",
      handle: "@vulkyri",
      updatedAt: new Date().toISOString(),
      links: enriched
    }, null, 2),
    {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store"
      }
    }
  );
}
