import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, Camera, ArrowRight, ArrowLeft } from "lucide-react";

function InputField({ icon: IconComp, label, id, type, inputMode, value, onChange, error, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[#0A192F] mb-1.5">{label}</label>
      <div className="relative">
        <IconComp className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        <input
          id={id}
          type={type || "text"}
          inputMode={inputMode}
          autoComplete={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-10 pl-10 pr-3 py-2.5 rounded-lg border-2 text-[#0A192F] text-sm focus:outline-none transition-colors ${
            error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-[#007AFF]"
          }`}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function Step6Contact({ state, update, onNext, onBack }) {
  const [form, setForm] = useState({
    name: state.name || "",
    phone: state.phone || "",
    email: state.email || "",
  });
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoName, setPhotoName] = useState(null);
  const [errors, setErrors] = useState({});

  const set = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    return errs;
  };

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUploading(true);
    setPhotoName(file.name);
    try {
      const reader = new FileReader();
      reader.onload = () => update({ photoUrl: reader.result });
      reader.readAsDataURL(file);
    } catch (_) {}
    setPhotoUploading(false);
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    update({ name: form.name, phone: form.phone, email: form.email });
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-4 max-w-lg mx-auto w-full bg-gradient-to-b from-slate-50 to-slate-100/50">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-3">
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0A192F] transition-colors mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        )}
        <div>
          <span className="text-xs font-semibold text-[#007AFF] mb-1.5 block">Your Info</span>
          <h2 className="text-lg font-extrabold text-[#0A192F] leading-tight">
            How can we reach you?
          </h2>
        </div>
        <p className="text-xs text-slate-600">We'll send your quote within a few hours</p>

        <div className="space-y-2.5">
          <InputField
            icon={User} label="Your Name" id="name" value={form.name}
            onChange={(v) => set("name", v)} error={errors.name} placeholder="Jane Smith"
          />
          <InputField
            icon={Phone} label="Phone Number" id="phone" type="tel" inputMode="tel"
            value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone}
            placeholder="(913) 555-1234"
          />
          <InputField
            icon={Mail} label="Email Address" id="email" type="email" inputMode="email"
            value={form.email} onChange={(v) => set("email", v)} error={errors.email}
            placeholder="jane@email.com"
          />

          {/* Optional photo */}
          <div>
            <label className="block text-xs font-semibold text-[#0A192F] mb-1.5">
              Photo <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <label className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 cursor-pointer transition-colors ${
              state.photoUrl ? "border-emerald-400 bg-emerald-50/60" : "border-dashed border-slate-300 hover:border-slate-400"
            }`}>
              {photoUploading ? (
                <div className="w-3 h-3 text-[#007AFF] animate-spin">⟳</div>
              ) : (
                <Camera className={`w-3.5 h-3.5 flex-shrink-0 ${state.photoUrl ? "text-emerald-600" : "text-slate-400"}`} />
              )}
              <span className={`text-xs ${state.photoUrl ? "text-emerald-700 font-medium" : "text-slate-500"}`}>
                {photoUploading ? "Uploading…" : state.photoUrl ? `Added` : "Add photo"}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </label>
          </div>
          </div>

          <button
          onClick={handleSubmit}
          className="w-full h-11 rounded-lg bg-[#007AFF] text-white font-bold text-sm hover:bg-[#0066dd] transition-all shadow-md shadow-[#007AFF]/20 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
          Continue <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-xs text-slate-500">
          Your info is secure
          </p>
      </motion.div>
    </div>
  );
}