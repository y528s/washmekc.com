import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";

const VISIBLE_STEPS = ["Confirm", "Home", "Services", "Price", "Contact", "Book", "Done"];
// Maps wizard step (1-10) to visible progress step (0-7)
// Hidden: step 1 (Address), step 6 (Enhancements), step 9 (Timing)
const STEP_TO_VISIBLE = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7 };

export default function WizardHeader({ step, address, onBack }) {
  const visibleStep = STEP_TO_VISIBLE[step] || 0;

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 px-4 pt-safe-top">
      {/* Logo */}
      <div className="flex justify-center pt-4 pb-1">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af675ba6766824f90ab5ee/14e3a2633_NeighborhoodWashKC.png"
          alt="NeighborhoodWash"
          className="h-[175px] w-auto object-contain"
        />
      </div>

      <div className="flex items-center gap-2 py-1.5">
        <button
          onClick={onBack}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 active:bg-slate-300 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 text-[#0A192F]" />
        </button>

        <div className="flex-1 min-w-0">
          {address ? (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#007AFF] flex-shrink-0" />
              <p className="text-sm font-semibold text-[#0A192F] truncate">{address}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Enter your address to get started</p>
          )}
        </div>

        <div className="flex-shrink-0">
          {visibleStep > 0 && (
            <span className="text-[10px] font-semibold text-[#007AFF] bg-blue-100/50 px-2 py-0.5 rounded-full">
              {visibleStep}/7
            </span>
          )}
        </div>
      </div>

      {/* Progress bar — 7 visible steps */}
      <div className="flex gap-0.5 pb-1">
        {VISIBLE_STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isComplete = visibleStep > stepNum;
          const isActive = visibleStep === stepNum;
          return (
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`h-1 w-full rounded-full transition-all duration-500 ${
                  isComplete || isActive ? "bg-[#007AFF]" : "bg-slate-200"
                }`}
                style={isActive ? { background: "linear-gradient(90deg, #007AFF, #60a5fa)" } : {}}
              />
              <span
                className={`text-[9px] font-medium leading-none hidden sm:block ${
                  isActive ? "text-[#007AFF]" : isComplete ? "text-[#007AFF]/60" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[10px] text-slate-500 pb-1">~1 min</p>
    </div>
  );
}