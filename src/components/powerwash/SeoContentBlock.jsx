import React from "react";
import { motion } from "framer-motion";
import { Droplets, CheckCircle } from "lucide-react";

const services = [
  "House washing & siding restoration",
  "Driveway & concrete pressure washing",
  "Patio & outdoor living area cleaning",
  "Soft washing for vinyl & delicate surfaces",
];

export default function SeoContentBlock() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold text-[#007AFF] tracking-wide uppercase mb-4">
              About Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight mb-6 leading-tight">
              Professional Power Washing in Johnson County Kansas
            </h2>
            <div className="space-y-4 text-lg text-[#334155] leading-relaxed">
              <p>
                Neighborhood Wash delivers premium exterior cleaning services for homeowners across Johnson County, Kansas and the greater Kansas City metro area. From weathered driveways to algae-covered siding, we restore your home's curb appeal using professional-grade equipment and eco-friendly cleaning solutions.
              </p>
              <p>
                Our team specializes in house washing, driveway pressure washing, patio cleaning, and soft washing for delicate siding materials. We understand the unique challenges of Kansas weather — from summer storms to winter freeze-thaw cycles — and tailor every service to protect and revitalize your home's exterior.
              </p>
              <p>
                Proudly serving families in Overland Park, Leawood, Prairie Village, Lenexa, and Olathe, we're your trusted local partner for keeping your home looking its absolute best.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-[#007AFF]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A192F]">What We Clean</h3>
              </div>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-[#334155] font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A192F] rounded-2xl p-6 text-center">
                <div className="text-3xl font-extrabold text-white mb-1">100%</div>
                <div className="text-sm text-slate-300">Satisfaction Guaranteed</div>
              </div>
              <div className="bg-[#007AFF] rounded-2xl p-6 text-center">
                <div className="text-3xl font-extrabold text-white mb-1">5+</div>
                <div className="text-sm text-blue-100">Years Serving JoCo</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}