import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { apiFetch } from "@/api/client";

const SERVICE_CITIES = [
  { name: "Overland Park", lat: 38.9822, lng: -94.6708 },
  { name: "Leawood", lat: 38.9667, lng: -94.6333 },
  { name: "Prairie Village", lat: 38.9917, lng: -94.6333 },
  { name: "Lenexa", lat: 38.9536, lng: -94.7336 },
  { name: "Olathe", lat: 38.8814, lng: -94.8191 },
  { name: "Shawnee", lat: 39.0228, lng: -94.7150 },
  { name: "Merriam", lat: 39.0167, lng: -94.6833 },
  { name: "Gardner", lat: 38.8114, lng: -94.9280 },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await apiFetch('/send-contact', form);
      setStatus(res.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-[#0A192F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
          <Link to="/" className="font-extrabold text-2xl tracking-tight text-white">
            Neighborhood<span className="text-[#007AFF]">Wash</span>
          </Link>
          <Link to="/" className="h-10 px-5 rounded-xl bg-[#007AFF] hover:bg-[#0066dd] text-white text-sm font-semibold flex items-center gap-2 transition-all">
            Get Estimate <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A192F] to-[#0f2744] text-white py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Contact Us</h1>
          <p className="text-slate-300 text-base">We're local, responsive, and ready to help.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 grid lg:grid-cols-2 gap-12">
        {/* Left: contact info + map */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#0A192F] mb-5">Get in Touch</h2>
            <div className="space-y-4">
              <a href="tel:+19137012077" className="flex items-center gap-3 text-slate-700 hover:text-[#007AFF] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#007AFF]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Phone</p>
                  <p className="font-semibold">913-701-2077</p>
                </div>
              </a>
              <a href="mailto:hello@washmekc.com" className="flex items-center gap-3 text-slate-700 hover:text-[#007AFF] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#007AFF]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Email</p>
                  <p className="font-semibold">hello@washmekc.com</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#007AFF]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Address</p>
                  <p className="font-semibold">9727 Antioch Rd #13527<br />Overland Park, KS 66282</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-xl font-bold text-[#0A192F] mb-4">Service Area</h2>
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-72">
              <MapContainer
                center={[38.95, -94.69]}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                scrollWheelZoom={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {SERVICE_CITIES.map(city => (
                  <Circle
                    key={city.name}
                    center={[city.lat, city.lng]}
                    radius={4000}
                    pathOptions={{ color: "#007AFF", fillColor: "#007AFF", fillOpacity: 0.2, weight: 1 }}
                  >
                    <Tooltip permanent direction="center" className="text-xs font-semibold">
                      {city.name}
                    </Tooltip>
                  </Circle>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div>
          <h2 className="text-xl font-bold text-[#0A192F] mb-5">Send a Message</h2>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#0A192F] mb-2">Message Sent!</h3>
              <p className="text-slate-600 text-sm">We'll get back to you within 1 business day.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Name *</label>
                  <input
                    type="text" required value={form.name}
                    onChange={e => set("name", e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 focus:border-[#007AFF] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Phone</label>
                  <input
                    type="tel" value={form.phone}
                    onChange={e => set("phone", e.target.value)}
                    placeholder="(913) 555-1234"
                    className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 focus:border-[#007AFF] focus:outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Email *</label>
                <input
                  type="email" required value={form.email}
                  onChange={e => set("email", e.target.value)}
                  placeholder="jane@email.com"
                  className="w-full h-11 px-4 rounded-xl border-2 border-slate-200 focus:border-[#007AFF] focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">Message *</label>
                <textarea
                  required value={form.message}
                  onChange={e => set("message", e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#007AFF] focus:outline-none text-sm resize-none"
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-red-600">Something went wrong. Please try again or call us directly.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-12 rounded-xl bg-[#007AFF] hover:bg-[#0066dd] text-white font-bold text-sm disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
              >
                {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-slate-100 py-6 px-6 text-center text-sm text-slate-500">
        <Link to="/" className="hover:text-[#007AFF] transition-colors">← Back to Home</Link>
      </div>
    </div>
  );
}