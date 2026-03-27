import React, { useState, useEffect } from "react";

const LOCAL_BUSINESS_SCHEMA = {"@context":"https://schema.org","@type":"LocalBusiness","@id":"https://neighborhoodwash.com/#business","name":"NeighborhoodWash","description":"Professional power washing, pressure washing, and exterior cleaning services in Johnson County, Kansas and the Kansas City metro.","url":"https://neighborhoodwash.com","telephone":"913-701-3077","email":"info@washmo.com","areaServed":["Overland Park, KS","Leawood, KS","Lenexa, KS","Olathe, KS","Prairie Village, KS","Shawnee, KS","Merriam, KS","Johnson County, KS"],"hasOfferCatalog":{"@type":"OfferCatalog","name":"Exterior Cleaning Services","itemListElement":[{"@type":"Offer","itemOffered":{"@type":"Service","name":"House Washing"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Driveway Pressure Washing"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Deck Cleaning"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Fence Washing"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Roof Soft Washing"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Patio Cleaning"}}]}};
import Navbar from "@/components/powerwash/Navbar";
import HeroSection from "@/components/powerwash/HeroSection";
import SocialProofBar from "@/components/powerwash/SocialProofBar";
import BeforeAfterSlider from "@/components/powerwash/BeforeAfterSlider";
import SeoContentBlock from "@/components/powerwash/SeoContentBlock";
import ServicesGrid from "@/components/powerwash/ServicesGrid";
import ServiceAreaSection from "@/components/powerwash/ServiceAreaSection";

import FinalCTA from "@/components/powerwash/FinalCTA";
import Footer from "@/components/powerwash/Footer";
import EstimateWizard from "@/components/estimator/EstimateWizard";

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const [heroAddress, setHeroAddress] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "local-business-schema";
    script.text = JSON.stringify(LOCAL_BUSINESS_SCHEMA);
    document.head.appendChild(script);
    return () => { const el = document.getElementById("local-business-schema"); if (el) el.remove(); };
  }, []);

  if (showWizard) {
    return <EstimateWizard onClose={() => setShowWizard(false)} initialAddress={heroAddress} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetEstimate={() => setShowWizard(true)} />
      <div id="hero">
        <HeroSection onGetEstimate={(addressOrObj) => { setHeroAddress(addressOrObj); setShowWizard(true); }} />
      </div>
      <SocialProofBar />
      <div id="results">
        <BeforeAfterSlider />
      </div>
      <SeoContentBlock />
      <div id="services">
        <ServicesGrid />
      </div>
      <div id="area">
        <ServiceAreaSection />
      </div>

      <FinalCTA onGetEstimate={() => setShowWizard(true)} />
      <Footer />
    </div>
  );
}