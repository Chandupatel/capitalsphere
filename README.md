# CapitalSphere — Marketing Website

Enterprise-grade Next.js 16 (App Router) implementation of the CapitalSphere homepage.

## Stack

- **Next.js 16** (App Router, Turbopack, Server Components by default)
- **React 19** / **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first theme (`app/globals.css`), no `tailwind.config.js` needed
- **lucide-react** for iconography
- Self-hosted variable fonts via `next/font/local` (Inter + Playfair Display, OFL-licensed) — avoids a Google Fonts network dependency at build time

## Architecture

```
app/
  layout.tsx        Root shell: fonts, metadata, <Header>/<Footer>/<WhatsAppFab>
  page.tsx           Homepage composition — imports section components in order
  globals.css        Design tokens (@theme), base styles, a11y focus rings
  fonts/              Self-hosted woff2 variable fonts

components/
  layout/            Header, Footer, NewsletterForm (route-agnostic shell)
  sections/          One component per homepage section (Hero, StatsStrip, ...)
  ui/                 Reusable primitives: Button, Container, SectionKicker, WhatsAppFab

constants/
  data.tsx            Single source of truth for nav links, services, stats,
                      funding programs, testimonials, etc. (with icons)

types/
  index.ts            Shared TypeScript interfaces for the content layer

public/
  images/             Brand assets (logo mark + full logo, background-removed)
```

### Why this structure

- **Section-per-file** under `components/sections` keeps `app/page.tsx` a readable
  table of contents and makes reordering/adding sections a one-line change.
- **Content lives in `constants/data.tsx`**, not inline in JSX, so copy, icons, and
  links can be updated (or later swapped for a CMS/API) without touching layout code.
- **`components/ui`** holds only generic, brand-styled primitives with no page-specific
  knowledge — reused across every section for visual consistency.
- Path alias `@/*` (already configured in `tsconfig.json`) is used everywhere instead
  of relative imports.

## Design tokens

Brand colors were sampled directly from the supplied logo mark and defined once in
`app/globals.css`:

- `navy-950 … navy-50` — deep navy from the crescent/globe
- `gold-600 … gold-100` — the metallic gold "S" and accents
- Neutral `slate-*`, `surface`, `border` tokens for text and section backgrounds

All are exposed as Tailwind utilities (`bg-navy-900`, `text-gold-600`, etc.) via the
`@theme inline` block — no separate JS config file required in Tailwind v4.

## Notes on visual assets

The Figma reference uses photographic stock imagery (skyline, office interior) and
third-party brand logos (OYO, Zomato, Paytm, etc.) in the "Trusted By" strip and
blog thumbnails. To keep this codebase free of licensing risk out of the box:

- The hero/about visuals are original CSS + SVG compositions built from the actual
  logo mark (glow, podium, ascending bars) rather than a stock photo.
- The trust-logo strip renders brand **names as text**, not reproduced logos.
- Blog card art uses brand-colored icon tiles instead of stock photography.

Swap in licensed photography by dropping files into `public/images/` and updating
the relevant section component — the layout, spacing, and responsive behavior
already match the reference design.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```
