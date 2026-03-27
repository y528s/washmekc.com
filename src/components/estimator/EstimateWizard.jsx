import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WizardHeader from "./WizardHeader";
import Step1Address from "./steps/Step1Address";
import Step2Satellite from "./steps/Step2Satellite";
import Step3Property from "./steps/Step3Property";
import Step4Services from "./steps/Step4Services";
import Step5Estimate from "./steps/Step5Estimate";
import Step5bUpsell from "./steps/Step5bUpsell";
import Step6Contact from "./steps/Step6Contact";
import Step6bTiming from "./steps/Step6bTiming";
import Step6bCheckout from "./steps/Step6bCheckout";
import Step7Confirmation from "./steps/Step7Confirmation";

const SESSION_KEY = "npw_estimate_wizard";

const initialState = {
  step: 1,
  direction: 1,
  address: "",
  displayAddress: "",
  lat: null,
  lng: null,
  sqft: 2200,
  stories: 2,
  yearBuilt: 2001,
  services: ["house"],
  estimateLow: null,
  estimateHigh: null,
  drivewayaddon: false,
  guttersaddon: false,
  patioAddon: false,
  finalTotal: null,
  depositPaid: false,
  leadId: null,
  name: "",
  phone: "",
  email: "",
  photoUrl: null,
  timing: "",
  flexible: false,
};

function validateRestore(state) {
  if (!state) return { ...initialState };
  if (state.step >= 2 && !state.lat && !state.isManualLead) return { ...state, step: 1 };
  if (state.step >= 3 && !state.displayAddress) return { ...state, step: 1 };
  return state;
}

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-25%" : "25%", opacity: 0 }),
};

const steps = [
  Step1Address, Step2Satellite, Step3Property,
  Step4Services, Step5Estimate, Step5bUpsell,
  Step6Contact, Step6bCheckout, Step6bTiming, Step7Confirmation,
];

export default function EstimateWizard({ onClose, initialAddress }) {
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'wizard_step_reached', { step: 1, step_name: 'address' });
    }
  }, []);

  const [state, setState] = useState(() => {
    // If an initialAddress is provided, always start fresh to avoid stale session jumps
    if (initialAddress) {
      try { sessionStorage.removeItem(SESSION_KEY); } catch (_) {}
      return { ...initialState };
    }
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) return validateRestore(JSON.parse(saved));
    } catch (_) {}
    return { ...initialState };
  });

  useEffect(() => {
    if (!initialAddress) return;
    if (typeof initialAddress === "object" && initialAddress.lat && initialAddress.lng) {
      setState((prev) => ({
        ...prev,
        address: initialAddress.address,
        displayAddress: initialAddress.address,
        lat: initialAddress.lat,
        lng: initialAddress.lng,
        step: 2,
        direction: 1,
      }));
    } else {
      const addr = typeof initialAddress === "string" ? initialAddress : initialAddress.address || "";
      setState((prev) => ({ ...prev, address: addr }));
    }
  }, [initialAddress]);

  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(state)); } catch (_) {}
  }, [state]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const update = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const STEP_NAMES = [
    "address", "satellite", "property", "services",
    "estimate", "upsell", "contact", "checkout", "timing", "confirmation"
  ];

  const nextStep = useCallback((signal) => {
    setState((prev) => {
      if (prev.step >= steps.length) return prev;

      // Manual lead: from step 1 jump straight to step 4 (services), skip map/property/estimate
      if (signal === "manual" || prev.isManualLead) {
        if (prev.step === 1) {
          // Jump to services (step 4)
          return { ...prev, step: 4, direction: 1 };
        }
        if (prev.step === 4) {
          // Skip estimate/upsell — jump to contact (step 7)
          return { ...prev, step: 7, direction: 1 };
        }
        if (prev.step === 7) {
          // Skip checkout — jump to timing (step 9)
          return { ...prev, step: 9, direction: 1 };
        }
      }

      const nextStepNum = prev.step + 1;
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'wizard_step_reached', { step: nextStepNum, step_name: STEP_NAMES[nextStepNum - 1] });
      }
      return { ...prev, step: nextStepNum, direction: 1 };
    });
  }, []);

  // Skip from Step5Estimate (step 5) straight to Step6Contact (step 7), bypassing Upsell (step 6)
  const skipAddons = useCallback(() => {
    setState((prev) => ({ ...prev, step: 7, direction: 1, gutter_service_addon: false, driveway_service_addon: false }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.step <= 1) return prev;
      return { ...prev, step: prev.step - 1, direction: -1 };
    });
  }, []);

  const handleClose = useCallback(() => {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (_) {}
    onClose();
  }, [onClose]);

  const CurrentStep = steps[state.step - 1];
  const showHeader = state.step < 9;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col" style={{ touchAction: "manipulation" }}>
      {showHeader && (
        <WizardHeader
          step={state.step}
          address={state.displayAddress}
          onBack={state.step === 1 ? handleClose : prevStep}
        />
      )}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" custom={state.direction}>
          <motion.div
            key={state.step}
            custom={state.direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
            className="absolute inset-0 overflow-y-auto overscroll-none"
          >
            <CurrentStep
              state={state}
              update={update}
              onNext={nextStep}
              onBack={prevStep}
              onClose={handleClose}
              onSkipAddons={skipAddons}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}