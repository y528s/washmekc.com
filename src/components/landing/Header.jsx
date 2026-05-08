// Sticky header. Wordmark + phone + yellow CTA. No nav menu by design —
// every interaction on this page funnels to "Get a Free Quote".

import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { scrollToQuote } from './_shared.jsx';

const PHONE_DISPLAY = '(913) 701-3077';
const PHONE_HREF = 'tel:+19137013077';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled ? 'bg-bg/90 backdrop-blur border-b border-black/5' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label="NeighborhoodWash — home">
          <Wordmark />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_HREF}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:text-brand transition-colors"
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{PHONE_DISPLAY}</span>
          </a>

          <a
            href={PHONE_HREF}
            className="sm:hidden inline-flex items-center justify-center h-11 w-11 rounded-full text-brand hover:bg-brand/5"
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={scrollToQuote}
            className="btn-cta !py-2.5 !px-4 sm:!px-5 text-sm sm:text-[15px]"
          >
            Get a Free Quote
          </button>
        </div>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M13 2.5C13 2.5 5 11 5 16.5a8 8 0 0 0 16 0C21 11 13 2.5 13 2.5Z" fill="#1E3A5F" />
        <path d="M11 17.5c-1.4 0-2.5-1.1-2.5-2.5" stroke="#FAFAF7" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="font-display font-extrabold text-[18px] tracking-tightish text-ink">
        Neighborhood<span className="text-brand">Wash</span>
      </span>
    </span>
  );
}
