# 🔗 Linktree-Style Link Page

A clean, fast Linktree alternative built with pure HTML/CSS — no frameworks, no build step. Deployed on **Cloudflare Pages**.

## ✨ Features

- Profile section with avatar, name, handle & bio
- Social icon row (X, GitHub, LinkedIn, Instagram, YouTube)
- Featured link card with teal accent
- Smooth hover animations & staggered entrance
- Dark / Light mode toggle (respects system preference)
- Fully responsive — works on all screen sizes
- Single `index.html` file — zero dependencies

## 🚀 Deploy to Cloudflare Pages

1. Fork or clone this repo
2. In [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git**
3. Select this repository
4. Leave **Build command** blank, set **Output directory** to `/`
5. Click **Save and Deploy**

Your site will be live at `your-project.pages.dev`.

## ✏️ Customise

Open `index.html` and edit:

| What | Where |
|---|---|
| Name / handle / bio | `<h1>`, `.profile-handle`, `.profile-bio` |
| Avatar | Replace emoji in `.avatar` with an `<img>` tag |
| Social link URLs | `<a href="#">` in `.socials` section |
| Link cards | Each `<a class="link-card">` — update `href`, `.link-title`, `.link-desc` |
| Accent colour | `--color-primary` in `:root` and `[data-theme="dark"]` |

## 🛠 Tech Stack

- Pure HTML + CSS (no frameworks)
- [Satoshi](https://www.fontshare.com/fonts/satoshi) font via Fontshare
- Inline SVG icons
- CSS custom properties (design tokens)
- `oklch()` colour space for perceptually accurate theming

## 📄 License

MIT — free to use and modify.
