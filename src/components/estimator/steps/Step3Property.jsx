import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Step3Property({ state, update, onNext, onBack }) {
  const [sqft, setSqft] = useState(state.sqft || "");
  const [stories, setStories] = useState(state.stories || "");

  const isValid = sqft && Number(sqft) > 0 && stories && Number(stories) > 0;

  const handleContinue = () => {
    if (!isValid) return;
    update({ sqft: Number(sqft), stories: Number(stories) });
    onNext();
  };

  const storyOptions = [
    { value: 1, label: "1 Story" },
    { value: 1.5, label: "1.5 / Split" },
    { value: 2, label: "2 Stories" },
    { value: 3, label: "3+ Stories" },
  ];

  return (
    <div className="min-h-full flex flex-col justify-center px-5 py-10 max-w-lg mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0A192F] transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}
        <span className="text-sm font-semibold text-[#007AFF] mb-3 block">Property Details</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] mb-2 leading-tight">
          Tell us about your home
        </h2>
        <p className="text-slate-500 mb-6 text-sm">We use this to give you the most accurate estimate.</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Square Footage */}
          <div>
            <label className="block text-sm font-semibold text-[#0A192F] mb-2">
              Square Feet
            </label>
            <input
              type="number"
              min="100"
              max="20000"
              placeholder="e.g. 2200"
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
              className="w-full h-12 px-3 rounded-xl border-2 border-slate-200 focus:border-[#007AFF] focus:outline-none text-[#0A192F] text-base font-medium transition-all"
            />
            <a href="https://www.zillow.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#007AFF] mt-1.5 block hover:underline">Check Zillow if unsure</a>
          </div>

          {/* Stories — 2x2 grid */}
          <div>
            <label className="block text-sm font-semibold text-[#0A192F] mb-2">
              Stories
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {storyOptions.map((opt) => {
                const isActive = Number(stories) === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setStories(opt.value)}
                    className={`h-12 rounded-xl border-2 text-center transition-all duration-200 text-xs font-bold leading-tight px-1 ${
                      isActive
                        ? "border-[#007AFF] bg-[#007AFF]/[0.06] text-[#007AFF]"
                        : "border-slate-200 hover:border-slate-300 bg-white text-[#0A192F]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full h-14 rounded-2xl bg-[#007AFF] text-white font-bold text-base hover:bg-[#0066dd] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#007AFF]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}