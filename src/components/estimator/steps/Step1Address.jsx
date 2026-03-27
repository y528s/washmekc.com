import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowRight } from "lucide-react";
import { apiFetch } from "@/api/client";
import AddressAutocomplete from "../AddressAutocomplete";

export default function Step1Address({ state, update, onNext }) {
  const autoSearchedRef = useRef(false);
  const [manualMode, setManualMode] = useState(false);
  const [manualAddress, setManualAddress] = useState(state.address || "");

  const handleSelect = ({ address, lat, lng, displayAddress }) => {
    update({ address, lat, lng, displayAddress });
    setTimeout(() => onNext(), 300);
  };

  // If an address was pre-filled from the hero but has no lat/lng yet, trigger a geocode search
  useEffect(() => {
    if (state.address && !state.lat && !autoSearchedRef.current) {
      autoSearchedRef.current = true;
      apiFetch('/geocode', { address: state.address })
        .then((data) => {
          if (data && data.lat && data.lng) {
            update({
              address: data.formatted_address,
              displayAddress: data.formatted_address,
              lat: data.lat,
              lng: data.lng,
            });
            setTimeout(() => onNext(), 300);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleManualSubmit = () => {
    if (!manualAddress.trim()) return;
    // Skip map/property steps — go straight to services (step 4)
    // Mark as manual lead (no payment option)
    update({
      address: manualAddress.trim(),
      displayAddress: manualAddress.trim(),
      lat: null,
      lng: null,
      isManualLead: true,
    });
    // Jump to step 4 (services) by calling onNext 3 times via state
    // We use a special flag and let the wizard handle it
    onNext("manual");
  };

  return (
    <div className="min-h-full flex flex-col justify-center px-5 py-10 max-w-lg mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-[#007AFF]/10 flex items-center justify-center mb-6">
          <Home className="w-8 h-8 text-[#007AFF]" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] mb-3 leading-tight">
          Enter your address to get a quick estimate.
        </h1>
        <p className="text-[#334155] mb-8 text-base">
          We'll use your address to look up your home's details and build an accurate estimate.
        </p>

        {!manualMode ? (
          <>
            <AddressAutocomplete
              value={state.address}
              onChange={(val) => update({ address: val })}
              onSelect={handleSelect}
            />
            <button
              onClick={() => setManualMode(true)}
              className="mt-4 text-sm text-slate-400 hover:text-[#007AFF] transition-colors underline underline-offset-2 block text-center w-full"
            >
              Can't find your address? Enter it manually →
            </button>
          </>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 -mt-4 mb-2">Type your address and we'll have someone reach out with a custom quote.</p>
            <input
              type="text"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
              placeholder="123 Main St, Overland Park, KS 66212"
              autoFocus
              className="w-full h-14 px-5 rounded-2xl border-2 border-slate-200 focus:border-[#007AFF] focus:outline-none text-[#0A192F] text-base transition-colors bg-white shadow-sm"
            />
            <button
              onClick={handleManualSubmit}
              disabled={!manualAddress.trim()}
              className="w-full h-12 rounded-2xl bg-[#007AFF] text-white font-bold text-sm hover:bg-[#0066dd] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setManualMode(false)}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors block text-center w-full"
            >
              ← Back to address search
            </button>
          </div>
        )}

        {!manualMode && (
          <div className="mt-6 flex items-start gap-3 bg-slate-50 rounded-xl p-4">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <p className="text-sm text-slate-500">
              We only use your address to calculate your estimate — we never share your information.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}