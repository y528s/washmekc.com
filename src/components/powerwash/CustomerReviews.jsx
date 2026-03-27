import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    text: "Got an estimate in minutes and my driveway looks brand new. These guys are the real deal — professional, on time, and the results speak for themselves.",
    name: "Sarah M.",
    city: "Overland Park",
    rating: 5,
  },
  {
    text: "Our house siding hadn't been cleaned in years. Neighbor Power Wash made it look like the day we moved in. Incredible transformation.",
    name: "Mike T.",
    city: "Leawood",
    rating: 5,
  },
  {
    text: "I was amazed at how quick the whole process was. Scheduled online, got a fair price, and they were here the same week. Highly recommend!",
    name: "Jennifer L.",
    city: "Prairie Village",
    rating: 5,
  },
  {
    text: "Best power washing service in Johnson County, hands down. They even cleaned our back patio and it looks better than when it was installed.",
    name: "David R.",
    city: "Lenexa",
    rating: 5,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#007AFF] tracking-wide uppercase mb-4">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
            What Our Neighbors Say
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="w-8 h-8 text-[#007AFF]/20 mb-4" />
              <StarRating rating={review.rating} />
              <p className="text-[#334155] text-lg leading-relaxed mt-4 mb-6">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0A192F] flex items-center justify-center text-white font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#0A192F]">{review.name}</p>
                  <p className="text-sm text-slate-500">{review.city}, KS</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}