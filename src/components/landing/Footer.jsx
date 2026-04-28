// Minimal footer — logo, copyright, legal, service area, phone.

import React from "react";
import { Phone } from "lucide-react";

const SERVICE_AREAS = [
  "Overland Park",
  "Leawood",
  "Prairie Village",
  "Mission Hills",
  "Olathe",
  "Lenexa",
  "Shawnee",
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-bg border-t border-black/10 px-5 sm:px-8 py-12">
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <span className="font-display font-extrabold text-[18px] tracking-tightish text-ink">
            Neighborhood<span className="text-brand">Wash</span>
          </span>
          <p className="mt-3 text-[14px] text-slatey max-w-xs leading-relaxed">
            Insured soft-wash and pressure washing for homes across Johnson
            County, Kansas. Owner-operated since 2018.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-[14px] text-ink">Service area</h4>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13.5px] text-slatey">
            {SERVICE_AREAS.map((a) => (
              <li key={a}>{a}, KS</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-[14px] text-ink">Get in touch</h4>
          <a
            href="tel:+19137013077"
            className="mt-3 inline-flex items-center gap-2 text-[14.5px] font-semibold text-ink hover:text-brand transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            (913) 701-3077
          </a>
          <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13.5px] text-slatey">
            <li>
              <a href="/PrivacyPolicy" className="hover:text-ink">
                Privacy
              </a>
            </li>
            <li>
              <a href="/TermsAndConditions" className="hover:text-ink">
                Terms
              </a>
            </li>
            <li>
              <a href="/Contact" className="hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl mt-10 pt-6 border-t border-black/10 text-[12.5px] text-slatey flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span>© {year} NeighborhoodWash. All rights reserved.</span>
        <span>Overland Park, KS · Fully insured · $1M liability</span>
      </div>
    </footer>
  );
}
