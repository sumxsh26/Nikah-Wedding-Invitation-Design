import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import backgroundImage from 'figma:asset/d408225078b16f1b9a92b2142a16ad00cc8254f2.png';
import lilyImage from 'figma:asset/74db44036b298e05870ab65e2bc167426523a2db.png';

interface HeroSectionProps {
  onScrollToDetails: () => void;
}

// Floating lily component with various animations
const FloatingLily: React.FC<{ 
  index: number; 
  delay: number; 
  shouldDisperse: boolean;
  imageUrl: string;
  initialX?: number;
  initialY?: number;
}> = ({ index, delay, shouldDisperse, imageUrl, initialX = 50, initialY = 50 }) => {
  const disperseX = (index % 2 === 0 ? -1 : 1) * (Math.random() * 300 + 200);
  const disperseY = -Math.random() * 400 - 200;
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        width: '120px',
        height: '120px',
        zIndex: shouldDisperse ? 5 : 10,
      }}
      initial={{ 
        opacity: 0,
        scale: 0.8,
        x: '-50%',
        y: '-50%',
        rotate: Math.random() * 30 - 15,
      }}
      animate={shouldDisperse ? {
        opacity: [1, 1, 0],
        scale: [1, 1.1, 0.9],
        x: ['-50%', `calc(-50% + ${disperseX}px)`],
        y: ['-50%', `calc(-50% + ${disperseY}px)`],
        rotate: [0, (index % 2 === 0 ? -1 : 1) * 45],
      } : {
        opacity: 1,
        scale: [0.8, 1, 0.95, 1],
        x: ['-50%', `calc(-50% + ${Math.sin(index) * 20}px)`, '-50%'],
        y: ['-50%', `calc(-50% + ${Math.cos(index) * 15}px)`, '-50%'],
        rotate: [
          Math.random() * 30 - 15,
          Math.random() * 40 - 20,
          Math.random() * 30 - 15,
        ],
      }}
      transition={{
        delay: delay,
        duration: shouldDisperse ? 2.5 : 8,
        ease: shouldDisperse ? [0.4, 0, 0.2, 1] : "easeInOut",
        repeat: shouldDisperse ? 0 : Infinity,
        repeatType: "reverse",
      }}
    >
      <img 
        src={lilyImage} 
        alt=""
        className="w-full h-full object-cover opacity-90 drop-shadow-lg"
        style={{
          filter: 'saturate(0.85) brightness(1.1)',
        }}
      />
    </motion.div>
  );
};

// Background floating lilies (subtle, after reveal)
const BackgroundLily: React.FC<{ 
  index: number;
  imageUrl: string;
  x: number;
  y: number;
}> = ({ index, imageUrl, x, y }) => {
  return (
    <motion.div
      className="absolute opacity-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: '80px',
        height: '80px',
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.15, 0.2, 0.15],
        x: [0, Math.sin(index) * 30, 0],
        y: [0, Math.cos(index) * 20, 0],
        rotate: [0, 10, -10, 0],
        scale: [0.9, 1, 0.95, 1],
      }}
      transition={{
        delay: 3 + index * 0.3,
        duration: 12,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <img 
        src={imageUrl} 
        alt=""
        className="w-full h-full object-cover"
        style={{
          filter: 'blur(1px) saturate(0.7)',
        }}
      />
    </motion.div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToDetails }) => {
  const [shouldDisperse, setShouldDisperse] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start dispersing lilies after initial float
    const timer = setTimeout(() => {
      setShouldDisperse(true);
    }, 2000);

    // Show content after dispersion
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  // Initial lily positions (covering the screen)
  const initialLilies = [
    { x: 50, y: 30, img: 0 },
    { x: 30, y: 45, img: 0 },
    { x: 70, y: 50, img: 0 },
    { x: 50, y: 60, img: 0 },
    { x: 20, y: 25, img: 0 },
    { x: 80, y: 35, img: 0 },
    { x: 40, y: 70, img: 0 },
    { x: 60, y: 40, img: 0 },
  ];

  // Background lilies (after reveal)
  const backgroundLilies = [
    { x: 10, y: 15, img: 0 },
    { x: 85, y: 25, img: 0 },
    { x: 15, y: 75, img: 0 },
    { x: 80, y: 80, img: 0 },
  ];

  return (
    <section 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay to darken background slightly */}
      <div className="absolute inset-0 bg-[#3b010b]/40 z-0" />
      
      {/* Initial covering lilies */}
      {initialLilies.map((lily, index) => (
        <FloatingLily
          key={`initial-${index}`}
          index={index}
          delay={index * 0.15}
          shouldDisperse={shouldDisperse}
          imageUrl={lilyImage}
          initialX={lily.x}
          initialY={lily.y}
        />
      ))}

      {/* Background floating lilies (subtle, after reveal) */}
      {showContent && backgroundLilies.map((lily, index) => (
        <BackgroundLily
          key={`bg-${index}`}
          index={index}
          imageUrl={lilyImage}
          x={lily.x}
          y={lily.y}
        />
      ))}

      {/* Main content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-20 px-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Bismillah */}
            <motion.p
              className="text-[#f2e5c6] opacity-80 mb-8"
              style={{
                fontSize: '14px',
                letterSpacing: '1px',
                fontFamily: 'Amiri, Georgia, serif',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </motion.p>

            {/* Decorative divider */}
            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            />

            {/* Invitation text */}
            <motion.p
              className="text-[#f2e5c6] mb-6 opacity-90"
              style={{
                fontSize: '15px',
                letterSpacing: '0.5px',
                lineHeight: '1.8',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Together with their families,
              <br />
              request your presence at the Nikah of
            </motion.p>

            {/* Names */}
            <motion.h1
              className="text-[#f2e5c6] mb-4"
              style={{
                fontSize: '36px',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                letterSpacing: '1px',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 1.2 }}
            >
              Aisha & Omar
            </motion.h1>

            {/* Decorative divider */}
            <motion.div
              className="w-32 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            />

            {/* Date and time */}
            <motion.div
              className="text-[#f2e5c6] mb-12"
              style={{
                fontSize: '16px',
                letterSpacing: '0.5px',
                lineHeight: '1.8',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1 }}
            >
              <p className="mb-2">Saturday, March 15th, 2026</p>
              <p className="opacity-80">4:00 PM</p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={onScrollToDetails}
              className="px-8 py-3 bg-[#f2e5c6] text-[#3b010b] rounded-full transition-all hover:bg-[#d4af37] hover:text-[#f2e5c6] hover:shadow-lg"
              style={{
                fontSize: '14px',
                letterSpacing: '1px',
                fontWeight: '600',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Nikah Details
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};