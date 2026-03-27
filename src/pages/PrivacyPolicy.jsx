import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: "We may collect the following types of information:",
    bullets: [
      "Contact information — such as your name, email address, phone number, and service address when you request a quote or book a service.",
      "Payment information — billing details collected to process payments for services rendered. We use third-party payment processors and do not store full credit card numbers on our servers.",
      "Property photos — images of your property taken before, during, or after a job for quality assurance and documentation purposes.",
      "Website usage data — information collected automatically through cookies and analytics tools, including IP address, browser type, pages visited, and time spent on the site.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: "We use the information we collect to:",
    bullets: [
      "Schedule and perform exterior cleaning services at your property.",
      "Process payments and send invoices or receipts.",
      "Communicate with you about your service, including confirmations, reminders, and follow-ups.",
      "Document the condition of your property before and after services.",
      "Improve our website and marketing through anonymized analytics data.",
      "Send occasional promotional communications (you may opt out at any time).",
    ],
  },
  {
    title: "3. Cookies and Analytics",
    content:
      "Our website uses cookies — small text files stored on your device — to improve your browsing experience and understand how visitors use our site. We may use tools such as Google Analytics to collect anonymized traffic data. You can disable cookies through your browser settings, though some site functionality may be affected.",
  },
  {
    title: "4. Property Photos",
    content:
      "When we photograph your property for job documentation, those images may be used internally for quality control. We may also use before-and-after photos for marketing purposes (e.g., our website or social media). If you prefer your property photos not be used in marketing, please notify us in writing and we will honor that request.",
  },
  {
    title: "5. Sharing Your Information",
    content: "We do not sell your personal information. We may share your information only in the following circumstances:",
    bullets: [
      "With service providers who assist us in operating our business (e.g., payment processors, scheduling software, CRM tools) — bound by confidentiality obligations.",
      "When required by law or to respond to valid legal process.",
      "To protect the rights, safety, or property of Neighbor Power Wash or others.",
    ],
  },
  {
    title: "6. Data Retention",
    content:
      "We retain your information for as long as necessary to provide services, comply with legal obligations, and resolve disputes. You may request deletion of your data at any time by contacting us.",
  },
  {
    title: "7. Your Rights",
    content: "You have the right to:",
    bullets: [
      "Access the personal information we hold about you.",
      "Request correction of inaccurate information.",
      "Request deletion of your personal data (subject to legal obligations).",
      "Opt out of marketing communications at any time.",
    ],
    footer: "To exercise any of these rights, contact us at the information below.",
  },
  {
    title: "8. Security",
    content:
      "We take reasonable technical and organizational measures to protect your information from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "9. Third-Party Links",
    content:
      "Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to review their policies separately.",
  },
  {
    title: "10. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. The updated version will be posted at washmekc.com with a revised effective date. Continued use of our services constitutes acceptance of the updated policy.",
  },
  {
    title: "11. Contact Us",
    content: "If you have questions about this Privacy Policy or how we handle your information, please contact us:",
    footer: "Neighbor Power Wash · 9727 Antioch Rd #13527 · Overland Park, KS 66212 · washmekc.com",
  },
];

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-extrabold text-white mb-3">Privacy Policy</h1>
          <p className="text-slate-400">Effective Date: March 12, 2026 · washmekc.com</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-[#475569] leading-relaxed mb-12 text-lg">
          Neighbor Power Wash ('we,' 'us,' or 'our') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit washmekc.com or use our services.
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