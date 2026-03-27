import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Share2 } from "lucide-react";

export default function Step7Confirmation({ state, onClose }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#0f2744] to-[#0A192F] flex items-center justify-center px-5 py-16">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#007AFF] rounded-full opacity-[0.06] blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
        className="relative max-w-md mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-[#007AFF]/15 flex items-center justify-center mx-auto mb-8 border border-[#007AFF]/20"
        >
          <CheckCircle2 className="w-10 h-10 text-[#007AFF]" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
          Appointment Request Received
        </h2>
        <p className="text-lg text-slate-300 mb-2 leading-relaxed">
          We'll confirm your service shortly.
        </p>
        <p className="text-slate-400 text-sm mb-8">A confirmation has been sent to your email.</p>

        <div className="bg-white/[0.06] backdrop-blur border border-white/[0.1] rounded-2xl p-6 mb-10 text-left space-y-3">
          {state.displayAddress && (
            <div className="flex justify-between text-sm gap-4">
              <span className="text-slate-400 flex-shrink-0">Property</span>
              <span className="text-white font-medium truncate text-right">{state.displayAddress}</span>
            </div>
          )}
          {state.finalTotal && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Estimated Total</span>
              <span className="text-white font-semibold">${state.finalTotal}</span>
            </div>
          )}
          {state.email && (
            <div className="flex justify-between text-sm gap-4">
              <span className="text-slate-400 flex-shrink-0">Confirmation sent to</span>
              <span className="text-white font-medium truncate text-right">{state.email}</span>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 h-12 px-8 rounded-2xl bg-white text-[#0A192F] font-bold text-base hover:bg-slate-100 transition-all active:scale-[0.98] mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Homepage
        </button>

        {/* Share with friends */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-slate-400 text-sm mb-4 flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" /> Know a neighbor who needs this? Share us!
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://washmekc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#1560cc] transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent("Just booked Neighbor Power Wash for my home! Check them out at washmekc.com 🏡✨")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe57] transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href={`sms:?body=${encodeURIComponent("Just booked Neighbor Power Wash! Check them out at washmekc.com 🏡")}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-600 text-white text-sm font-semibold hover:bg-slate-500 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" /></svg>
              Text a Friend
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}