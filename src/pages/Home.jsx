// Home — the NeighborhoodWash landing page.
// Section order is intentional: Hero → SocialProof → Problem/Agitation →
// Benefits → BeforeAfter → Testimonials → FAQ → Urgency → FinalPush → QuoteForm.
//
// Every CTA on the page scrolls to #quote (the QuoteForm section).
// Sticky bottom CTA appears on mobile only, after the hero leaves view.

import React from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import ProblemAgitation from "@/components/landing/ProblemAgitation";
import Benefits from "@/components/landing/Benefits";
import BeforeAfter from "@/components/landing/BeforeAfter";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Urgency from "@/components/landing/Urgency";
import FinalPush from "@/components/landing/FinalPush";
import QuoteForm from "@/components/landing/QuoteForm";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileStickyCTA";

export default function Home() {
  return (
    <div className="landing-root min-h-screen">
      {/* Skip-link for keyboard users — hidden until focused. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cta focus:px-4 focus:py-2 focus:font-semibold focus:text-ink focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <SocialProof />
        <ProblemAgitation />
        <Benefits />
        <BeforeAfter />
        <Testimonials />
        <FAQ />
        <Urgency />
        <FinalPush />
        <QuoteForm />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
