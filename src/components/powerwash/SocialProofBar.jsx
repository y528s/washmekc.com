import React from "react";
import { Star, MapPin, CalendarCheck, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const proofs = [
  { icon: Star, label: "100% Satisfaction Guaranteed", color: "text-amber-400" },
  { icon: MapPin, label: "Locally Owned & Operated", color: "text-[#007AFF]" },
  { icon: CalendarCheck, label: "Same Week Service Available", color: "text-violet-400" },
];

export default function SocialProofBar() {
  return (
    <section className="relative bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Logo centered */}
        <div className="flex justify-center mb-4">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af675ba6766824f90ab5ee/14e3a2633_NeighborhoodWashKC.png"
            alt="NeighborhoodWash"
            className="h-24 w-auto object-contain"
          />
        </div>

        {/* Contact info centered */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 mb-6 pb-6 border-b border-slate-100">
          <a href="tel:9137012077" className="flex items-center gap-2 text-[#0A192F] hover:text-[#007AFF] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-[#007AFF]" />
            </div>
            <span className="font-semibold text-base">913-701-2077</span>
          </a>
          <div className="hidden sm:block w-px h-5 bg-slate-200" />
          <a href="mailto:hello@washmekc.com" className="flex items-center gap-2 text-[#0A192F] hover:text-[#007AFF] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#007AFF]" />
            </div>
            <span className="font-semibold text-base">hello@washmekc.com</span>
          </a>
        </div>

        {/* Proof points */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 sm:divide-x sm:divide-slate-200">
          {proofs.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 justify-center sm:flex-1 sm:px-6"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-sm font-semibold text-[#0A192F]">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}