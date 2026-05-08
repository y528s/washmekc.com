// Home — the NeighborhoodWash landing page.
//
// Section order: Hero → SocialProof → ProblemAgitation → Benefits →
// BeforeAfter → Testimonials → FAQ → Urgency → FinalPush → QuoteForm.
//
// Every CTA on the page scrolls to #quote (the QuoteForm section).
// MobileStickyCTA appears after the hero leaves view, hides when the
// form is in view.

import React from 'react';
import Header from '../components/landing/Header.jsx';
import Hero from '../components/landing/Hero.jsx';
import SocialProof from '../components/landing/SocialProof.jsx';
import ProblemAgitation from '../components/landing/ProblemAgitation.jsx';
import Benefits from '../components/landing/Benefits.jsx';
import BeforeAfter from '../components/landing/BeforeAfter.jsx';
import Testimonials from '../components/landing/Testimonials.jsx';
import FAQ from '../components/landing/FAQ.jsx';
import Urgency from '../components/landing/Urgency.jsx';
import FinalPush from '../components/landing/FinalPush.jsx';
import QuoteForm from '../components/landing/QuoteForm.jsx';
import Footer from '../components/landing/Footer.jsx';
import MobileStickyCTA from '../components/landing/MobileStickyCTA.jsx';

export default function Home() {
  return (
    <div className="min-h-screen">
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
