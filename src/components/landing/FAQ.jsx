// FAQ accordion. Eight questions, first one open by default.
// Tone: friendly contractor on the phone — not a help-desk article.

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeInUp, Section } from "./_shared";

const FAQS = [
  {
    q: "How much does pressure washing cost in Overland Park?",
    a: "Most homes in Overland Park, Leawood, and Prairie Village land between $300 and $650 for a soft-wash. Driveways usually run $150–$250 on top. We send a flat-rate quote — no surprises and no estimator that bills time-and-materials at the end.",
  },
  {
    q: "Will pressure washing damage my siding?",
    a: "Done wrong, it absolutely can — that's why we don't pressure wash siding at all. We soft-wash it: low pressure plus a plant-safe detergent that does the actual cleaning. Same approach the major siding manufacturers recommend, and the only one that doesn't void their warranties.",
  },
  {
    q: "What's the difference between pressure washing and soft washing?",
    a: "Pressure washing uses high water pressure to blast dirt off hard surfaces — great for concrete and pavers. Soft washing uses very low pressure plus a cleaning solution. Siding, roofs, and painted decks need soft washing. We use the right one for each surface.",
  },
  {
    q: "How often should I have my house washed?",
    a: "Most Johnson County homes do best with a yearly soft-wash, usually in late spring or early summer. North-facing walls and homes near big trees can pick up algae faster — those sometimes need it twice a year.",
  },
  {
    q: "Are you insured?",
    a: "Yes — $1M general liability, plus workers' comp on every tech. We're happy to email a copy of our certificate of insurance with your quote.",
  },
  {
    q: "Do you service Leawood, Prairie Village, Mission Hills, and Olathe?",
    a: "Yes. Our service area covers Overland Park, Leawood, Prairie Village, Mission Hills, Olathe, Lenexa, and Shawnee — basically all of Johnson County. If you're a few minutes outside, ask anyway.",
  },
  {
    q: "How long does the job take?",
    a: "A typical house wash takes 2–3 hours. House plus driveway plus deck is usually a half-day. We'll give you a window when we book and text you when we're 30 minutes out.",
  },
  {
    q: "What do I need to do to get ready?",
    a: "Close your windows, move cars off the driveway, and let us know about any outdoor outlets, koi ponds, or potted plants we should plan around. We tarp landscaping and rinse it before and after — you don't have to do anything to your plants.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <Section className="py-16 sm:py-24">
      <FadeInUp>
        <p className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-brand">
          The short version
        </p>
        <h2 className="mt-3 font-display font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.08] tracking-tightish text-ink max-w-3xl">
          Questions homeowners actually ask us.
        </h2>
      </FadeInUp>

      <FadeInUp delay={0.05}>
        <ul className="mt-10 divide-y divide-black/10 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm overflow-hidden">
          {FAQS.map((item, i) => {
            const open = openIdx === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-7 py-5 sm:py-6 hover:bg-bg/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cta focus-visible:outline-offset-[-2px]"
                  >
                    <span className="font-display font-bold text-[16.5px] sm:text-[18px] leading-snug text-ink pr-4">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-brand transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="px-5 sm:px-7 pb-6 sm:pb-7 -mt-1"
                >
                  <p className="text-[15.5px] sm:text-[16px] leading-relaxed text-slatey max-w-3xl">
                    {item.a}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </FadeInUp>
    </Section>
  );
}
