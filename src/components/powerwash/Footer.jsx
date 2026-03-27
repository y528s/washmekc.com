import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const cities = ["Overland Park", "Leawood", "Prairie Village", "Lenexa", "Olathe", "Shawnee"];

export default function Footer() {
  return (
    <footer className="bg-[#060f1d] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69af675ba6766824f90ab5ee/14e3a2633_NeighborhoodWashKC.png"
              alt="NeighborhoodWash"
              className="h-20 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed mb-6">
              Professional exterior cleaning services for homeowners across
              Johnson County, Kansas and the KC metro.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#007AFF] mt-0.5 shrink-0" />
                <span>9727 Antioch Rd #13527<br />Overland Park, KS 66282</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#007AFF]" />
                913-701-2077
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-[#007AFF]" />
                hello@washmekc.com
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">House Washing</li>
              <li className="hover:text-white transition-colors cursor-pointer">Driveway Pressure Washing</li>
              <li className="hover:text-white transition-colors cursor-pointer">Patio Cleaning</li>
              <li className="hover:text-white transition-colors cursor-pointer">Deck Cleaning</li>
              <li className="hover:text-white transition-colors cursor-pointer">Fence Washing</li>
              <li className="hover:text-white transition-colors cursor-pointer">Roof Soft Washing</li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2.5 text-sm">
              {cities.map((city) => (
                <li key={city} className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF]" />
                  {city}, KS
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer">Get an Estimate</li>
              <li><Link to="/FAQ" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/Contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Neighborhood Painting. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link to="/TermsAndConditions" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/PrivacyPolicy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}