import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const cities = [
  { name: "Overland Park", lat: 38.9822, lng: -94.6708 },
  { name: "Leawood", lat: 38.9067, lng: -94.6169 },
  { name: "Prairie Village", lat: 38.9917, lng: -94.6336 },
  { name: "Lenexa", lat: 38.9536, lng: -94.7336 },
  { name: "Olathe", lat: 38.8814, lng: -94.8191 },
  { name: "Shawnee", lat: 39.0417, lng: -94.7203 },
];

export default function ServiceAreaSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#007AFF] tracking-wide uppercase mb-4">
            Service Area
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
            Serving Homes Across Johnson County
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* City List */}
          <div className="lg:col-span-2 space-y-3">
            {cities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer border border-transparent hover:border-slate-100"
              >
                <div className="w-10 h-10 rounded-xl bg-[#007AFF]/[0.08] flex items-center justify-center flex-shrink-0 group-hover:bg-[#007AFF]/[0.14] transition-colors">
                  <MapPin className="w-5 h-5 text-[#007AFF]" />
                </div>
                <div>
                  <span className="font-semibold text-[#0A192F] text-lg">{city.name}</span>
                  <p className="text-sm text-slate-500">Johnson County, KS</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl overflow-hidden border border-slate-200 shadow-lg"
            style={{ height: "460px" }}
          >
            <MapContainer
              center={[38.96, -94.69]}
              zoom={11}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {cities.map((city) => (
                <CircleMarker
                  key={city.name}
                  center={[city.lat, city.lng]}
                  radius={10}
                  pathOptions={{ color: "#007AFF", fillColor: "#007AFF", fillOpacity: 0.85, weight: 2 }}
                >
                  <Popup>
                    <strong>{city.name}</strong><br />
                    Neighborhood Wash serves this area.
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}