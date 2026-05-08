// Problem / agitation / solution. Three short, sensory vignettes that
// mirror what the homeowner actually sees pulling into their driveway.

import React from 'react';
import { motion } from 'framer-motion';
import { FadeInUp, Section } from './_shared.jsx';

const VIGNETTES = [
  {
    title: 'The green-black streaks on the north side.',
    body:
      "Every spring, the shaded side of the house starts blooming. By May it's the first thing you see pulling into the driveway — and the first thing the neighbors see, too.",
  },
  {
    title: 'The driveway aging the whole house ten years.',
    body:
      'Tire marks, oil drips, and a slow gray haze that makes the concrete look two decades older than the home actually is. Guests notice before they ring the bell.',
  },
  {
    title: "The deck you can't host on anymore.",
    body:
      "Mildew in the corners, pollen baked into the boards, last fall's leaves still ground in. Right when summer entertaining season is starting up.",
  },
];

export default function ProblemAgitation() {
  return (
    <Section className="py-16 sm:py-24">
      <FadeInUp>
        <h2 className="font-display font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.08] tracking-tightish text-ink max-w-2xl">
          Sound familiar?
        </h2>
      </FadeInUp>

      <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {VIGNETTES.map((v, i) => (
          <motion.li
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-white p-6 sm:p-7 ring-1 ring-black/5 shadow-sm"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand font-display font-bold text-sm"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 font-display font-bold text-[19px] leading-snug text-ink">{v.title}</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slatey">{v.body}</p>
          </motion.li>
        ))}
      </ul>

      <FadeInUp delay={0.1}>
        <p className="mt-10 max-w-2xl text-[18px] leading-relaxed text-ink">
          We handle all three in a single visit —{' '}
          <span className="font-semibold text-brand">
            without touching your landscaping or risking your siding.
          </span>
        </p>
      </FadeInUp>
    </Section>
  );
}
