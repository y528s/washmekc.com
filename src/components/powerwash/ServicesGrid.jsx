import React from "react";
import { motion } from "framer-motion";
import { Home, Car, TreePine, Fence, Layers, CloudSun, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "House Washing",
    description: "Restore your home's exterior with safe, effective soft washing that removes years of dirt, mildew, and algae.",
  },
  {
    icon: Car,
    title: "Driveway Pressure Washing",
    description: "Blast away oil stains, tire marks, and embedded grime from concrete and asphalt driveways.",
  },
  {
    icon: TreePine,
    title: "Patio Cleaning",
    description: "Revive your outdoor living space with thorough cleaning of stone, brick, and concrete patios.",
  },
  {
    icon: Layers,
    title: "Deck Cleaning",
    description: "Safely clean and brighten wood, composite, and vinyl decking to extend its life and beauty.",
  },
  {
    icon: Fence,
    title: "Fence Washing",
    description: "Remove green growth, stains, and weathering from wood and vinyl fences throughout your property.",
  },
  {
    icon: CloudSun,
    title: "Roof Soft Washing",
    description: "Gentle low-pressure cleaning that removes black streaks and moss without damaging shingles.",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#007AFF] tracking-wide uppercase mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
            Everything Your Home's Exterior Needs
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-100 hover:border-[#007AFF]/20 transition-all duration-500 hover:shadow-xl hover:shadow-[#007AFF]/[0.06] cursor-pointer"
            >
              {/* Inner highlight border */}
              <div className="absolute inset-[1px] rounded-2xl border border-white/80 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-14 h-14 rounded-2xl bg-[#007AFF]/[0.08] flex items-center justify-center mb-6 group-hover:bg-[#007AFF]/[0.12] transition-colors duration-300">
                <service.icon className="w-7 h-7 text-[#007AFF] transition-transform duration-300 group-hover:scale-110" />
              </div>

              <h3 className="text-xl font-bold text-[#0A192F] mb-3 flex items-center gap-2">
                {service.title}
                <ArrowUpRight className="w-4 h-4 text-[#007AFF] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </h3>

              <p className="text-[#334155] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}