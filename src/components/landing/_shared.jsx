// Shared building blocks for the landing page. Tiny on purpose so the
// page stays grep-able.

import React from 'react';
import { motion } from 'framer-motion';

// All CTAs default to scrolling to the quote form section (#quote).
export function scrollToQuote() {
  const el = document.getElementById('quote');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Read prefers-reduced-motion at mount.
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  return reduce;
}

// Fade-in-up on scroll. ~24px translate, ~0.5s, runs once.
// Honors prefers-reduced-motion: degrades to a static block.
export function FadeInUp({ children, className = '', delay = 0 }) {
  const reduce = usePrefersReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Section container: max-width, horizontal padding.
export function Section({ id, className = '', children, as: As = 'section' }) {
  return (
    <As id={id} className={`px-5 sm:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </As>
  );
}

// Eyebrow text — small uppercase label that sits above an H1/H2.
export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-brand ${className}`}>
      {children}
    </p>
  );
}

// Yellow CTA button. Defaults to scrolling to the form when no onClick is given.
export function CtaButton({ children, onClick, className = '', ariaLabel }) {
  const handleClick = (e) => {
    if (onClick) return onClick(e);
    scrollToQuote();
  };
  return (
    <button type="button" onClick={handleClick} className={`btn-cta ${className}`} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
