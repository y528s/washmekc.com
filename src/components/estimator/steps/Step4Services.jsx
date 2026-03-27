import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Car, Layers, Trees, Fence, CloudSun, Droplets, Footprints, Check, ArrowRight, ArrowLeft, LayoutGrid } from "lucide-react";

const SERVICES = [
  { id: "house",    label: "House Washing",    description: "Full exterior soft wash", icon: Home },
  { id: "driveway", label: "Driveway",          description: "Pressure wash concrete", icon: Car },
  { id: "patio",    label: "Patio Cleaning",    description: "Restore patio surfaces",  icon: Layers },
  { id: "deck",     label: "Deck Cleaning",     description: "Wood & composite decks",  icon: Trees },
  { id: "fence",    label: "Fence Washing",     description: "Wood, vinyl & metal",     icon: Fence },
  { id: "roof",     label: "Roof Soft Wash",    description: "Safe low-pressure wash",  icon: CloudSun },
  { id: "gutters",  label: "Gutter Cleaning",   description: "Clear clogs & debris",   icon: Droplets },
  { id: "walkways", label: "Walkways",           description: "Paths & sidewalks",      icon: Footprints },
];

export default function Step4Services({ state, update, onNext, onBack }) {
  const [selected, setSelected] = useState(state.services || ["house"]);
  const allSelected = selected.length === SERVICES.length;

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    update({ services: selected });
    onNext();
  };

  return (
    <div className="min-h-full px-4 py-5 max-w-lg mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0A192F] transition-colors mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}
        <span className="text-sm font-semibold text-[#007AFF] mb-2 block">Select Services</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] mb-1 leading-tight">
          What's looking dirty?
        </h2>
        <p className="text-slate-500 mb-3 text-sm">Pick everything — we'll price it all out.</p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-4 flex items-center gap-2">
          <span className="text-amber-500 text-sm">💡</span>
          <p className="text-xs text-amber-800">Most homes nearby also include driveway cleaning.</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {SERVICES.map((svc, i) => {
            const isActive = selected.includes(svc.id);
            return (
              <motion.button
                key={svc.id}
                onClick={() => toggle(svc.id)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
                className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 active:scale-[0.97] ${
                  isActive
                    ? "border-[#007AFF] bg-[#007AFF]/[0.04] shadow-sm shadow-[#007AFF]/10"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                {isActive && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#007AFF] flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                )}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                  isActive ? "bg-[#007AFF]/10" : "bg-slate-100"
                }`}>
                  <svc.icon className={`w-4 h-4 ${isActive ? "text-[#007AFF]" : "text-slate-500"}`} />
                </div>
                <p className={`text-xs font-bold leading-tight mb-0.5 ${isActive ? "text-[#007AFF]" : "text-[#0A192F]"}`}>
                  {svc.label}
                </p>
                <p className="text-[10px] text-slate-400 leading-snug">{svc.description}</p>
              </motion.button>
            );
          })}

          {/* 9th cell: Select All */}
          <button
            onClick={() => setSelected(allSelected ? ["house"] : SERVICES.map(s => s.id))}
            className={`p-3 rounded-xl border-2 border-dashed text-center flex flex-col items-center justify-center gap-1.5 transition-all active:scale-[0.97] ${
              allSelected
                ? "border-[#007AFF] bg-[#007AFF]/[0.04]"
                : "border-slate-300 hover:border-slate-400 bg-white"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${allSelected ? "bg-[#007AFF]/10" : "bg-slate-100"}`}>
              <LayoutGrid className={`w-4 h-4 ${allSelected ? "text-[#007AFF]" : "text-slate-400"}`} />
            </div>
            <p className={`text-xs font-bold leading-tight ${allSelected ? "text-[#007AFF]" : "text-slate-500"}`}>
              {allSelected ? "All Selected" : "Select All"}
            </p>
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="w-full h-14 rounded-2xl bg-[#007AFF] text-white font-bold text-base hover:bg-[#0066dd] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#007AFF]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          See My Estimate
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}