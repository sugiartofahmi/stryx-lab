# STRYX LAB

> **Born in the dark. Built to endure.**  
> High-performance scraping engines, anti-bot reverse engineering, and resilient network architectures.

Official landing page for **STRYX LAB**: [https://stryxlab.dev](https://stryxlab.dev)

---

## ⚡ Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
- **UI Components**: [React 19](https://react.dev/) + [Lucide React](https://lucide.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Visuals**: HTML5 Canvas bioluminescent constellation & harmonic wave mesh
- **Linter & Formatter**: [Biome](https://biomejs.dev/)
- **Deployment**: [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) via Wrangler

---

## 📁 Project Structure

```text
stryx-lab/
├── public/
│   └── favicon.svg           # Geometric origami owl icon
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Footer.astro          # Minimalist brand footer
│   │   │   ├── Navbar.tsx            # Navigation bar (catalog ready)
│   │   │   └── StryxLogo.tsx         # Monochrome vector logo
│   │   └── landing/
│   │       ├── Hero.astro            # Core hero headline & CTA
│   │       └── ScraperMeshVisual.tsx # Organic spiderweb canvas visual
│   ├── layouts/
│   │   └── BaseLayout.astro  # HTML shell, metadata, and font setup
│   ├── pages/
│   │   └── index.astro       # Landing entry page
│   └── styles/
│       └── global.css        # Minimal dark canvas & typography tokens
├── astro.config.mjs          # Astro integration & canonical URL config
├── wrangler.jsonc            # Cloudflare custom domain & static asset routes
└── package.json
```

---

## 🛠️ Development

### Prerequisites
- Node.js `>= 22.23.4`
- pnpm `>= 9`

### Install Dependencies
```bash
pnpm install
```

### Start Local Dev Server
```bash
pnpm dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### Lint & Format
```bash
pnpm lint
pnpm format
```

### Production Build
```bash
pnpm build
```

---

## 🚀 Deployment

The site is hosted on **Cloudflare Workers Static Assets** mapped to `stryxlab.dev` and `www.stryxlab.dev`.

### Deploy to Cloudflare
```bash
pnpm ship
```
*(Or `pnpm cf:deploy` / `pnpm run deploy`)*

This runs `astro build` and deploys the generated `./dist` directly to Cloudflare's global edge network.

---

## 📄 License

Private & Proprietary © 2026 STRYX LAB.
