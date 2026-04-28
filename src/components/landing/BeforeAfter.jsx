// "Show don't tell" — interactive before/after slider built with plain
// pointer events (no library). Drag the divider, or tap left/right of it,
// or use arrow keys when focused.

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ClipboardCheck,
  Handshake,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { FadeInUp, Section } from "./_shared";

export default function BeforeAfter() {
  return (
    <Section className="py-16 sm:py-24">
      <FadeInUp>
        <p className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-brand">
          Show, don&apos;t tell
        </p>
        <h2 className="mt-3 font-display font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.08] tracking-tightish text-ink max-w-3xl">
          Drag the divider. That&apos;s one wash.
        </h2>
      </FadeInUp>

      <FadeInUp delay={0.05}>
        <div className="mt-10">
          <Slider />
          <p className="mt-4 text-[14.5px] text-slatey text-center sm:text-left">
            Real home, north-facing wall · Leawood, KS.{" "}
            <span className="text-slatey/80">
              {/* TODO: swap copy if a different home is featured */}
            </span>
          </p>
        </div>
      </FadeInUp>

      <ProcessStrip />
    </Section>
  );
}

function Slider() {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(50); // percentage 0–100
  const draggingRef = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = (e) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  // Keyboard support: arrow keys move the divider 4% at a time.
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 4));
    } else if (e.key === "Home") {
      setPos(0);
    } else if (e.key === "End") {
      setPos(100);
    }
  };

  // Stop dragging if the pointer leaves the window.
  useEffect(() => {
    const stop = () => (draggingRef.current = false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 select-none cursor-ew-resize"
      style={{ aspectRatio: "16 / 9", touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="img"
      aria-label="Before-and-after slider showing a north-facing wall in Leawood — algae-streaked siding on the left, clean siding on the right"
    >
      {/* AFTER — full background. TODO: replace with real "after" photo. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #EEE6CD 0%, #DCC9A2 50%, #C8B281 100%)",
        }}
        aria-hidden="true"
      />
      {/* BEFORE — clipped to the left of the divider.
          TODO: replace with real "before" photo, same camera position. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #6F7A6A 0%, #5B6452 45%, #4B5343 70%, #3F463A 100%)",
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
        aria-hidden="true"
      />

      {/* Static labels */}
      <span className="absolute top-4 left-4 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-bg">
        Before
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-cta px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
        After
      </span>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: `calc(${pos}% - 1px)` }}
        aria-hidden="true"
      >
        <div className="h-full w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" />
      </div>

      <button
        type="button"
        aria-label={`Before/after slider, ${Math.round(pos)} percent`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        role="slider"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-lg ring-1 ring-black/10 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cta focus-visible:outline-offset-2"
        style={{ left: `${pos}%`, touchAction: "none" }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path
            d="M8 5 3 11l5 6M14 5l5 6-5 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

const STEPS = [
  { icon: ClipboardCheck, label: "Free quote in 24 hours" },
  { icon: Handshake, label: "Walk-through with you" },
  { icon: Sparkles, label: "Soft-wash + rinse" },
  { icon: ShieldCheck, label: "30-day guarantee" },
];

function ProcessStrip() {
  return (
    <FadeInUp delay={0.1}>
      <ol className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-0 rounded-2xl bg-white ring-1 ring-black/5 p-4 sm:p-2 shadow-sm">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <li
              key={s.label}
              className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 px-3 sm:px-4 py-2 sm:py-4 relative"
            >
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand shrink-0"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-display font-semibold text-[14.5px] text-ink leading-tight">
                <span className="text-slatey font-medium mr-1.5 hidden sm:inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </span>
              {/* Connector line on desktop */}
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden sm:block absolute top-7 right-0 h-px w-6 bg-black/10"
                />
              )}
            </li>
          );
        })}
      </ol>
    </FadeInUp>
  );
}
