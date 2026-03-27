import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const links = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "/FAQ" },
  { label: "Service Area", href: "#area" },
];

export default function Navbar({ onGetEstimate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    if (href.startsWith("/")) return; // handled by Link
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className={`font-extrabold text-2xl tracking-tight transition-colors ${scrolled ? "text-[#0A192F]" : "text-white"}`}>
            Neighborhood<span className="text-[#007AFF]">Wash</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#007AFF] ${
                    scrolled ? "text-[#334155]" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`text-sm font-medium transition-colors hover:text-[#007AFF] ${
                    scrolled ? "text-[#334155]" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              )
            )}
            <button
              onClick={onGetEstimate}
              className="h-10 px-6 rounded-xl bg-[#007AFF] hover:bg-[#0066dd] text-white text-sm font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-[#007AFF]/20 hover:shadow-xl hover:shadow-[#007AFF]/25"
            >
              Get Estimate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              scrolled ? "text-[#0A192F]" : "text-white"
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A192F] pt-20 px-6"
          >
            <div className="space-y-2">
              {links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-left text-xl font-semibold text-white py-4 border-b border-white/10"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="block w-full text-left text-xl font-semibold text-white py-4 border-b border-white/10"
                  >
                    {link.label}
                  </button>
                )
              )}
              <button
                onClick={() => { setMobileOpen(false); onGetEstimate && onGetEstimate(); }}
                className="w-full mt-6 h-14 rounded-xl bg-[#007AFF] text-white font-bold text-lg flex items-center justify-center gap-2"
              >
                Get Estimate
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}