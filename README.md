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
  consultation/       Modal + form used by every "consultation" CTA (see below)

app/api/
  consultation/route.ts   Server route that emails the admin on form submit

constants/
  data.tsx            Single source of truth for nav links, services, stats,
                      funding programs, testimonials, etc. (with icons)
  contact.tsx          Phone number / WhatsApp / admin email — edit once, updates everywhere

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

## Navigation

Top-level order: **Home → Services → Resources → About Us → Contact Us**.
"Government Funding" is no longer a separate top-level item — it's a labeled group
inside the Services dropdown, alongside the core services group. Edit `NAV_LINKS` in
`constants/data.tsx` to add/remove/reorder items; each child can carry an optional
`groupStart` label to start a new labeled cluster in the dropdown.

## Consultation modal (Get Free Consultation / Book Free Consultation / Request Callback)

All three CTAs render `<ConsultationButton>` (`components/consultation/ConsultationButton.tsx`),
which opens a shared modal (`ConsultationModalProvider` + `ConsultationModal`, mounted once
in `app/layout.tsx`). The form collects Full Name, Company Name, Email, Phone and Message,
then POSTs to `app/api/consultation/route.ts`.

That route **only** sends a plain email to `ADMIN_EMAIL` via SMTP (nodemailer) — no database,
no CRM, no auto-reply to the client. Configure it with environment variables (see `.env.example`):

```bash
ADMIN_EMAIL=info@capitalsphere.in
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

Any SMTP provider works (Gmail with an App Password, Zoho, SendGrid SMTP, Amazon SES SMTP,
your host's own mailbox, etc.) — just fill in the four `SMTP_*` values. On Railway, add these
under your service's **Variables** tab. Until they're set, the form fails gracefully with a
"please call us instead" message rather than crashing.

To reuse the same "open the consultation modal" behavior elsewhere, either render
`<ConsultationButton>` (styled like `Button`) or call `useConsultationModal().open()` from
any client component.

## Contact details

Phone, WhatsApp, and the displayed admin email live in **one file**: `constants/contact.tsx`.
Update the number there once and it propagates to the header, footer, and every CTA section.

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

- The hero shows the actual transparent full logo (`public/images/logo-full.png`,
  icon + wordmark) at full size with a light CSS glow/podium behind it — not a stock photo.
- The trust-logo strip renders brand **names as text**, not reproduced logos.
- Blog card art uses brand-colored icon tiles instead of stock photography.

Swap in licensed photography by dropping files into `public/images/` and updating
the relevant section component — the layout, spacing, and responsive behavior
already match the reference design.

## Open items for the client

- **Stats strip numbers** (`STATS` in `constants/data.tsx`) are placeholders — swap in
  final figures whenever they're confirmed.
- **SMTP credentials** must be added as environment variables before the consultation
  form can actually send email (see above) — otherwise it shows a friendly fallback message.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```
