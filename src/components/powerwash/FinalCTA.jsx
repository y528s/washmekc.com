import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA({ onGetEstimate }) {
  return (
    <section className="py-24 bg-[#0A192F] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#007AFF] rounded-full opacity-[0.06] blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#007AFF] rounded-full opacity-[0.04] blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-blue-200 font-medium">
              Free estimates — no commitment
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Get Your Instant Power
            <br className="hidden sm:block" /> Washing Estimate
          </h2>

          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Enter your address and see pricing for your home in about 60 seconds.
            No commitment, no pressure — just honest pricing from your local team.
          </p>

          <button
            onClick={onGetEstimate}
            className="inline-flex items-center gap-3 h-16 px-10 rounded-2xl bg-[#007AFF] hover:bg-[#0066dd] text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-[#007AFF]/25 hover:shadow-2xl hover:shadow-[#007AFF]/30 hover:scale-[1.03] active:scale-[0.98]">
            Start My Estimate
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-slate-500 text-sm mt-6">
            Serving Overland Park, Leawood, Prairie Village, Lenexa, Olathe & more
          </p>
        </motion.div>
      </div>
    </section>
  );
}