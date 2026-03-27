import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/api/client";
import { motion } from "framer-motion";
import { Droplets, Check, Plus, ArrowRight } from "lucide-react";
import { SERVICE_CONFIGS } from "../servicePricingConfig";

export default function Step5bUpsell({ state, update, onNext }) {
  const { data: pricing, isLoading } = useQuery({
    queryKey: ["pricingModel"],
    queryFn: () => apiFetch('/get-pricing'),
    staleTime: 60000,
  });

  const alreadyHasDriveWay = state.services?.includes("driveway");
  const alreadyHasGutters = state.services?.includes("gutters");

  const gutterServiceAddonSelected = state.gutter_service_addon || alreadyHasGutters;
  const drivewayServiceAddonSelected = state.driveway_service_addon || alreadyHasDriveWay;

  const [gutterServiceAdded, setGutterServiceAdded] = useState(gutterServiceAddonSelected);
  const [drivewayServiceAdded, setDrivewayServiceAdded] = useState(drivewayServiceAddonSelected);

  if (isLoading || !pricing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#007AFF] rounded-full animate-spin" />
      </div>
    );
  }

  const gutterCfg = SERVICE_CONFIGS.find(s => s.id === "gutters");
  const drivewayCfg = SERVICE_CONFIGS.find(s => s.id === "driveway");
  const UPSELLS = [
    { id: "gutter_service", name: "Gutter Cleaning", price: pricing.gutters_price_low ?? pricing.gutter_fixed_price ?? gutterCfg?.defaultLow ?? 149, description: "Exterior gutter brightening and cleaning.", icon: Droplets },
    { id: "driveway_service", name: "Driveway Cleaning", price: pricing.driveway_price_low ?? pricing.driveway_fixed_price ?? drivewayCfg?.defaultLow ?? 129, description: "Concrete or asphalt pressure wash.", icon: Droplets },
  ];

  useEffect(() => {
    if (gutterServiceAddonSelected && drivewayServiceAddonSelected) {
      update({ gutter_service_addon: true, driveway_service_addon: true });
      onNext();
    }
  }, []);

  if (gutterServiceAddonSelected && drivewayServiceAddonSelected) {
    return null;
  }

  const upsellsToShow = [];
  if (!gutterServiceAddonSelected) upsellsToShow.push(UPSELLS[0]);
  if (!drivewayServiceAddonSelected && !alreadyHasDriveWay) upsellsToShow.push(UPSELLS[1]);

  const handleContinue = () => {
    update({ gutter_service_addon: gutterServiceAdded, driveway_service_addon: drivewayServiceAdded });
    onNext();
  };

  const handleSkipEnhancements = () => {
    update({ gutter_service_addon: false, driveway_service_addon: false });
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-4 max-w-lg mx-auto w-full bg-gradient-to-b from-slate-50 to-slate-100/50">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-3">
        <div>
          <span className="text-xs font-semibold text-[#007AFF] mb-1.5 block">Add Enhancements</span>
          <h2 className="text-lg font-extrabold text-[#0A192F] leading-tight">
            Boost your service?
          </h2>
        </div>

        <div className="space-y-2.5">
          {upsellsToShow.map((upsell) => {
            const isAdded = upsell.id === "gutter_service" ? gutterServiceAdded : drivewayServiceAdded;
            const setAdded = upsell.id === "gutter_service" ? setGutterServiceAdded : setDrivewayServiceAdded;
            const Icon = upsell.icon;

            return (
              <button
                key={upsell.id}
                onClick={() => setAdded(prev => !prev)}
                className={`w-full text-left rounded-lg border-2 p-3 transition-all duration-200 ${
                  isAdded
                    ? "border-[#007AFF] bg-[#007AFF]/[0.08] shadow-sm shadow-[#007AFF]/10"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3 items-start flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isAdded ? "bg-[#007AFF]/15" : "bg-slate-100"}`}>
                      <Icon className={`w-5 h-5 ${isAdded ? "text-[#007AFF]" : "text-slate-500"}`} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-bold ${isAdded ? "text-[#007AFF]" : "text-[#0A192F]"}`}>
                        {upsell.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{upsell.description}</p>
                      <p className="text-sm font-extrabold text-[#0A192F] mt-1">${upsell.price}</p>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                    isAdded ? "bg-[#007AFF] border-[#007AFF]" : "border-slate-300 bg-white"
                  }`}>
                    {isAdded
                      ? <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      : <Plus className="w-3 h-3 text-slate-400" />
                    }
                  </div>
                </div>
                {isAdded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 pt-2 border-t border-[#007AFF]/20"
                  >
                    <p className="text-xs font-semibold text-[#007AFF]">✓ Added</p>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleContinue}
            className="flex-1 h-11 rounded-lg bg-[#007AFF] text-white font-bold text-sm hover:bg-[#0066dd] transition-all shadow-md shadow-[#007AFF]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleSkipEnhancements}
            className="px-3 h-11 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-all bg-white"
          >
            Skip
          </button>
        </div>
      </motion.div>
    </div>
  );
}