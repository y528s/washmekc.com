// Quote form section. Two columns on desktop: form on the left, "what
// happens next" reassurance on the right. POSTs to /api/quote and shows
// an inline success state — no redirect.

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  MailCheck,
  CalendarClock,
  ShieldCheck,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { FadeInUp, Section } from "./_shared";

const SERVICES = ["House", "Driveway", "Deck/Patio", "Fence", "Roof", "Gutters"];

const NEXT_STEPS = [
  {
    icon: MailCheck,
    title: "We text you back within 24 hours",
    body: "Usually same day. With a flat-rate quote, not a guess.",
  },
  {
    icon: CalendarClock,
    title: "You pick a window that works",
    body: "Same-week scheduling in season. We confirm 24 hours before.",
  },
  {
    icon: ShieldCheck,
    title: "We walk the property with you first",
    body: "Then soft-wash, rinse, and back it with our 30-day guarantee.",
  },
];

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    services: [],
    notes: "",
  });
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleService = (s) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Add your name";
    if (!form.address.trim()) e.address = "Add your address";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Add a valid email";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Add a phone number";
    if (form.services.length === 0) e.services = "Pick at least one service";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // NOTE: photo is intentionally NOT uploaded yet. The /api/quote stub
        // doesn't accept file uploads — wire that up alongside real backend.
        body: JSON.stringify({
          name: form.name.trim(),
          address: form.address.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          services: form.services,
          notes: form.notes.trim(),
          hasPhoto: Boolean(photo),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="quote" className="py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* LEFT: form */}
        <FadeInUp className="lg:col-span-7">
          <p className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-brand">
            Free quote
          </p>
          <h2 className="mt-3 font-display font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.08] tracking-tightish text-ink">
            Tell us about your home.
          </h2>
          <p className="mt-3 text-[16.5px] text-slatey max-w-xl">
            We&apos;ll text you back with a flat-rate quote within 24 hours. No call
            center, no pressure.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-2xl border border-sage/40 bg-sage/10 p-6 sm:p-8"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="h-7 w-7 text-sage" aria-hidden="true" />
                <h3 className="mt-3 font-display font-bold text-[20px] text-ink">
                  Got it — thanks, {form.name.split(" ")[0] || "neighbor"}.
                </h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-slatey">
                  We&apos;ll text you at {form.phone} within 24 hours with a flat-rate
                  quote. Keep an eye on {form.email} too — we&apos;ll send the
                  certificate of insurance there.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
              >
                <Field
                  id="qf-name"
                  label="Your name"
                  value={form.name}
                  onChange={update("name")}
                  error={errors.name}
                  autoComplete="name"
                  required
                />
                <Field
                  id="qf-phone"
                  label="Phone"
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  error={errors.phone}
                  autoComplete="tel"
                  placeholder="(913) 555-0123"
                  required
                />
                <Field
                  id="qf-address"
                  label="Property address"
                  value={form.address}
                  onChange={update("address")}
                  error={errors.address}
                  autoComplete="street-address"
                  className="sm:col-span-2"
                  placeholder="123 Main St, Overland Park, KS"
                  required
                />
                <Field
                  id="qf-email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  value={form.email}
                  onChange={update("email")}
                  error={errors.email}
                  autoComplete="email"
                  className="sm:col-span-2"
                  required
                />

                <fieldset className="sm:col-span-2">
                  <legend className="block font-display font-semibold text-[14.5px] text-ink mb-2">
                    What needs cleaning? <span className="text-slatey font-normal">(pick any)</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="chip"
                        data-selected={form.services.includes(s)}
                        aria-pressed={form.services.includes(s)}
                        onClick={() => toggleService(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="mt-2 text-[13px] text-red-600">{errors.services}</p>
                  )}
                </fieldset>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="qf-notes"
                    className="block font-display font-semibold text-[14.5px] text-ink mb-2"
                  >
                    Anything we should know? <span className="text-slatey font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="qf-notes"
                    rows={3}
                    className="field"
                    placeholder="Two-story, north side worst, hostas under the back wall, koi pond on the east side."
                    value={form.notes}
                    onChange={update("notes")}
                  />
                </div>

                <PhotoUpload value={photo} onChange={setPhoto} className="sm:col-span-2" />

                <div className="sm:col-span-2 mt-2">
                  <button
                    type="submit"
                    className="btn-cta w-full sm:w-auto"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      "Send My Quote Request"
                    )}
                  </button>
                  <p className="mt-3 text-[13px] text-slatey">
                    We&apos;ll text you back within 24 hours. No spam. No call center.
                  </p>
                  {status === "error" && (
                    <p className="mt-2 text-[13.5px] text-red-600" role="alert">
                      Something went wrong on our end. Try again or call us at{" "}
                      <a href="tel:+19137013077" className="underline">
                        (913) 701-3077
                      </a>
                      .
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeInUp>

        {/* RIGHT: what happens next */}
        <FadeInUp delay={0.05} className="lg:col-span-5">
          <div className="rounded-2xl bg-brand text-bg p-6 sm:p-8 sticky top-24">
            <p className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-cta">
              What happens next
            </p>
            <h3 className="mt-2 font-display font-bold text-[22px] sm:text-[24px] leading-snug text-bg">
              No call center. No pressure. Just a real quote.
            </h3>

            <ol className="mt-6 space-y-5">
              {NEXT_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-bg/10 text-cta"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display font-bold text-[15.5px] text-bg leading-snug">
                        <span className="text-cta mr-2">{String(i + 1).padStart(2, "0")}</span>
                        {step.title}
                      </p>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-bg/80">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </FadeInUp>
      </div>
    </Section>
  );
}

function Field({ id, label, error, className = "", required, ...rest }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-display font-semibold text-[14.5px] text-ink mb-2">
        {label}
        {required && <span aria-hidden="true" className="text-cta-dark"> *</span>}
      </label>
      <input
        id={id}
        className="field"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        required={required}
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-[13px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function PhotoUpload({ value, onChange, className = "" }) {
  const inputId = "qf-photo";
  return (
    <div className={className}>
      <label htmlFor={inputId} className="block font-display font-semibold text-[14.5px] text-ink mb-2">
        Photo of the dirty side <span className="text-slatey font-normal">(optional, helps us quote faster)</span>
      </label>

      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-white p-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-sage/15 text-sage">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="truncate text-[14.5px] font-medium text-ink">{value.name}</p>
            <p className="text-[12.5px] text-slatey">
              {(value.size / 1024).toFixed(0)} KB
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="grid h-9 w-9 place-items-center rounded-full text-slatey hover:bg-black/5"
            aria-label="Remove photo"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-black/15 bg-white px-4 py-5 text-[14.5px] font-medium text-slatey cursor-pointer hover:border-brand hover:text-brand transition-colors"
        >
          <Upload className="h-4 w-4" aria-hidden="true" />
          Tap to add a photo
        </label>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />
    </div>
  );
}
