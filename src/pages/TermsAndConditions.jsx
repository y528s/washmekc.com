import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Services",
    content: "Neighborhood Wash provides exterior cleaning services including but not limited to pressure washing, soft washing, and surface cleaning for residential and commercial properties in the Kansas City metro area. Service availability, scope, and pricing are subject to change without notice.",
  },
  {
    title: "2. Quotes and Pricing",
    content: "All quotes are estimates based on information provided prior to the service visit. Final pricing may vary if on-site conditions differ materially from what was described (e.g., additional square footage, heavy buildup, access issues). We will notify you of any material price changes before proceeding.",
  },
  {
    title: "3. Payment",
    content: null,
    bullets: [
      "Payment is due upon completion of services unless otherwise agreed in writing.",
      "We accept major credit cards and other payment methods as listed at the time of booking.",
      "Invoices not paid within 30 days of the service date may be subject to a late fee of 1.5% per month on the outstanding balance.",
      "Returned or declined payments may incur an additional processing fee.",
    ],
  },
  {
    title: "4. Scheduling and Cancellations",
    content: null,
    bullets: [
      "You may cancel or reschedule a service appointment with at least 24 hours' notice at no charge.",
      "Cancellations made with less than 24 hours' notice may be subject to a cancellation fee of up to $75.",
      "We reserve the right to reschedule services due to weather conditions, equipment issues, or other circumstances beyond our control. We will notify you as promptly as possible.",
    ],
  },
  {
    title: "5. Customer Responsibilities",
    content: "To ensure safe and effective service, you agree to:",
    bullets: [
      "Ensure clear access to the areas to be cleaned (remove vehicles, furniture, or obstacles as needed).",
      "Inform us of any known fragile surfaces, pre-existing damage, or areas to avoid before service begins.",
      "Ensure that outdoor water spigots are accessible and in working order.",
      "Secure or remove items that may be damaged by water pressure or cleaning solutions.",
      "Keep people and pets away from the work area during service.",
    ],
    footer: "Failure to fulfill these responsibilities may result in additional charges or impact the quality of service, for which Neighborhood Wash shall not be liable.",
  },
  {
    title: "6. Property Condition and Pre-Existing Damage",
    content: "By booking our services, you acknowledge that pressure washing can affect surfaces that are already damaged, loose, deteriorating, or improperly sealed. We are not responsible for damage to surfaces that were in poor condition prior to our arrival. We recommend disclosing any known issues before service begins.",
  },
  {
    title: "7. Limitation of Liability",
    content: "To the fullest extent permitted by law, Neighborhood Wash's total liability to you for any claim arising out of or related to our services shall not exceed the amount you paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, consequential, or punitive damages of any kind.",
  },
  {
    title: "8. Property Photos and Marketing",
    content: "We may photograph your property before and after services for documentation and quality assurance. We may use these images in our marketing materials, including our website and social media, unless you notify us in writing that you object to such use.",
  },
  {
    title: "9. Satisfaction Guarantee",
    content: "Your satisfaction is important to us. If you are not satisfied with the results of our work, please notify us within 48 hours of service completion. We will make reasonable efforts to address your concern, which may include a return visit at no charge. Claims submitted after 48 hours may not be eligible for remedy.",
  },
  {
    title: "10. Independent Contractor Status",
    content: "Neighborhood Wash operates as an independent contractor. Nothing in these Terms creates an employment, partnership, joint venture, or agency relationship between the parties.",
  },
  {
    title: "11. Governing Law",
    content: "These Terms are governed by the laws of the State of Kansas. Any disputes arising under these Terms shall be resolved in the courts of Johnson County, Kansas, and you consent to jurisdiction therein.",
  },
  {
    title: "12. Changes to These Terms",
    content: "We reserve the right to update these Terms at any time. The current version will always be available at washmekc.com. Your continued use of our services following any update constitutes acceptance of the revised Terms.",
  },
  {
    title: "13. Contact Us",
    content: "For questions about these Terms, please contact us:",
    footer: "Neighborhood Wash · 9727 Antioch Rd #13527 · Overland Park, KS 66282 · washmekc.com",
  },
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0A192F] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-[#007AFF] text-sm font-semibold uppercase tracking-wide mb-3">Legal</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Terms & Conditions</h1>
          <p className="text-slate-400">Effective Date: March 12, 2026 · washmekc.com</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-[#475569] leading-relaxed mb-12 text-lg">
          Please read these Terms and Conditions carefully before using the services of Neighborhood Wash. By booking or receiving our services, or by using washmekc.com, you agree to be bound by these Terms.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-slate-100 pb-10 last:border-0">
              <h2 className="text-xl font-bold text-[#0A192F] mb-4">{section.title}</h2>
              {section.content && (
                <p className="text-[#475569] leading-relaxed mb-4">{section.content}</p>
              )}
              {section.bullets && (
                <ul className="space-y-2 mb-4">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#475569]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#007AFF] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p className="text-[#475569] leading-relaxed mt-4">{section.footer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}