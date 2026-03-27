import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, RotateCcw, Loader2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom marker icon
const markerIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Step2Satellite({ state, update, onNext, onBack }) {
  const [confirming, setConfirming] = useState(false);
  const { lat, lng, displayAddress } = state;

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      onNext();
    }, 600);
  };

  if (!lat || !lng) {
    onBack();
    return null;
  }

  return (
    <div className="min-h-full flex flex-col">
      {/* Map */}
      <div className="h-[28vh] sm:h-[32vh] relative bg-slate-200 overflow-hidden">
        {lat && lng ? (
          <MapContainer center={[lat, lng]} zoom={16} className="w-full h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={[lat, lng]} icon={markerIcon}>
              <Popup>{displayAddress}</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            Loading map...
          </div>
        )}
      </div>

      {/* Card */}
      <div className="flex-1 px-5 py-8 max-w-lg mx-auto w-full">
        {confirming ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center py-8"
          >
            <Loader2 className="w-10 h-10 text-[#007AFF] animate-spin mb-4" />
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">Loading your address…</h2>
            <p className="text-slate-500">Almost there.</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-[#007AFF]" />
              <span className="text-sm font-semibold text-[#007AFF]">It looks like we found your home.</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A192F] mb-1 leading-tight">
              {displayAddress}
            </h2>
            <p className="text-[#334155] mb-8">Is this where your house is?</p>

            <div className="space-y-3">
              <button
                onClick={handleConfirm}
                className="w-full h-14 rounded-2xl bg-[#007AFF] hover:bg-[#0066dd] text-white font-bold text-base transition-all duration-200 shadow-lg shadow-[#007AFF]/20 active:scale-[0.98]"
              >
                Yes — this is my home
              </button>
              <button
                onClick={onBack}
                className="w-full h-12 rounded-2xl border-2 border-slate-200 text-[#334155] font-semibold text-base hover:border-slate-300 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Change address
              </button>
            </div>

            <p className="text-center text-xs text-slate-400 mt-5">
              We only use your address to calculate your estimate.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}