import React, { useEffect, useState } from "react";
import { apiFetch } from "@/api/client";
import { CheckCircle2, Loader2, ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BookingConfirmation() {
  const [status, setStatus] = useState("loading");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const leadId = params.get("lead_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    apiFetch('/verify-deposit', { sessionId })
      .then(data => {
        if (data.success) {
          setDetails(data);
          setStatus("confirmed");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#007AFF] animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-semibold">Confirming your booking…</p>
          <p className="text-slate-400 text-sm mt-2">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-white text-2xl font-bold mb-3">We received your request</p>
          <p className="text-slate-400 mb-8 leading-relaxed">
            If you completed payment, your deposit was received. We'll follow up within 1 business day.<br /><br />
            Need immediate assistance? Call us at <a href="tel:+19137012077" className="text-[#007AFF]">913-701-2077</a>.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[#0A192F] font-bold hover:bg-slate-100 transition-all">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#0f2744] to-[#0A192F] flex items-center justify-center px-5 py-16">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#007AFF] rounded-full opacity-[0.06] blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
        className="relative max-w-md mx-auto text-center w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-8 border border-emerald-500/30"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
          Appointment Request Received
        </h2>
        <p className="text-lg text-slate-300 mb-2 leading-relaxed">
          We'll confirm your service shortly.
        </p>
        <p className="text-slate-400 text-sm mb-8">A confirmation has been sent to your email.</p>

        {/* Deposit confirmation banner */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-4 mb-6 text-left">
          <p className="text-sm font-bold text-emerald-400 mb-1">✓ Payment Received{details?.depositAmount ? ` – $${details.depositAmount}` : ""}</p>
          <p className="text-sm text-slate-400">Your payment has been processed. {details?.balanceDue > 0 ? `Balance of $${details.balanceDue} due after service.` : "No further payment required."}</p>
        </div>

        {(details?.address || details?.services || details?.finalTotal) && (
          <div className="bg-white/[0.06] backdrop-blur border border-white/[0.1] rounded-2xl p-5 mb-8 text-left space-y-3">
            {details.address && (
              <div className="flex justify-between text-sm gap-4">
                <span className="text-slate-400 flex-shrink-0">Property</span>
                <span className="text-white font-medium text-right truncate">{details.address}</span>
              </div>
            )}
            {details.services && (
              <div className="flex justify-between text-sm gap-4">
                <span className="text-slate-400 flex-shrink-0">Services</span>
                <span className="text-white font-medium text-right">{details.services}</span>
              </div>
            )}
            {details.finalTotal && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated Total</span>
                <span className="text-white font-semibold">${details.finalTotal}</span>
              </div>
            )}
          </div>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 h-12 px-8 rounded-2xl bg-white text-[#0A192F] font-bold text-base hover:bg-slate-100 transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Homepage
        </Link>
      </motion.div>
    </div>
  );
}