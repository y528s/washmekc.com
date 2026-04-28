// Social proof strip — quiet, grayscale, just-enough. Static row on desktop,
// infinite-scroll marquee on mobile.

import React from "react";
import { Section } from "./_shared";

const BADGES = [
  "Nextdoor Neighborhood Favorite",
  "Google 5-Star Reviewed",
  "BBB Accredited",
  "Angi Top Pro",
  "HomeAdvisor Elite",
  "Thumbtack Top Pro",
];

export default function SocialProof() {
  return (
    <Section className="py-10 sm:py-12 border-y border-black/5">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-slatey">
        Trusted by homeowners across Johnson County
      </p>

      {/* Desktop: static grid */}
      <ul className="hidden sm:flex mt-6 flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {BADGES.map((badge) => (
          <li key={badge}>
            <BadgePill>{badge}</BadgePill>
          </li>
        ))}
      </ul>

      {/* Mobile: marquee. Duplicate the list so the loop is seamless. */}
      <div className="sm:hidden mt-6 overflow-hidden" aria-hidden="true">
        <div className="marquee-track flex gap-8 animate-marquee w-max">
          {[...BADGES, ...BADGES].map((badge, i) => (
            <BadgePill key={`${badge}-${i}`}>{badge}</BadgePill>
          ))}
        </div>
      </div>

      {/* Screen-reader fallback for the marquee, since it's aria-hidden. */}
      <ul className="sr-only">
        {BADGES.map((b) => (
          <li key={`sr-${b}`}>{b}</li>
        ))}
      </ul>
    </Section>
  );
}

function BadgePill({ children }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-semibold text-slatey grayscale opacity-90">
      {children}
    </span>
  );
}
