// Shared building blocks for the NeighborhoodWash landing page.
// Keeping these tiny and inline so the page stays grep-able.

import React from "react";
import { motion } from "framer-motion";

// Smooth scroll to the quote form. Used by every CTA on the page.
export function scrollToQuote() {
  const el = document.getElementById("quote");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Fade-in-up on scroll. ~24px translate, ~0.5s, runs once.
export function FadeInUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Section container: max-width, horizontal padding, vertical rhythm.
export function Section({ id, className = "", children, as: As = "section" }) {
  return (
    <As id={id} className={`px-5 sm:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </As>
  );
}

// Eyebrow text — small uppercase label that sits above an H1/H2.
export function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-brand ${className}`}
    >
      {children}
    </p>
  );
}

// Yellow CTA button. The page has exactly one CTA color — this one.
export function CtaButton({ children, onClick, className = "", as = "button", href, ariaLabel }) {
  if (as === "a" || href) {
    return (
      <a href={href} onClick={onClick} className={`btn-cta ${className}`} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`btn-cta ${className}`} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
