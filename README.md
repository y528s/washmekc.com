# NeighborhoodWash — washmekc.com

Marketing site for **NeighborhoodWash** (also referenced as WashMeKC / Neighbor
Power Wash) — an insured, owner-operated soft-wash and pressure washing
company based in Overland Park, KS, serving Johnson County.

The home page (`/`) is a high-conversion landing page; the rest of the app
keeps the existing estimator wizard, FAQ, contact, privacy, and terms pages.

## Stack

- **Vite + React 18** (JS, not TS — matches the rest of the repo)
- **Tailwind CSS 3** with a custom brand palette (see `tailwind.config.js`)
- **Framer Motion** for restrained scroll animations
- **shadcn/ui + Radix** primitives (used by the estimator and other pages;
  the landing page uses plain elements styled with the brand utilities in
  `src/index.css`)
- **Lucide** icons
- **Vercel** serverless functions in `/api` for backend (Stripe, Resend,
  Google Sheets, Geocoding)

## Run locally

```sh
npm install
npm run dev
# open http://localhost:5173
```

`npm run build` produces a `dist/` ready for Vercel (`vercel.json` is
already configured).

## Landing page anatomy

Every section is its own file in `src/components/landing/`:

| File                       | What it is                                                       |
| -------------------------- | ---------------------------------------------------------------- |
| `Header.jsx`               | Sticky wordmark + phone + yellow CTA                             |
| `Hero.jsx`                 | Z-pattern hero with before/after split image placeholder         |
| `SocialProof.jsx`          | Grayscale trust-badge strip (static desktop, marquee mobile)     |
| `ProblemAgitation.jsx`     | Three sensory vignettes — algae, driveway, deck                  |
| `Benefits.jsx`             | Three-column benefits grid                                       |
| `BeforeAfter.jsx`          | Draggable before/after slider + 4-step process strip             |
| `Testimonials.jsx`         | Three review cards (placeholder copy — see TODOs)                |
| `FAQ.jsx`                  | 8-question accordion, first open by default                      |
| `Urgency.jsx`              | Honest scheduling note (no countdowns, no fake scarcity)         |
| `FinalPush.jsx`            | Brand-blue full-width final CTA band                             |
| `QuoteForm.jsx`            | Two-column form posting to `/api/quote`                          |
| `Footer.jsx`               | Minimal footer                                                   |
| `MobileStickyCTA.jsx`      | Mobile-only floating Get-Free-Quote bar                          |
| `_shared.jsx`              | `CtaButton`, `Section`, `FadeInUp`, `scrollToQuote` helpers      |

The page is wired together in `src/pages/Home.jsx`.

## Design system

Brand tokens live in `tailwind.config.js` and the landing-only utilities
(`btn-cta`, `field`, `chip`, `img-placeholder`, `.landing-root` typography)
live in `src/index.css`.

| Role         | Token / class           | Hex       |
| ------------ | ----------------------- | --------- |
| Background   | `bg-bg`                 | `#FAFAF7` |
| Body text    | `text-ink`              | `#1A1F2E` |
| Muted text   | `text-slatey`           | `#5A6478` |
| Brand blue   | `bg-brand` / `text-brand` | `#1E3A5F` |
| CTA yellow   | `bg-cta` / `.btn-cta`   | `#F4B324` |
| Sage accent  | `bg-sage` / `text-sage` | `#7A9B7E` |

**The CTA color is yellow only.** Don't introduce a second yellow surface
elsewhere on the page — it kills the contrast.

Fonts: **Plus Jakarta Sans** (display, 600/700/800) and **Inter** (body,
400/500/600), loaded from Google Fonts in `index.html`.

## Replacing placeholder photos

Search the repo for `TODO:` to find every spot a real photo or asset needs
to drop in. The two most prominent:

1. **`Hero.jsx → BeforeAfterPlaceholder`** — diagonal-split before/after of
   an OP two-story home, north side, algae visible on the BEFORE half.
   Recommended dimensions: 1200×1500 (4:5 portrait), `<200KB` after
   compression. Drop into `public/`, replace the placeholder div with
   `<img src="/hero-before-after.jpg" ... />`.

2. **`BeforeAfter.jsx → Slider`** — two photos taken from the **identical
   camera position**, pre-wash and post-wash, ideally a north-facing wall.
   Replace the two `<div>` background-gradients with `<img>` elements:

   ```jsx
   <img src="/slider-after.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
   <div style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} className="absolute inset-0">
     <img src="/slider-before.jpg" alt="" className="w-full h-full object-cover" />
   </div>
   ```

3. **`Testimonials.jsx`** — every card is wrapped with
   `{/* TODO: Replace with real testimonial */}`. Replace `name`, `where`,
   `quote`, and either drop in an `<img>` avatar or keep the initials block.

## Wiring the form to a real backend

Right now `POST /api/quote` (see `api/quote.js`) validates the payload, logs
to Vercel function logs, and returns success.

Two production hookups, both already implemented in this repo for other forms:

- **Google Sheets** — reuse `appendLeadRow` from `api/_lib/sheets.js`
- **Resend email** — reuse `sendAdminNotification` and `sendLeadConfirmation`
  from `api/_lib/email.js`

The shape posted from `QuoteForm.jsx` (`name, address, email, phone,
services[], notes`) is compatible with `submit-lead.js`'s `leadData` argument
— spread it through.

Required env vars (already used by `submit-lead.js`):

```
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_LEADS_SHEET_ID=
RESEND_API_KEY=
LEAD_NOTIFICATION_TO=
```

The form has an optional photo upload that **currently is not transmitted**
— `/api/quote` doesn't accept multipart yet. When you wire that up, switch
the form's `fetch` to `FormData` and accept `multipart/form-data` in the
handler.

## Updating copy

All copy lives inside the section components — there is no CMS. The most
common places to tweak:

- **Headline + subhead** → `Hero.jsx`
- **Phone number** → `Header.jsx`, `Hero.jsx`, `Footer.jsx`, `QuoteForm.jsx`
  error path (search for `913) 701-3077`)
- **Service area list** → `Footer.jsx → SERVICE_AREAS`,
  `index.html` JSON-LD `areaServed`
- **FAQ entries** → `FAQ.jsx → FAQS`
- **Benefit cards** → `Benefits.jsx → BENEFITS`
- **Testimonials** → `Testimonials.jsx → TESTIMONIALS`
- **Page title / meta description / JSON-LD** → `index.html`

## Routes (other pages)

| Path                       | Component                          |
| -------------------------- | ---------------------------------- |
| `/`                        | `pages/Home.jsx` (the landing page) |
| `/FAQ`                     | `pages/FAQ.jsx`                    |
| `/Contact`                 | `pages/Contact.jsx`                |
| `/PrivacyPolicy`           | `pages/PrivacyPolicy.jsx`          |
| `/TermsAndConditions`      | `pages/TermsAndConditions.jsx`     |
| `/BookingConfirmation`     | `pages/BookingConfirmation.jsx`    |
| `*`                        | 404 (in `App.jsx`)                 |

The estimator wizard (`src/components/estimator/EstimateWizard.jsx`) is
**not currently linked** from the landing page — the previous Home wired it
up, the new Home funnels to the QuoteForm instead. Re-wire from
`pages/Home.jsx` if you want it back.

## Deploy

Vercel is already wired up via `vercel.json`. Push to `main` (or whatever
branch is connected) and Vercel runs `npm run build` automatically.
