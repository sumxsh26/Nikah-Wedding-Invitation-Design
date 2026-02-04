import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { HeroSection } from './components/HeroSection';
import { VenueSection } from './components/VenueSection';
import { RsvpSection } from './components/RsvpSection';

export default function App() {
  const [showHero, setShowHero] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleScrollToDetails = () => {
    const venueSection = document.getElementById('venue-section');
    if (venueSection) {
      venueSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#3b010b] overflow-x-hidden relative"
      style={{ 
        fontFamily: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
        maxWidth: '430px',
        margin: '0 auto',
      }}
    >
      <HeroSection onScrollToDetails={handleScrollToDetails} />
      <VenueSection />
      <RsvpSection />
    </div>
  );
}