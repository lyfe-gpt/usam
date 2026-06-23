# USAM Fund — Design System

Reference for the look and feel of usam.net. Derived from the built site (`src/`).
Keep new work consistent with these tokens and patterns. When something here changes
in the code, update this file in the same pass.

**Stack:** React + Vite SPA. Styling is **inline `style={{}}` objects** for layout/one-offs,
with `src/index.css` holding the reset, hover/focus states, and **all media queries**
(those can't live inline). There is no Tailwind/CSS-in-JS library.

---

## 1. Brand & voice

- **Tagline:** "Hard money. Soft terms."
- **Positioning:** Direct private / hard-money lender. "A lender that thinks like an investor."
- **Tone:** Direct, personal, confident, plain-English. "Real people who answer the phone."
- **Writing rule:** No en dashes (`–`). Use hyphens (`-`) or em dashes (`—`). Ranges use "to" or hyphen ("5-7 days", "$75K to $5M").
- **Legal footer line:** "Loans for business purpose only · Not a commitment to lend."
- **Full voice & tone guide:** see `VOICE.md` (Better.com-style plain-spoken, investor-to-investor). Read it before writing or editing any copy.

---

## 2. Color

### Brand blue
| Token | Hex | Use |
|---|---|---|
| Primary | `#1A56C4` | Buttons, links, active nav, eyebrows, icons |
| Primary hover / deep | `#123E96` | Button hover, gradient start, "on-white" text on blue btns |
| Bright | `#2C68D6` | `.btn-primary-bright` hover |
| Sky accent | `#6FA0F0` | Eyebrows/labels on dark sections |
| Tint bg | `#EEF3FC` | Icon chips, light-blue fills |
| Tint bg (pills) | `#DCE6F9` / `#EEF3FC` | FAQ pills, hover states |

### Ink & text
| Token | Hex | Use |
|---|---|---|
| Ink (headings) | `#0E1A2B` | Headings, dark sections bg, footer bg |
| Body | `#475467` | Default body copy |
| Muted | `#667085` | Secondary copy |
| Muted-2 | `#8A97A8` | Captions, sub-labels |
| Faint | `#98A2B3` | Placeholders, footnotes |
| Label | `#344054` | Form field labels |

### Surfaces & borders
| Token | Hex | Use |
|---|---|---|
| White | `#ffffff` | Default surface |
| Tint surface | `#F6F8FB` | Alt sections, cards, Apply page bg |
| Border | `#E6E9EF` | Cards, header/footer dividers |
| Border light | `#EEF1F5` / `#F1F3F7` / `#F2F4F7` | Inner dividers |
| Field border | `#E0E5EC` | Inputs (`.ci`) |

### Dark section / footer
| Token | Hex | Use |
|---|---|---|
| Dark bg | `#0E1A2B` | "How it works", utility bar, footer |
| Dark text | `#E7ECF3` / `#AEB9C9` | Copy on dark |
| Dark muted | `#6E7E92` / `#8A97A8` | Footer fine print |
| Hairline on dark | `#21324A` | Footer/divider lines |

### Accents
| Token | Hex | Use |
|---|---|---|
| Alert dot | `#C9362E` | Red dot in utility bar |
| Error text | `#C0392B` | Form validation errors |
| Phone btn bg | `#F3F1E9` | Round phone icon button (warm cream) |
| Selection | `#1A56C4` on `#fff` | `::selection` |

### Gradients
- **CTA band:** `linear-gradient(120deg,#123E96 0%,#1A56C4 100%)`
- **Hero / section wash:** `linear-gradient(180deg,#F6F8FB 0%,#ffffff 100%)`
- **Avatar monogram:** `linear-gradient(150deg,#1A56C4,#123E96)` and `(150deg,#2C68D6,#1A56C4)`
- **Mega-menu image scrim:** `linear-gradient(180deg, rgba(14,26,43,0.15) 0%, rgba(14,26,43,0.88) 100%)`

---

## 3. Typography

**Fonts** (loaded via `<link>` in `index.html`):
- **Display:** `Schibsted Grotesk` — weights 500/600/700/800. Used for all headings, stats, big numbers.
  In code via the constant `const SCH = "'Schibsted Grotesk',sans-serif";`
- **Body:** `Hanken Grotesk` — weights 400/500/600/700. Set globally on `body`.
  Stack: `'Hanken Grotesk', system-ui, sans-serif`. `-webkit-font-smoothing: antialiased`.

**Scale** (fluid via `clamp`):
| Role | Size | Notes |
|---|---|---|
| Hero H1 | `clamp(38px,4.6vw,58px)` | weight 800, line-height ~1.0, letter-spacing -0.02em |
| Apply H1 | `clamp(28px,4vw,38px)` | flow pages |
| Section H2 | `clamp(32px,3.8vw,46px)` | also 40 / 36 variants per context |
| CtaBand title | `clamp(28px,3.4vw,40px)` | override via `titleClamp` prop |
| H3 | `18px–23px`, weight 700 | card/section subheads |
| Lead paragraph | `18px–19px`, line-height ~1.55 | |
| Body | `15px–16px` | |
| Small / caption | `13px–14.5px` | |
| **Eyebrow / label** | `13px`, weight 700, `letter-spacing 0.1em`, `text-transform uppercase`, color `#1A56C4` (or `#6FA0F0` on dark) | the repeating section-kicker pattern |

Headings: weight 800 for page/section titles, 700 for card titles; letter-spacing `-0.01em` to `-0.02em`.

---

## 4. Layout & spacing

**Container max-widths** (centered with `margin: 0 auto`):
- `1240px` — most sections (home, header, footer, programs)
- `1140px` — program detail hero
- `1040px` — contact
- `880px / 860px` — FAQ, testimonial
- `680px` — Apply flow (narrow, focused)

**Section vertical rhythm** (standardized):
- Hero top padding: **72px** across pages
- Content sections: ~72–80px top/bottom
- `CtaBand`: `48px 32px 48px`
- Dark "How it works": 80px

**Horizontal padding:** `32px` desktop → **`18px` at ≤640px** (via `.sec`, `.hdr-sec`, `.ftr-sec`, `.flow-pad` overrides).

**Radius:**
- Pills / buttons: `999px`
- Cards: `14–24px` (cards 16, CTA band 24, big feature 18–20)
- Inputs: `11px` (`12px` on Apply page)
- Icon chips: `9–13px`

**Shadows:**
- Card rest: `0 1px 2px rgba(14,26,43,0.04)`
- Card hover: `0 12–14px 28–34px -16px rgba(26,86,196,0.4)` + `translateY(-2/-3px)`
- CTA band: `0 24px 60px -24px rgba(26,86,196,0.55)`
- Dropdowns: `0 24–28px 50–60px -16/-18px rgba(14,26,43,0.28–0.32)`

---

## 5. Buttons

All radius `999px`, font-weight 700–800, `font-family: inherit`.

| Class | Look | Hover |
|---|---|---|
| `.btn-primary` | bg `#1A56C4`, white text, blue shadow | bg `#123E96` |
| `.btn-primary-bright` | bg `#1A56C4` (on dark) | bg `#2C68D6` |
| `.btn-white` | bg `#fff`, text `#123E96` | bg `#EEF3FC` |
| `.btn-outline` | bordered | border+text `#1A56C4` |
| `.btn-ghost-light` | transparent w/ `rgba(255,255,255,0.5)` border (for dark/blue bg) | white border + `rgba(255,255,255,0.08)` fill |

Typical padding: `14–17px` vertical × `22–32px` horizontal. Primary CTA copy: **"Get my rate"** / **"Apply now"**; secondary: **"Talk to us"** (→ `/contact`) or **"See loan programs"**.

**Rule: never put a phone number on a button.** The button label is never the number itself. Show phone numbers as plain text or links (header utility bar, the header phone hover popover, the footer), or as a `tel:` button labeled **"Call us"** / **"Talk to us"**. (Keeps CTAs verb-led and on-voice, and avoids a raw number as a primary action.)

---

## 6. Form fields

Class `.ci` (shared input/select/textarea):
- `border: 1.5px solid #E0E5EC`, `border-radius: 11px`, `padding: 13px 15px`, `font-size: 16px`, color `#0E1A2B`
- Focus: `border-color: #1A56C4` + `box-shadow: 0 0 0 4px rgba(26,86,196,0.12)`
- Placeholder: `#98A2B3`
- Apply-page variant (`body.apply-page .ci`): `font-size 17px`, `radius 12px`, `padding 15px 16px`

**Field conventions:**
- Labels: 13px, weight 700, color `#344054`, 7–8px below.
- `autoComplete`: `name` / `email` / `tel` on contact fields; `off` on the address autocomplete.
- Input types: `email`, `tel`, and `text inputMode="numeric"` for currency (so `$`/comma formatting works).
- Validation rule (both forms): **name + at least one of (email, phone)**. Errors render as a `#C0392B` 14px line above the submit button.

---

## 7. Components

- **Header** (`Header.jsx`) — dark utility bar (tagline + phone + email) over a sticky, blurred (`backdrop-filter: blur(12px)`) nav. Desktop: hover **mega-menu** for Programs (900px card, 3-col program grid + featured Apply tile) and a hover phone popover. Collapses to a **burger menu** at ≤980px with an accordion Programs section.
- **Footer** (`Footer.jsx`) — dark `#0E1A2B`, 4-column grid (brand / Programs / Company / Office), collapses 4→2→1. Bottom row: copyright + business-purpose disclaimer.
- **CtaBand** (`CtaBand.jsx`) — blue gradient band, props: `title`, `text`, `maxWidth`, `padding`, `titleClamp`, `withSecondary`, `uClass`. Renders **Get my rate** + (optional) **Talk to us**.
- **FAQ** (`Faq.jsx` page + component) — accordion with jump-nav pills; emits `FAQPage` JSON-LD structured data.
- **Program cards** (`.card-prog`) — icon chip + title + blurb + "Learn more". Hover lifts + blue border.
- **Stat strips** — 4-up bordered grid, big Schibsted numbers, collapses to 2-up at ≤640px.
- **Option buttons** (`.opt`) — Apply flow choice tiles; 2-col grid → 1-col at ≤560px.
- **Avatar** (About) — monogram initials on a blue gradient; swaps to a photo when `img` is provided.

---

## 8. Icons

Custom inline-SVG component `Icon.jsx`. Props: `name`, `size`, `color`, `width` (stroke), `filled`, `className`, `style`.

**Program icons:** `fixFlip`, `rental`, `construction`, `bridge`, `transactional`, `sba`, `bankStatement`, `conventional`, `commercial`, `portfolio`
**UI icons:** `phone`, `mail`, `mapPin`, `clock`, `check`, `close`, `menu`, `back`, `chevronRight`, `chevronDown`

---

## 9. Imagery & assets

- **Logo:** hosted on `lirp.cdn-website.com` — horizontal (header) and white (footer) variants.
- **Hero video:** `src/assets/home-hero.{webm,mp4}` + `home-hero-poster.jpg`, played at `0.75×`, loops with a 2s pause.
- **Team headshots:** illustrated "sticker" portraits in `src/assets/team/*.webp`, 500×281 (16:9), ~7-8KB each. See the illustration style below.
- **Photography:** Unsplash stock property photos (flag for real photos pre/post-launch — see Launch Readiness Checklist).
- Phone CTA uses `tel:512-488-6087`; email `mailto:` (public address pending confirmation — see checklist).

### 9a. Image-generation style (two looks)

- **Illustrated "sticker"** — team portraits and optional hero art. Bold flat vector / comic
  style, thick dark-navy outlines (`#0E1A2B`), cel-shaded, warm cream background (`#F7F4ED`),
  clean white sticker outline + soft drop shadow + rounded oval base, royal/deep-blue accents.
  16:9, head-and-shoulders, centered with even cream margin and a gap beneath. Export 500×281 WebP.
- **Photorealistic** — program heroes and page banners (About, Partners, Programs). Editorial
  real-estate / business photography, bright natural daylight, blue sky + cool-blue tones over warm
  neutrals, royal-blue accents — one cohesive grade across the whole set. **Always generate 4:3** so
  every photoreal image matches the program set; export **4:3 WebP** to `src/assets/<group>/`
  (program heroes `1200×900`, e.g. `src/assets/programs/<slug>.webp`; page banners capped at
  **1000×750** to keep weight down, in `src/assets/banners/`). Display slots use
  `object-fit: cover` + `border-radius: 20`, so the 4:3 source can be cropped per layout in CSS
  without re-exporting. Program heroes set `heroImg` in `data/programs.js`. Every photoreal prompt
  ends with a negative prompt (no text, no logos, no watermarks, no distortion) and leaves calm
  negative space for any overlaid headline.

> **Paste-ready ElevenLabs prompts are kept in the vault, not in the repo:**
> `USAM / 06 - Website Redesign / Image Prompts — ElevenLabs (usam.net).md`
> — one self-contained prompt per program and page banner, plus the home-hero and team-portrait
> prompts. All photoreal prompts specify 4:3.

---

## 10. Breakpoints

Defined in `index.css` media queries:
| Width | Effect |
|---|---|
| `≤980px` | Nav → burger; hero/why grids stack; term card goes static |
| `≤920px` | Program hub/detail grids stack |
| `≤900px` | About / Contact grids stack |
| `≤760px` | FAQ columns → 1 |
| `≤640px` | Section padding → 18px; stat grids → 2-up; hero padding trims |
| `≤560px` | Program/about/option grids → 1; finer trims |
| `≤430px` | Utility-bar tagline hidden |

---

## 11. Motion

- Transitions: `.14s–.18s ease` on hover/focus (buttons, cards, nav, fields).
- Card/option hover: `translateY(-1px to -3px)` + colored shadow.
- `html { scroll-behavior: smooth; }`; route changes scroll to top (`ScrollToTop` in `App.jsx`).
- Dropdowns fade + slide (`opacity` + `translateY(6px→0)`) on hover.

---

## 12. Conventions for future work

- Match the **inline-style + index.css-for-media-queries** split already in use; don't introduce a CSS framework.
- Reuse the `SCH` constant for any heading font-family.
- Reuse `CtaBand`, `Header`, `Footer`, `Icon`, and the `.ci` / `.btn-*` / `.opt` classes rather than re-styling.
- Program content is data-driven from `src/data/programs.js` (single source for hub, 6 detail pages, nav, footer, home preview). FAQ content from `src/data/faqs.js`; guides from `src/data/guides.js`.
- **The `/faq` page is the comprehensive FAQ hub.** Each section shows the program's own FAQs (`programFaqs`) followed by a "From our guides" group: the FAQs from every guide whose first `related` program matches that section, each linking to the full guide. Its single `FAQPage` JSON-LD covers general + program + all guide FAQs (visible content and schema must match). Each guide page also keeps its own `FAQPage` for its three questions (hub-and-spoke). `faqPageSchema()` strips HTML, so bolding never leaks into structured data.
- Respect the no-en-dash rule and the "name + one contact channel" form-validation pattern.
- **Bold the key terms inside FAQ answers and resource/guide bodies.** In `data/faqs.js` and `data/guides.js`, wrap the term being defined, the crux of the answer, and important figures (rates, leverage, DSCR, timeframes) in `<strong>` so readers scanning can land on them fast. **Every FAQ answer must bold 3 to 5 phrases or key terms** — enough that a reader skimming gets the gist from the bold alone, but bold phrases, not whole sentences or paragraphs. Lead yes/no answers with the bolded verdict ("**No. We work with first-time flippers**"), and bold the figures in rate/term answers ("**starts around 9.50%, interest-only**"). The `.faq-a strong` and `.guide-body strong` styles render it bold in ink (`#0E1A2B`).
