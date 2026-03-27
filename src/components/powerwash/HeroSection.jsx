import React, { useState } from "react";
import { Star, Shield, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AddressAutocomplete from "@/components/estimator/AddressAutocomplete";

const trustBadges = [
  { icon: Star, label: "100% Satisfaction Guaranteed" },
  { icon: Shield, label: "Fully Insured" },
  { icon: MapPin, label: "Locally Owned in Johnson County" },
];

export default function HeroSection({ onGetEstimate }) {
  const [address, setAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelect = (result) => {
    setSelectedAddress(result);
    setAddress(result.address);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af675ba6766824f90ab5ee/e8015ce1e_image.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F]/90 via-[#0f2744]/85 to-[#0A192F]/80" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-blue-200 font-medium">
                Scheduling this week in Johnson County
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.8rem] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              Power Washing in Johnson County That Makes Your Home Look{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#007AFF] bg-clip-text text-transparent">
                Brand New
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              Professional house washing, driveway cleaning, and exterior
              pressure washing across Overland Park, Leawood, Prairie Village,
              Lenexa, Olathe, and the Kansas City metro.
            </p>

            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08]"
                >
                  <badge.icon className="w-4 h-4 text-[#007AFF]" />
                  <span className="text-sm text-slate-200 font-medium whitespace-nowrap">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Estimate Form */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-[#007AFF]/10 rounded-3xl blur-2xl" />

            <div className="relative bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-8 lg:p-10 shadow-2xl">
              {/* Inner glow border */}
              <div className="absolute inset-[1px] rounded-2xl border border-white/[0.05] pointer-events-none" />

              <div className="relative">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Get Your Instant Estimate
                </h2>
                <p className="text-slate-400 mb-8 flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  See pricing for your home in about 60 seconds.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Your Address
                    </label>
                    <AddressAutocomplete
                      value={address}
                      onChange={setAddress}
                      onSelect={handleSelect}
                      placeholder="123 Main St, Overland Park KS"
                    />
                  </div>

                  <button
                    onClick={() => onGetEstimate(selectedAddress || address)}
                    className="w-full h-14 mt-2 rounded-xl bg-[#007AFF] hover:bg-[#0066dd] text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#007AFF]/25 hover:shadow-xl hover:shadow-[#007AFF]/30 hover:scale-[1.02] active:scale-[0.98]">
                    Get My Instant Estimate
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-left text-sm text-slate-300 mt-3">
                    Takes about 60 seconds. No commitment required.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}