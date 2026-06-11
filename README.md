# 🔗 vulkyri — Link Page

A polished, fast Linktree alternative built with pure HTML/CSS/JS — **no frameworks, no build step, no dependencies**. Deployed on **Cloudflare Pages** via Wrangler.

## ✨ Features

- 🎨 **Dark / Light mode** — respects system preference, persists via `localStorage`, syncs with OS changes
- 🦊 **Avatar** — emoji by default, swap for a real photo with one config change
- 🔗 **Configurable links** — all content lives in a single `CONFIG` object
- 📋 **Copy to clipboard** — copy buttons with animated ✓ feedback
- 🏷️ **Status pill** — online / offline indicator with live pulse animation
- 🌐 **Branded SVG icons** — X, GitHub, LinkedIn, Instagram (no emoji, no icon fonts)
- ♿ **Accessible** — skip link, ARIA labels, `role="status"` live region for clipboard toast
- 📱 **Responsive** — looks great on mobile, tablet and desktop
- ⚡ **Cloudflare Pages** — edge-hosted, zero cold starts, globally fast
- 🔍 **SEO-ready** — canonical, Open Graph, Twitter Card, JSON-LD structured data
- 🎞️ **Smooth animations** — staggered `fadeUp` entrance, hover effects

## 🚀 Deploy

### Cloudflare Pages (recommended)

1. Fork or clone this repo
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git**
3. Select this repository
4. Leave **Build command** blank, set **Output directory** to `.`
5. Click **Save and Deploy**

Your site will be live at `vulkyri.pages.dev`. Connect your custom domain in the Pages dashboard.

### Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy . --project-name vulkyri
```

## ✏️ Customise

Open `index.html` and edit **only the `CONFIG` object** at the top of the `<script>` block:

| What | Config key |
|---|---|
| Name / handle / bio | `profile.name`, `profile.handle`, `profile.bio` |
| Avatar | `profile.avatar` — emoji string or image path e.g. `"/avatar.jpg"` |
| Status pill | `status` — `null` to hide, or `{ status: 'online'\|'offline', text: '...' }` |
| Social icons | `socials` array — update `url` values |
| Link cards | `links` and `featuredLinks` arrays |
| Accent colour | `--color-primary` in the `:root` / `[data-theme="dark"]` CSS blocks |

## 🛠 Tech Stack

- Pure HTML + CSS + vanilla JS (no frameworks)
- [Satoshi](https://www.fontshare.com/fonts/satoshi) font via Fontshare
- Inline SVG brand icons
- CSS custom properties (`oklch` colour space)
- `color-mix()` for alpha variants — no preprocessor needed
- Cloudflare Pages (static assets, global CDN)

## 📄 License

MIT — free to use and modify.
