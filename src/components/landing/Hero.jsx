// Hero — Z-pattern. Eyebrow → H1 → subhead → CTA + trust banner on the
// left; before/after image placeholder on the right whose diagonal split
// pulls the eye back toward the CTA.

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Clock } from 'lucide-react';
import { CtaButton, Eyebrow, Section, scrollToQuote } from './_shared.jsx';

export default function Hero() {
  return (
    <Section id="top" className="pt-10 sm:pt-14 pb-14 sm:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT: copy + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <Eyebrow>Overland Park · Leawood · Prairie Village</Eyebrow>

          <h1 className="mt-4 font-display font-extrabold text-[40px] leading-[1.05] sm:text-[52px] lg:text-[68px] lg:leading-[1.02] tracking-tightish text-ink">
            The cleanest house on the cul-de-sac
            <span className="text-brand"> — without the weekend project.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[17px] sm:text-[18px] leading-relaxed text-slatey">
            We soft-wash siding, brighten driveways, and clear deck mildew across
            Johnson County — using low pressure and plant-safe detergent that won&apos;t
            damage your siding or your hostas.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <CtaButton onClick={scrollToQuote} ariaLabel="Get my free quote">
              Get My Free Quote
            </CtaButton>
            <a
              href="tel:+19137013077"
              className="text-sm font-semibold text-ink hover:text-brand transition-colors"
            >
              or call (913) 701-3077
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] sm:text-[14px] text-slatey">
            <li className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 text-cta fill-cta" aria-hidden="true" />
              <span>
                <strong className="text-ink font-semibold">4.9</strong> from 200+ neighbors
              </span>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-sage" aria-hidden="true" />
              <span>Fully insured</span>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand" aria-hidden="true" />
              <span>Quotes in 24 hours</span>
            </li>
          </ul>
        </motion.div>

        {/* RIGHT: before/after split image placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <BeforeAfterPlaceholder />
        </motion.div>
      </div>
    </Section>
  );
}

// TODO: Replace with real before/after of an OP two-story home, north
// side, algae streaks visible on the BEFORE half, clean siding on the
// AFTER half. Save to /public/hero-before-after.jpg and swap to <img>.
function BeforeAfterPlaceholder() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5"
      style={{ aspectRatio: '4 / 5' }}
      role="img"
      aria-label="Before and after photo of an Overland Park home — algae-streaked siding on the upper-left, freshly soft-washed siding on the lower-right"
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #6B7565 0%, #58614F 45%, #4F5847 60%, #444C3D 100%)',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #E8DDC4 0%, #D9C9A6 45%, #C9B689 60%, #B8A475 100%)',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, transparent calc(50% - 1px), rgba(255,255,255,0.85) 50%, transparent calc(50% + 1px))',
        }}
      />
      <span className="absolute top-4 left-4 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-bg">
        Before
      </span>
      <span className="absolute bottom-4 right-4 rounded-full bg-cta px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
        After
      </span>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-4 py-3 text-[12px] font-medium text-white/95">
        Real home, north-facing siding · Leawood, KS
      </div>
    </div>
  );
}
