import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ_DATA = [
  { id: 1, category: "Power Washing Basics", question: "What is the difference between power washing and pressure washing?", answer: "Power washing uses heated water combined with high pressure, while pressure washing uses cold or ambient-temperature water at high pressure. The heat in power washing helps break down grease, oil, and stubborn stains more effectively. For most residential surfaces like driveways, patios, and siding, pressure washing is highly effective. Power washing is ideal for heavily soiled commercial surfaces or oil-stained concrete. NeighborhoodWash uses professional-grade equipment calibrated for each surface type." },
  { id: 2, category: "Power Washing Basics", question: "What is soft washing, and when is it used instead of pressure washing?", answer: "Soft washing uses low-pressure water combined with biodegradable cleaning solutions to safely clean delicate surfaces that would be damaged by high-pressure washing. It is the preferred method for roof cleaning, vinyl siding, stucco, painted surfaces, wood fences, and screens. The cleaning solutions in soft washing kill algae, mold, mildew, and bacteria at the root rather than just blasting them away, which means results last longer. NeighborhoodWash uses soft washing for roof cleaning and house washing." },
  { id: 3, category: "Power Washing Basics", question: "Will pressure washing damage my home's siding or paint?", answer: "When performed by a trained professional using the correct pressure settings and techniques, pressure washing will not damage your home's siding or paint. Damage typically occurs when an inexperienced operator uses excessive pressure, incorrect nozzles, or the wrong angle. NeighborhoodWash technicians match equipment settings to each surface type and use soft washing techniques for painted surfaces and older homes." },
  { id: 4, category: "Our Services", question: "How often should I pressure wash my driveway?", answer: "Most homeowners in Johnson County should pressure wash their driveway once per year. Driveways accumulate oil, rubber tire marks, algae, and environmental debris that degrade concrete over time. If your driveway is near trees, has heavy traffic, or shows visible staining, twice per year is ideal. Annual driveway cleaning extends the lifespan of concrete and asphalt surfaces by preventing breakdown from organic growth and freeze-thaw cycles common in Kansas winters." },
  { id: 5, category: "Our Services", question: "Can pressure washing remove oil stains from my driveway?", answer: "Professional pressure washing with the right degreasing agents can significantly reduce or fully remove oil stains from concrete driveways. Fresh oil stains respond best to treatment. Older, set-in oil stains may require pre-treatment with a commercial degreaser before pressure washing for full removal. We use environmentally responsible cleaning solutions that are safe for surrounding landscaping." },
  { id: 6, category: "Our Services", question: "How long does a pressure washing service take?", answer: "A standard driveway pressure washing takes 30–60 minutes. Full house washing typically takes 1–3 hours depending on the home's size and story count. Deck and patio cleaning usually runs 30–90 minutes. A complete exterior package covering the house, driveway, and walkways can take 2–4 hours." },
  { id: 7, category: "Pricing & Value", question: "How much does professional pressure washing cost in Johnson County, Kansas?", answer: "Pressure washing costs in Johnson County, Kansas typically range from $150–$400 for a standard driveway, $200–$600 for house washing depending on square footage, and $75–$200 for patios and decks. NeighborhoodWash provides instant online estimates — no sales calls required. Most homeowners in Overland Park, Leawood, and Lenexa receive their quote in under 60 seconds." },
  { id: 8, category: "Pricing & Value", question: "Is professional power washing worth it vs. renting a pressure washer?", answer: "Professional power washing delivers far better results than DIY rental in most cases. Rental units operate at 1,500–2,000 PSI compared to professional equipment at 3,500–4,000 PSI. Professionals also bring the right nozzles, surfactants, and technique to clean efficiently without causing surface damage. When you factor in rental costs, your time, and the risk of damaging siding or concrete, hiring a local professional like NeighborhoodWash in Johnson County is usually the better value." },
  { id: 9, category: "Scheduling & Process", question: "Do I need to be home during the pressure washing service?", answer: "You do not need to be home during your pressure washing service. As long as we have access to an outdoor water spigot and the areas to be cleaned are accessible, our team can complete the job without you present. We ask that pets and children remain away from the work area for safety. After the job, we send a completion notification with before-and-after photos." },
  { id: 10, category: "Scheduling & Process", question: "How soon can I walk on or use my driveway after pressure washing?", answer: "You can typically walk on a freshly pressure-washed concrete driveway within 30–60 minutes, once the surface has dried. Vehicle traffic can usually resume within 1–2 hours. If a sealant was applied after cleaning, curing times are longer — typically 24–48 hours before vehicle traffic." },
  { id: 11, category: "Scheduling & Process", question: "What areas does NeighborhoodWash serve in the Kansas City metro?", answer: "NeighborhoodWash provides power washing and pressure washing services throughout Johnson County, Kansas, including Overland Park, Leawood, Lenexa, Olathe, Prairie Village, Merriam, Shawnee, and Gardner. We also service select areas in the greater Kansas City metro." },
  { id: 12, category: "Scheduling & Process", question: "Does NeighborhoodWash offer a satisfaction guarantee?", answer: "Yes. NeighborhoodWash stands behind every job with a 100% satisfaction guarantee. If you're not completely satisfied with the results, contact us within 48 hours and we'll return to address any areas that don't meet your expectations at no additional charge." },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://neighborhoodwash.com/faq#faqpage",
  "name": "Power Washing FAQ — NeighborhoodWash",
  "description": "Frequently asked questions about power washing, pressure washing, driveway cleaning, house washing, and soft washing services in Johnson County, Kansas.",
  "url": "https://neighborhoodwash.com/faq",
  "mainEntity": FAQ_DATA.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
  })),
};

export default function FAQPage() {
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.text = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(script);
    return () => { const el = document.getElementById("faq-schema"); if (el) el.remove(); };
  }, []);

  const grouped = FAQ_DATA.reduce((acc, faq) => {
    const cat = faq.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {});

  const categoryOrder = ["Power Washing Basics", "Our Services", "Pricing & Value", "Scheduling & Process"];
  const sortedCategories = [
    ...categoryOrder.filter(c => grouped[c]),
    ...Object.keys(grouped).filter(c => !categoryOrder.includes(c)),
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#0A192F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-2xl tracking-tight text-white">
            Neighborhood<span className="text-[#007AFF]">Wash</span>
          </Link>
          <Link
            to="/"
            className="h-10 px-5 rounded-xl bg-[#007AFF] hover:bg-[#0066dd] text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-[#007AFF]/20"
          >
            Get Estimate <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-[#0A192F] to-[#0f2744] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#007AFF]/20 border border-[#007AFF]/30 text-blue-300 text-xs font-semibold mb-4 uppercase tracking-wide">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            Common Questions About<br />Professional Power Washing
          </h1>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Answers about pressure washing, soft washing, driveway cleaning, and exterior services in Johnson County, Kansas.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-10">
          {sortedCategories.map((category) => (
            <div key={category}>
              <h2 className="text-lg font-bold text-[#0A192F] mb-4 pb-2 border-b border-slate-100">
                {category}
              </h2>
              <div className="space-y-2">
                {grouped[category].map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openId === faq.id}
                    onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-gradient-to-br from-[#0A192F] to-[#0f2744] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
          <p className="text-slate-300 text-sm mb-6">Get your instant estimate or give us a call.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#007AFF] hover:bg-[#0066dd] text-white font-semibold rounded-xl transition-all text-sm"
            >
              Get Instant Estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:9137013077"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-xl transition-all text-sm"
            >
              <Phone className="w-4 h-4" /> 913-701-3077
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 py-6 px-6 text-center text-sm text-slate-500">
        <Link to="/" className="hover:text-[#007AFF] transition-colors">&larr; Back to Home</Link>
      </div>
    </div>
  );
}

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-[#0A192F] text-sm leading-snug">{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
