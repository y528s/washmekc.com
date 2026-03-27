import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { apiFetch } from "@/api/client";

const TIMING_OPTIONS = [
  { id: "asap",       label: "As soon as possible",   description: "Within the next 1–2 weeks" },
  { id: "this_month", label: "This month",             description: "Flexible within the next 30 days" },
  { id: "next_month", label: "Next month",             description: "No rush — schedule for next month" },
  { id: "flexible",   label: "Flexible on timing",    description: "We'll book whenever works best" },
  { id: "just_price", label: "Just getting a price",  description: "Not ready to book yet" },
];

export default function Step6bTiming({ state, update, onNext, onBack }) {
  const [timing, setTiming] = useState(state.timing || "");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const errs = {};
    if (!timing) errs.timing = "Please select when you'd like to get this done";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const flexible = timing === "flexible";
    update({ timing, flexible });

    // If this is a no-payment submission (manual lead or skipped payment), submit now
    if (!state.depositPaid && (state.pendingServices || state.isManualLead)) {
      setLoading(true);
      const noteParts = [];
      if (state.promoNote) noteParts.push(state.promoNote);
      noteParts.push(`Timing: ${timing} | Flexible: ${flexible ? 'Yes' : 'No'}`);

      await apiFetch('/submit-lead', {
        name: state.name, phone: state.phone, email: state.email,
        address: state.displayAddress, lat: state.lat, lng: state.lng,
        sqft: state.sqft, stories: state.stories, yearBuilt: state.yearBuilt,
        services: state.pendingServices || state.services,
        estimateLow: state.estimateLow, estimateHigh: state.estimateHigh,
        photoUrl: state.photoUrl || null,
        finalTotal: state.finalTotal,
        depositPaid: false,
        timing, flexible,
      });
      setLoading(false);
    }

    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-4 max-w-lg mx-auto w-full bg-gradient-to-b from-slate-50 to-slate-100/50">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-3">
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0A192F] transition-colors mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}
        <div>
          <span className="text-xs font-semibold text-[#007AFF] mb-1.5 block">Timing</span>
          <h2 className="text-lg font-extrabold text-[#0A192F] leading-tight">
            When do you need this?
          </h2>
        </div>

        {/* Timing options */}
        <div className="space-y-2">
          {TIMING_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setTiming(option.id);
                setErrors({});
              }}
              className={`w-full text-left rounded-lg border-2 p-3 transition-all duration-200 ${
                timing === option.id
                  ? "border-[#007AFF] bg-[#007AFF]/[0.08] shadow-sm shadow-[#007AFF]/10"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-sm font-bold ${timing === option.id ? "text-[#007AFF]" : "text-[#0A192F]"}`}>
                    {option.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{option.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                  timing === option.id ? "bg-[#007AFF] border-[#007AFF]" : "border-slate-300 bg-white"
                }`}>
                  {timing === option.id && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
              </div>
            </button>
          ))}
        </div>

        {errors.timing && <p className="text-xs text-red-500 mb-2">{errors.timing}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-11 rounded-lg bg-[#007AFF] text-white font-bold text-sm hover:bg-[#0066dd] transition-all shadow-md shadow-[#007AFF]/20 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <>Continue <ArrowRight className="w-4 h-4" /></>}
        </button>
      </motion.div>
    </div>
  );
}