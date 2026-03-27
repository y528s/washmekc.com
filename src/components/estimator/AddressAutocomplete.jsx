import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { apiFetch } from "@/api/client";

function formatSuggestion(item) {
  const a = item.address || {};
  const parts = [];
  if (a.house_number && a.road) parts.push(`${a.house_number} ${a.road}`);
  else if (a.road) parts.push(a.road);
  const city = a.city || a.town || a.village || a.county || "";
  const state = a.state || "";
  const zip = a.postcode || "";
  if (city) parts.push(city);
  if (state && zip) parts.push(`${state} ${zip}`);
  else if (state) parts.push(state);
  return parts.join(", ") || item.display_name.split(",").slice(0, 3).join(",");
}

export default function AddressAutocomplete({ value, onChange, onSelect, placeholder }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  // Sync query when value prop changes externally
  useEffect(() => {
    if (value !== undefined && value !== query) {
      setQuery(value);
    }
  }, [value]);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInput = (val) => {
    setQuery(val);
    onChange && onChange(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!val.trim() || val.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&countrycodes=us&limit=5&addressdetails=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        const filtered = data.filter(item => {
          const st = item.address?.state;
          return st === "Kansas" || st === "Missouri";
        });
        setSuggestions(filtered);
        setOpen(filtered.length > 0);
      } catch (_) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  const handleSelect = async (item) => {
    const formatted = formatSuggestion(item);
    setQuery(formatted);
    setSuggestions([]);
    setOpen(false);
    
    try {
      const data = await apiFetch('/geocode', { address: formatted });
      onSelect &&
        onSelect({
          address: data.formatted_address || formatted,
          lat: data.lat,
          lng: data.lng,
          displayAddress: data.formatted_address || formatted,
        });
    } catch (_) {
      // Fallback to Nominatim coordinates if Google lookup fails
      onSelect &&
        onSelect({
          address: formatted,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          displayAddress: formatted,
        });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder || "123 Main St, Overland Park KS"}
          autoComplete="off"
          className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-slate-200 focus:border-[#007AFF] focus:outline-none text-[#0A192F] text-base transition-colors bg-white shadow-sm"
        />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007AFF] animate-spin" />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden">
          {suggestions.map((item, i) => (
            <button
              key={item.place_id || i}
              onMouseDown={() => handleSelect(item)}
              className="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors text-left border-b last:border-b-0 border-slate-100"
            >
              <MapPin className="w-4 h-4 text-[#007AFF] mt-0.5 flex-shrink-0" />
              <span className="text-sm text-[#334155] leading-snug line-clamp-2">
                {formatSuggestion(item)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}