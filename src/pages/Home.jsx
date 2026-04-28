// Home — the NeighborhoodWash landing page.
//
// Section order: Hero → SocialProof → Problem/Agitation → Benefits →
// BeforeAfter → Testimonials → FAQ → Urgency → FinalPush → QuoteCTA.
//
// Every yellow CTA on the page opens the EstimateWizard, which handles
// the full booking flow (address → property → services → estimate →
// contact → Stripe deposit → timing → confirmation, including promo
// codes). The CTAs read the openWizard handler from WizardContext, so
// individual section components don't need to know it exists.

import React, { useCallback, useState } from "react";
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
import QuoteCTA from "@/components/landing/QuoteCTA";
import Footer from "@/components/landing/Footer";
import MobileStickyCTA from "@/components/landing/MobileStickyCTA";
import { WizardContext } from "@/components/landing/_shared";
import EstimateWizard from "@/components/estimator/EstimateWizard";

export default function Home() {
  const [wizardAddress, setWizardAddress] = useState(null);
  const [showWizard, setShowWizard] = useState(false);

  const openWizard = useCallback((addressOrObj) => {
    if (addressOrObj) setWizardAddress(addressOrObj);
    setShowWizard(true);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "wizard_open", { source: "landing_cta" });
    }
  }, []);

  const closeWizard = useCallback(() => {
    setShowWizard(false);
    setWizardAddress(null);
  }, []);

  if (showWizard) {
    return <EstimateWizard onClose={closeWizard} initialAddress={wizardAddress} />;
  }

  return (
    <WizardContext.Provider value={openWizard}>
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
          <QuoteCTA />
        </main>
        <Footer />
        <MobileStickyCTA />
      </div>
    </WizardContext.Provider>
  );
}
