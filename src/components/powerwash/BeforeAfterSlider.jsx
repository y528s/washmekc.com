import React, { useState } from "react";
import { motion } from "framer-motion";

const images = [
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af675ba6766824f90ab5ee/28aaaa415_patiocleaningkansascitypowerwash.png",
    label: "Patio Cleaning",
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af675ba6766824f90ab5ee/06eb17e8e_housecleaningpowerwashkansascity.png",
    label: "House Washing",
  },
  {
    src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af675ba6766824f90ab5ee/6c57549f3_powerwashdrivewaykansascity.png",
    label: "Driveway Cleaning",
  },
];

export default function BeforeAfterSlider() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-[#007AFF] tracking-wide uppercase mb-4">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
            See the Difference Professional
            <br className="hidden sm:block" /> Power Washing Makes
          </h2>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex justify-center gap-2 mb-10">
          {images.map((img, i) => (
            <button
              key={img.label}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === i
                  ? "bg-[#0A192F] text-white shadow-lg"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {img.label}
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl overflow-hidden shadow-xl aspect-[3/2]"
          >
            <img
              src={images[active].src}
              alt={images[active].label}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex justify-center gap-3 mt-6">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                active === i ? "border-[#007AFF] opacity-100" : "border-transparent opacity-50 hover:opacity-75"
              }`}
            >
              <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}