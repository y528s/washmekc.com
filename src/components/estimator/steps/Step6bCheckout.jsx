import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2, CreditCard, ArrowRight, CheckCircle2, Tag, Check, AlertCircle } from "lucide-react";
import { apiFetch } from "@/api/client";
import { SERVICE_CONFIGS, computeServicesTotal } from "../servicePricingConfig";

export default function Step6bCheckout({ state, update, onNext }) {
  const [loading, setLoading] = useState(null);
  const [saveCard, setSaveCard] = useState(false);
  const [paymentOption, setPaymentOption] = useState("deposit");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState("");

  const { data: pricing } = useQuery({
    queryKey: ["pricingModel"],
    queryFn: () => apiFetch('/get-pricing'),
    staleTime: 60000,
  });

  const baseServices = [
    ...(state.services || []),
    ...(state.gutter_service_addon && !state.services?.includes("gutters") ? ["gutters"] : []),
    ...(state.driveway_service_addon && !state.services?.includes("driveway") ? ["driveway"] : []),
  ];

  // If promo adds a free service, include it in the order (deduplicated)
  const freeServiceId = promoApplied?.freeServiceId || null;
  const allServices = freeServiceId && !baseServices.includes(freeServiceId)
    ? [...baseServices, freeServiceId]
    : baseServices;

  const { low: subtotalBeforePromo, servicePrices } = pricing
    ? computeServicesTotal(allServices, state.sqft, state.stories, pricing)
    : { low: state.estimateLow || 0, servicePrices: {} };

  const promoDiscount = promoApplied?.discount || 0;
  const finalTotal = Math.max(0, subtotalBeforePromo - promoDiscount);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError("");
    try {
      const res = await apiFetch('/validate-promo', { code: promoCode, subtotal: subtotalBeforePromo, sqft: state.sqft, stories: state.stories });
      if (res.valid) {
        setPromoApplied(res);
        setPromoCode("");
      } else {
        setPromoError(res.reason || 'Invalid code');
      }
    } catch {
      setPromoError("Failed to validate code");
    }
    setPromoLoading(false);
  };

  const handlePayment = async () => {
    setLoading("pay");
    try {
      const res = await apiFetch('/create-checkout', {
        name: state.name, phone: state.phone, email: state.email,
        address: state.displayAddress, lat: state.lat, lng: state.lng,
        sqft: state.sqft, stories: state.stories, yearBuilt: state.yearBuilt,
        services: allServices,
        estimateLow: state.estimateLow, estimateHigh: state.estimateHigh,
        photoUrl: state.photoUrl || null, finalTotal,
        origin: window.location.origin, saveCard, paymentOption,
        timing: state.timing, flexible: state.flexible,
      });
      update({ finalTotal, depositPaid: true });
      window.location.href = res.sessionUrl;
    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(null);
    }
  };

  const handleSkipPayment = async () => {
    setLoading("skip");
    // Save finalTotal and allServices so the Timing step can submit the lead
    update({ finalTotal, depositPaid: false, pendingServices: allServices, promoNote: promoApplied ? `Promo: ${promoApplied.code}` : null });
    setLoading(null);
    onNext();
  };

  return (
    <div className="min-h-full flex flex-col justify-center px-5 py-10 max-w-lg mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="text-sm font-semibold text-[#007AFF] mb-3 block">Review & Book</span>
        <h2 className="text-2xl font-extrabold text-[#0A192F] mb-6 leading-tight">
          Confirm your appointment
        </h2>

        {/* Order Summary */}
        <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Order Summary</p>

          <div className="space-y-2.5">
            {allServices.map(svcId => {
              const cfg = SERVICE_CONFIGS.find(s => s.id === svcId);
              const price = servicePrices[svcId] ?? 0;
              const isFree = svcId === freeServiceId;
              return (
                <div key={svcId} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isFree ? "text-emerald-500" : "text-[#007AFF]"}`} />
                    <span className="text-sm text-[#0A192F]">{cfg?.label || svcId}</span>
                    {isFree && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">FREE</span>}
                  </div>
                  {isFree
                    ? <span className="text-sm font-semibold text-emerald-600 line-through decoration-red-400">${price}</span>
                    : <span className="text-sm font-semibold text-[#0A192F]">${price}</span>
                  }
                </div>
              );
            })}
          </div>

          {/* Promo code */}
          <div className="border-t border-slate-200 mt-4 pt-4 mb-3">
            <div className="flex gap-2">
              <input
                type="text" placeholder="Promo code" value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                disabled={!!promoApplied}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm disabled:bg-slate-50 disabled:text-slate-500"
              />
              <button
                onClick={handleApplyPromo}
                disabled={!promoCode.trim() || promoLoading || !!promoApplied}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-300 disabled:opacity-50"
              >
                {promoLoading ? "..." : "Apply"}
              </button>
            </div>
            {promoError && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {promoError}</p>}
            {promoApplied && <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><Check className="w-3 h-3" /> {promoApplied.code} applied</p>}
          </div>

          {/* Totals */}
          <div className="space-y-2">
            {promoApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-emerald-700 font-semibold flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Promo Discount</span>
                <span className="text-emerald-700 font-semibold">– ${promoDiscount}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="text-base font-extrabold text-[#0A192F]">Estimated Total</span>
              <span className="text-base font-extrabold text-[#0A192F]">${finalTotal}</span>
            </div>
          </div>
        </div>

        {/* Payment options */}
        <div className="bg-gradient-to-br from-[#0A192F] to-[#0f2744] rounded-2xl p-5 mb-4">
          <p className="text-white font-bold text-base mb-4">Choose payment plan</p>

          <label className="flex items-start gap-3 mb-4 p-3 border-2 rounded-xl cursor-pointer transition-colors" style={{borderColor: paymentOption === "deposit" ? "#007AFF" : "#334155", backgroundColor: paymentOption === "deposit" ? "rgba(0,122,255,0.1)" : "transparent"}}>
            <div onClick={() => setPaymentOption("deposit")} className={`w-5 h-5 mt-0.5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${paymentOption === "deposit" ? "bg-[#007AFF] border-[#007AFF]" : "border-slate-500"}`}>
              {paymentOption === "deposit" && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">Pay 40% Now, 60% Later</p>
              <p className="text-slate-400 text-xs mt-1">${Math.round(finalTotal * 0.4)} due now · ${Math.round(finalTotal * 0.6)} after service</p>
            </div>
          </label>

          <label className="flex items-start gap-3 mb-4 p-3 border-2 rounded-xl cursor-pointer transition-colors" style={{borderColor: paymentOption === "full" ? "#007AFF" : "#334155", backgroundColor: paymentOption === "full" ? "rgba(0,122,255,0.1)" : "transparent"}}>
            <div onClick={() => setPaymentOption("full")} className={`w-5 h-5 mt-0.5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${paymentOption === "full" ? "bg-[#007AFF] border-[#007AFF]" : "border-slate-500"}`}>
              {paymentOption === "full" && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">Pay in Full Now</p>
              <p className="text-slate-400 text-xs mt-1">Pay ${finalTotal} today, nothing due later</p>
            </div>
          </label>

          <label className="flex items-start gap-3 mb-4 cursor-pointer">
            <div onClick={() => setSaveCard(!saveCard)} className={`w-5 h-5 mt-0.5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${saveCard ? "bg-[#007AFF] border-[#007AFF]" : "border-slate-500"}`}>
              {saveCard && <CheckCircle2 className="w-3 h-3 text-white" />}
            </div>
            <span className="text-slate-300 text-xs leading-relaxed">Save my payment info for faster checkout later</span>
          </label>

          <button
            onClick={handlePayment}
            disabled={!!loading}
            className="w-full h-12 rounded-xl bg-[#007AFF] text-white font-bold text-sm hover:bg-[#0066dd] disabled:opacity-60 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {loading === "pay" ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting…</>
            ) : (
              <><CreditCard className="w-4 h-4" /> {paymentOption === "deposit" ? `Pay $${Math.round(finalTotal * 0.4)}` : `Pay $${finalTotal}`}</>
            )}
          </button>
          <p className="text-slate-500 text-xs mt-2.5 text-center">Credit card · Apple Pay · Google Pay</p>
        </div>

        <button
          onClick={handleSkipPayment}
          disabled={!!loading}
          className="w-full h-12 rounded-2xl border-2 border-slate-200 text-[#334155] font-semibold text-sm hover:border-slate-300 disabled:opacity-60 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {loading === "skip" ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
          ) : (
            <>Confirm Without Payment <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
        <p className="text-xs text-slate-400 text-center mt-2">No payment required to reserve your spot.</p>
      </motion.div>
    </div>
  );
}