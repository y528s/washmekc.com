# NeighborhoodWash — washmekc.com

Marketing site for **NeighborhoodWash** (a.k.a. WashMeKC / Neighbor Power
Wash) — an insured, owner-operated soft-wash and pressure washing
company based in Overland Park, KS.

## Stack

- Vite 6 + React 18 (JavaScript)
- Tailwind CSS 3 + `tailwindcss-animate`
- Plus Jakarta Sans (display) + Inter (body) via Google Fonts
- Framer Motion (restrained scroll animations)
- Lucide React (icons)
- Resend (lead email)
- Vercel serverless functions for `/api/*`

## Run locally

```sh
npm install
npm run dev          # http://localhost:5173
npm run build        # produce dist/
```

## Project anatomy

```
src/
├── main.jsx                       # React root
├── App.jsx                        # single page, mounts <Home />
├── index.css                      # Tailwind + brand utilities
├── pages/Home.jsx                 # section list, top to bottom
└── components/landing/
    ├── _shared.jsx                # CtaButton, Section, FadeInUp, scrollToQuote
    ├── Header.jsx
    ├── Hero.jsx
    ├── SocialProof.jsx
    ├── ProblemAgitation.jsx
    ├── Benefits.jsx
    ├── BeforeAfter.jsx            # custom draggable slider
    ├── Testimonials.jsx           # placeholder reviews — TODO swap
    ├── FAQ.jsx
    ├── Urgency.jsx
    ├── FinalPush.jsx
    ├── QuoteForm.jsx              # POSTs to /api/quote
    ├── Footer.jsx
    └── MobileStickyCTA.jsx

api/
└── quote.js                       # Resend lead-email handler
```

## Brand tokens

Defined in `tailwind.config.js`:

| Role         | Class                       | Hex       |
| ------------ | --------------------------- | --------- |
| Background   | `bg-bg`                     | `#FAFAF7` |
| Body text    | `text-ink`                  | `#1A1F2E` |
| Muted text   | `text-slatey`               | `#5A6478` |
| Brand blue   | `bg-brand` / `text-brand`   | `#1E3A5F` |
| CTA yellow   | `bg-cta` / `.btn-cta`       | `#F4B324` |
| Sage accent  | `bg-sage` / `text-sage`     | `#7A9B7E` |

The CTA color is yellow only. Don't introduce a second yellow elsewhere
on the page — it kills the contrast.

## Replacing placeholder photos

Search the repo for `TODO:` to find every spot a real photo drops in.
The two most prominent:

1. **`src/components/landing/Hero.jsx → BeforeAfterPlaceholder`** —
   diagonal-split before/after of an Overland Park two-story home.
   Drop a 4:5 image at `/public/hero-before-after.jpg`, then replace
   the placeholder div with `<img src="/hero-before-after.jpg" ... />`.

2. **`src/components/landing/BeforeAfter.jsx → Slider`** — two photos
   from the same camera position, pre-wash and post-wash. Drop them at
   `/public/slider-before.jpg` and `/public/slider-after.jpg`, then
   replace the two `<div>` background-gradients with `<img>`.

3. **`src/components/landing/Testimonials.jsx`** — every card has a
   `TODO: Replace with real testimonial` comment.

## Wiring the lead form

`POST /api/quote` accepts:

```json
{
  "name": "Sarah Smith",
  "address": "123 Main St, Overland Park, KS",
  "email": "sarah@example.com",
  "phone": "(913) 555-0123",
  "services": ["House", "Driveway"],
  "notes": "North side worst. Hostas under back wall."
}
```

It validates, logs to Vercel function logs, and emails:
- **Homeowner** — branded confirmation
- **Admin (`ADMIN_EMAILS`)** — full lead with `reply_to` set to homeowner

### Required env vars on Vercel

| Variable             | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| `RESEND_API_KEY`     | Resend API key (must be set on Production for prod sends)   |
| `ADMIN_EMAILS`       | Comma-separated list of recipients for the admin email      |
| `RESEND_FROM_EMAIL`  | Optional. Defaults to `NeighborhoodWash <noreply@washmekc.com>` |

If `RESEND_API_KEY` is unset, the form still returns success and the
lead lands in the Vercel function log — no email is sent.

## Deferred features (v1.1)

The following existed in the previous codebase and will be ported in
the next session, NOT in v1:

- Stripe deposit checkout (`/api/create-checkout` + webhook)
- Promo code validation (`/api/validate-promo`)
- Google Sheets lead sync
- Address autocomplete (Google Places)
- Satellite property picker (Leaflet + Google Maps Static)
- Multi-step estimator wizard with property questionnaire

## Deploy

Vercel deploys automatically on push. `vercel.json` already specifies
`vite` as the framework. Production branch is `main`.

To promote `May_Release` to production: open a PR `May_Release → main`
and merge.
