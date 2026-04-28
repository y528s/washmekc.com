// Full-width brand-blue band. Last chance before the form.

import React from "react";
import { CtaButton, FadeInUp, scrollToQuote } from "./_shared";

export default function FinalPush() {
  return (
    <section
      aria-label="Final call to action"
      className="bg-brand text-bg py-16 sm:py-24 px-5 sm:px-8"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <FadeInUp>
          <h2 className="font-display font-extrabold text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tightish text-bg">
            Ready for the cleanest house on the block?
          </h2>
          <p className="mt-5 text-[17px] sm:text-[18.5px] leading-relaxed text-bg/85 max-w-2xl mx-auto">
            Insured, owner-operated, and backed by a 30-day no-streak guarantee.
            We&apos;ll send a free flat-rate quote within 24 hours.
          </p>

          <div className="mt-8 flex justify-center">
            <CtaButton onClick={scrollToQuote} ariaLabel="Get my free quote">
              Get My Free Quote
            </CtaButton>
          </div>

          <p className="mt-5 text-[13.5px] text-bg/70">
            Free quote · No obligation · 30-day no-streak guarantee
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
