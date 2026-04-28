// QuoteCTA — replaces the lead-form section. The booking flow lives in
// the existing EstimateWizard (Stripe + promo codes); this section is
// just the launch panel for it.

import React from "react";
import {
  ShieldCheck,
  Zap,
  CreditCard,
  MailCheck,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import { CtaButton, FadeInUp, Section } from "./_shared";

const QUOTE_BULLETS = [
  {
    icon: Zap,
    title: "Instant flat-rate pricing",
    body: "Address-based estimate in under two minutes — no in-home visit, no quote-and-call-you-back.",
  },
  {
    icon: ShieldCheck,
    title: "Insured, walked-through, guaranteed",
    body: "$1M liability. Pre-wash walkthrough. 30-day no-streak guarantee on every job.",
  },
  {
    icon: CreditCard,
    title: "Secure deposit via Stripe",
    body: "Lock your spot with a small deposit (refundable up to 48 hours before). Promo codes welcome.",
  },
];

const NEXT_STEPS = [
  {
    icon: MailCheck,
    title: "Get your price right now",
    body: "Punch in your address, pick services, see a flat-rate quote. No call center.",
  },
  {
    icon: CalendarClock,
    title: "Pick a window that works",
    body: "Same-week scheduling in season. We confirm 24 hours before with a 30-minute heads-up.",
  },
  {
    icon: Sparkles,
    title: "We walk the property with you first",
    body: "Then soft-wash, rinse, and back it with our 30-day no-streak guarantee.",
  },
];

export default function QuoteCTA() {
  return (
    <Section id="quote" className="py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* LEFT: launch panel */}
        <FadeInUp className="lg:col-span-7">
          <p className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-brand">
            Get your instant quote
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.08] tracking-tightish text-ink">
            Two minutes. Real price. Lock it in.
          </h2>
          <p className="mt-4 text-[16.5px] sm:text-[17px] leading-relaxed text-slatey max-w-xl">
            We&apos;ll pull up your house on satellite, ask three quick questions
            about it, and price the job — flat rate, no surprises. Hold your
            spot with a small deposit when you&apos;re ready.
          </p>

          <ul className="mt-8 space-y-5">
            {QUOTE_BULLETS.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display font-bold text-[16px] text-ink leading-snug">
                      {b.title}
                    </p>
                    <p className="mt-1 text-[15.5px] leading-relaxed text-slatey">{b.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-9">
            <CtaButton ariaLabel="Start my instant quote">
              Start My Instant Quote
            </CtaButton>
            <p className="mt-3 text-[13px] text-slatey">
              Free quote · No obligation · Promo codes welcome
            </p>
          </div>
        </FadeInUp>

        {/* RIGHT: what happens next */}
        <FadeInUp delay={0.05} className="lg:col-span-5">
          <div className="rounded-2xl bg-brand text-bg p-6 sm:p-8 sticky top-24">
            <p className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-cta">
              What happens next
            </p>
            <h3 className="mt-2 font-display font-bold text-[22px] sm:text-[24px] leading-snug text-bg">
              No call center. No pressure. Just a real quote.
            </h3>

            <ol className="mt-6 space-y-5">
              {NEXT_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-bg/10 text-cta"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display font-bold text-[15.5px] text-bg leading-snug">
                        <span className="text-cta mr-2">{String(i + 1).padStart(2, "0")}</span>
                        {step.title}
                      </p>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-bg/80">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </FadeInUp>
      </div>
    </Section>
  );
}
