"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedIntro from "@/components/AnimatedIntro";
import Nav from "@/components/ui/Nav";
import HeroSection from "@/components/sections/HeroSection";
import ProofBar from "@/components/sections/ProofBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PortfolioCards from "@/components/sections/PortfolioCards";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import PricingGrid from "@/components/sections/PricingGrid";
import AboutSection from "@/components/sections/AboutSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  return (
    <>
      {showIntro && <AnimatedIntro onComplete={handleIntroComplete} />}

      <motion.div
        className="noise-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Nav />
        <main>
          <HeroSection />
          <ProofBar />
          <ServicesGrid />
          <div className="section-divider" />
          <PortfolioCards />
          <div className="section-divider" />
          <ProcessTimeline />
          <div className="section-divider" />
          <PricingGrid />
          <div className="section-divider" />
          <AboutSection />
          <FinalCTA />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
