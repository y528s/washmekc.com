import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/api/client";
import { motion } from "framer-motion";
import { ArrowRight, Tag, BadgeCheck } from "lucide-react";
import { computeServicesTotal, SERVICE_CONFIGS } from "../servicePricingConfig";

export default function Step5Estimate({ state, update, onNext, onSkipAddons }) {
  const [revealed, setRevealed] = useState(false);
  const { sqft, stories, services = ["house"] } = state;

  const { data: pricing, isLoading } = useQuery({
    queryKey: ["pricingModel"],
    queryFn: () => apiFetch('/get-pricing'),
    staleTime: 60000,
  });

  const { low, high } = pricing
    ? computeServicesTotal(services, sqft, stories, pricing)
    : { low: 0, high: 0 };

  const discount = pricing?.booking_discount || 25;
  const discountedLow = Math.max(0, low - discount);

  useEffect(() => {
    if (!pricing) return;
    update({ estimateLow: discountedLow, estimateHigh: high });
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, [discountedLow, high, pricing]);

  if (isLoading || !pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#007AFF] rounded-full animate-spin" />
      </div>
    );
  }

  const serviceLabels = services.map(id => SERVICE_CONFIGS.find(s => s.id === id)?.label).filter(Boolean);

  const hasGutters = services.includes("gutters");
  const hasDriveway = services.includes("driveway");
  const noUpsellsAvailable = hasGutters && hasDriveway;

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-4 max-w-lg mx-auto w-full bg-gradient-to-b from-slate-50 to-slate-100/50">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-semibold text-[#007AFF] mb-2 block">Your Estimate</span>
          <h2 className="text-xl font-extrabold text-[#0A192F] leading-tight">
            {services.length === 1 ? serviceLabels[0] : `${services.length} Services`}
          </h2>
        </div>

        {/* Price display */}
        <div className="bg-gradient-to-br from-[#0A192F] to-[#0f2744] rounded-2xl p-5 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "30px 30px"
          }} />
          <div className="absolute top-0 left-1/2 w-48 h-48 bg-[#007AFF] rounded-full opacity-10 blur-2xl -translate-x-1/2 -translate-y-1/2" />
          <p className="text-slate-300 text-xs mb-2 relative z-10">Estimated Range</p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={revealed ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.1 }}
            className="relative z-10"
          >
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ${discountedLow.toLocaleString()} – ${high.toLocaleString()}
            </p>
          </motion.div>
          <p className="text-slate-400 text-xs mt-2 relative z-10">
            {services.length > 1 ? `${serviceLabels.join(", ")}` : `${sqft?.toLocaleString()} sq ft • ${stories} ${stories === 1 ? "story" : "stories"}`}
          </p>
        </div>

        {/* Itemized breakdown if multiple services */}
        {services.length > 1 && (
          <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 mb-2">Breakdown</p>
            {services.map(id => {
              const cfg = SERVICE_CONFIGS.find(s => s.id === id);
              const pLow = pricing[`${id}_price_low`] ?? cfg?.defaultLow ?? (id === "house" ? discountedLow : 0);
              const pHigh = pricing[`${id}_price_high`] ?? cfg?.defaultHigh ?? pLow;
              return (
                <div key={id} className="flex justify-between text-xs">
                  <span className="text-slate-600">{cfg?.label || id}</span>
                  <span className="font-semibold text-[#0A192F]">${pLow} – ${pHigh}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Discount banner */}
        <div className="bg-emerald-50/60 border border-emerald-200/40 rounded-xl px-3 py-2.5 flex items-start gap-2.5">
          <Tag className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-emerald-800">Save ${discount} today</p>
            <p className="text-xs text-emerald-700 mt-0.5">Book online & confirm now</p>
          </div>
        </div>

        {/* What's included */}
        <div className="bg-slate-100/50 rounded-xl p-3 flex items-start gap-2.5">
          <BadgeCheck className="w-4 h-4 text-[#007AFF] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-700">
            <span className="font-semibold">Included:</span> Final price confirmed after on-site walkthrough
          </p>
        </div>

        {noUpsellsAvailable ? (
          <button
            onClick={onSkipAddons}
            className="w-full h-12 rounded-xl bg-[#007AFF] text-white font-bold text-sm hover:bg-[#0066dd] transition-all shadow-md shadow-[#007AFF]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Continue to Contact Info
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <>
            <button
              onClick={onNext}
              className="w-full h-12 rounded-xl bg-[#007AFF] text-white font-bold text-sm hover:bg-[#0066dd] transition-all shadow-md shadow-[#007AFF]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Add Services & Enhancements
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onSkipAddons}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors py-1.5"
            >
              Skip add-ons, go straight to contact →
            </button>
          </>
        )}

        <p className="text-xs text-slate-500 leading-relaxed text-center">
          Final price after on-site walkthrough
        </p>
      </motion.div>
    </div>
  );
}