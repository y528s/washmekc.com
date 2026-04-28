// Mobile-only sticky CTA bar. Appears after the user scrolls past the hero,
// hides when the quote form section enters the viewport.

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToQuote, useWizard } from "./_shared";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const openWizard = useWizard();
  const onCta = openWizard || scrollToQuote;

  useEffect(() => {
    let pastHero = false;
    let formInView = false;

    const update = () => setVisible(pastHero && !formInView);

    // Watch the hero — show CTA once it's mostly off-screen.
    const heroEl = document.getElementById("top");
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // pastHero is true when the hero is at most ~10% visible
        pastHero = entry.intersectionRatio < 0.1;
        update();
      },
      { threshold: [0, 0.1, 0.5, 1] }
    );
    if (heroEl) heroObserver.observe(heroEl);

    // Watch the form — hide CTA once the form is partly visible.
    const formEl = document.getElementById("quote");
    const formObserver = new IntersectionObserver(
      ([entry]) => {
        formInView = entry.isIntersecting;
        update();
      },
      { threshold: 0.05 }
    );
    if (formEl) formObserver.observe(formEl);

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-bg via-bg/95 to-transparent"
          role="region"
          aria-label="Get a free quote"
        >
          <button
            type="button"
            onClick={onCta}
            className="btn-cta w-full text-[16.5px]"
          >
            Get Free Quote
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
