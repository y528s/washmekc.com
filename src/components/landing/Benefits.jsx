// Three-column benefits grid. Lucide icons, two-sentence bodies, no fluff.

import React from "react";
import { motion } from "framer-motion";
import { Droplets, BadgeCheck, MapPin } from "lucide-react";
import { FadeInUp, Section } from "./_shared";

const BENEFITS = [
  {
    icon: Droplets,
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    title: "Soft-wash that won't strip your paint",
    body:
      "We use low-pressure rinses with a plant-safe detergent on siding and roofs — the same method manufacturers actually recommend. High pressure is for concrete, never for the side of your house.",
  },
  {
    icon: BadgeCheck,
    iconBg: "bg-sage/15",
    iconColor: "text-sage",
    title: "Insured and walked-through, every job",
    body:
      "$1M liability coverage, background-checked techs, and a pre-wash walkthrough with you before we turn anything on. Backed by a 30-day no-streak guarantee.",
  },
  {
    icon: MapPin,
    iconBg: "bg-cta/15",
    iconColor: "text-cta-dark",
    title: "Local, owner-operated, on time",
    body:
      "Based in Overland Park. Owner-run, never subcontracted. Quotes in under 24 hours and same-week scheduling once spring starts.",
  },
];

export default function Benefits() {
  return (
    <Section className="py-16 sm:py-24 bg-white -mx-5 sm:-mx-8 px-5 sm:px-8 rounded-none">
      <div className="mx-auto w-full max-w-6xl">
        <FadeInUp>
          <p className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-brand">
            Why neighbors call us first
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.08] tracking-tightish text-ink max-w-3xl">
            The careful, insured, on-time alternative.
          </h2>
        </FadeInUp>

        <ul className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.li
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-black/5 bg-bg p-6 sm:p-7"
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${b.iconBg}`}
                  aria-hidden="true"
                >
                  <Icon className={`h-6 w-6 ${b.iconColor}`} strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display font-bold text-[19px] leading-snug text-ink">
                  {b.title}
                </h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-slatey">{b.body}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
