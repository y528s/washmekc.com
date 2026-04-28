// Honest urgency. No countdown timers, no fake scarcity. Just a real
// scheduling note in the brand's plain-spoken voice.

import React from "react";
import { CalendarClock, ArrowRight } from "lucide-react";
import { FadeInUp, Section, scrollToQuote, useWizard } from "./_shared";

export default function Urgency() {
  const openWizard = useWizard();
  const onCta = openWizard || scrollToQuote;
  return (
    <Section className="py-12 sm:py-16">
      <FadeInUp>
        <div className="rounded-2xl bg-sage/10 border border-sage/30 px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center gap-6">
          <span
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage/20 text-sage"
            aria-hidden="true"
          >
            <CalendarClock className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h2 className="font-display font-bold text-[22px] sm:text-[26px] leading-snug text-ink">
              A heads up on spring scheduling.
            </h2>
            <p className="mt-2 text-[16px] sm:text-[16.5px] leading-relaxed text-slatey max-w-3xl">
              Spring books up by mid-May. July fills by early June. And the longer
              algae sits on the north side, the more aggressive it gets — sometimes
              what would&apos;ve been one wash turns into two. No countdown timer,
              no pressure — just an honest note from a small crew with a real calendar.
            </p>
            <button
              type="button"
              onClick={onCta}
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              Get on the schedule
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </FadeInUp>
    </Section>
  );
}
