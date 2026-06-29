# USAM Fund — marketing site

React 18 + Vite 5 SPA for a **business-purpose / investor** private + hard-money lender (usam.net). React Router with `React.lazy` per route (Home is eager for LCP). Prerendered to static HTML at build for crawlers/AI agents, then hydrated.

## Where things live
- `src/pages/` — one file per route (Home, Programs, ProgramDetail, About, Contact, Apply, Faq, Resources, Guide, Partners, GeoLanding, Calculators, CalculatorDetail, Glossary, Compare, Comparison, Qualify, CityProgram, PrivacyPolicy, Terms). Routes are wired in `src/App.jsx`.
- `src/components/` — shared UI: `Header`, `Footer`, `Icon`, `JsonLd` (schema.org), `Faq`, `CtaBand`, `ConsentBanner`, `QualifyQuiz`, `DealShowcase`, `CalculatorCta`. Calculators live in `src/components/calculators/` (six calculators + shared `fields.jsx` kit: `useIsMobile`, `StickyResult`, `Wizard`).
- `src/data/` — **all content is data-driven; edit copy here, not in JSX.** `programs.js` (10 loan programs), `guides.js` (45 guides — large), `faqs.js`, `geo.js` (metro landing pages), `cityPrograms.js`, `comparisons.js`, `calculators.js`, `glossary.js`, `deals.js` (gated off via `SHOW_DEALS=false`).
- `src/lib/` — `analytics.js` (consent-gated GA4/Clarity), `crm.js` (`submitLead`/`submitPartner` → POST to the usam-forms Lambda), `sanitize.js`.
- `src/index.css` — base reset, hover states, **all responsive media queries** (can't be inline), skip-link, `.skip-link`/`.ci`/`.btn-*` classes.
- `scripts/prerender.mjs` — postbuild Puppeteer prerender over sitemap routes.
- `index.html` — meta/OG tags, `noindex` (pre-launch), manifest link.
- `public/` — `robots.txt` (pre-launch `Disallow: /`, AI-bot allow staged), `sitemap.xml`, `llms.txt`, `site.webmanifest`.

## Conventions
- **Styling is inline `style={{…}}` objects** (~800 of them) — shared/repeated styles and all media queries go in `index.css`. The display font is `'Schibsted Grotesk'` (`const SCH`), body is `'Hanken Grotesk'`. Brand blue `#1A56C4`, ink `#0E1A2B`, secondary text `#667085`.
- **Content edits happen in `src/data/`**, then render through the page/component. To change a program's terms, edit `programs.js`, not `ProgramDetail.jsx`.
- Forms post through `src/lib/crm.js` to the Lambda; the Airtable token lives only server-side in that Lambda (never in this bundle).

## Copy rules (do not violate)
- Write "fix and flip" / "Fix and Flip" — never "Fix & Flip".
- Never advertise a specific calculator interest rate as a USAM rate (the 7% defaults are labeled placeholders).
- No en dashes (–) in content; hyphens or em dashes only. Never use the § symbol — write "section N".
- Business-purpose lending only; keep the "not a commitment to lend / business-purpose only" disclaimers. Any page showing a rate needs the "subject to underwriting" footnote.

## Build & deploy
- `npm run dev` (port 5180) · `npm run build` (runs prerender postbuild; Puppeteer skips silently if it can't launch locally — CI does it reliably).
- Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds + prerenders + deploys to AWS Amplify (app `d26k7ln1hnf44p`) and flushes CloudFront.
- Amplify `customRules` must stay **status 404** (serves prerendered files first, SPA fallback on miss). This is console-side infra, not in the repo — do not change it.
- **Only commit/push on an explicit instruction** ("push" / "push main").
