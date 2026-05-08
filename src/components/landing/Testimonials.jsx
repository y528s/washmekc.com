// Three testimonials. Specific names, specific neighborhoods, specific
// outcomes. All copy is placeholder — replace with real reviews before launch.

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { FadeInUp, Section } from './_shared.jsx';

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    where: 'Leawood, KS',
    initials: 'SK',
    quote:
      "Booked Friday, washed Tuesday. The north side of our house hasn't looked this clean in eight years. Zero damage to the hostas underneath.",
  },
  {
    name: 'Marcus T.',
    where: 'Prairie Village, KS',
    initials: 'MT',
    quote:
      'Listed our house two days after they finished the driveway and siding. Sold in five days, $20K over ask. Worth every dollar.',
  },
  {
    name: 'Diane R.',
    where: 'Overland Park, KS',
    initials: 'DR',
    quote:
      "I'd had two other companies tell me the algae was 'permanent.' These guys had it gone in a morning — and were the only ones who walked the yard with me first.",
  },
];

export default function Testimonials() {
  return (
    <Section className="py-16 sm:py-24">
      <FadeInUp>
        <p className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-brand">
          What neighbors say
        </p>
        <h2 className="mt-3 font-display font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.08] tracking-tightish text-ink max-w-3xl">
          Reviews that read like they came from your group text.
        </h2>
      </FadeInUp>

      <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {TESTIMONIALS.map((t, i) => (
          /* TODO: Replace with real testimonial */
          <motion.li
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-white ring-1 ring-black/5 p-6 sm:p-7 shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-1 text-cta" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-cta" aria-hidden="true" />
              ))}
            </div>

            <blockquote className="mt-4 flex-1 text-[16px] sm:text-[17px] leading-relaxed text-ink">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3">
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-brand/10 text-brand font-display font-bold text-sm">
                {t.initials}
              </span>
              <span>
                <span className="block font-display font-bold text-[15px] text-ink">{t.name}</span>
                <span className="block text-[13px] text-slatey">{t.where}</span>
              </span>
            </figcaption>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
