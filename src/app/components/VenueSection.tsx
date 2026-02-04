import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import backgroundImage from "figma:asset/d408225078b16f1b9a92b2142a16ad00cc8254f2.png";

export const VenueSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="venue-section"
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to blend background */}
      <div className="absolute inset-0 bg-[#3b010b]/50 z-0 scale-[1.5]" />

      {/* Subtle corner floral accents */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 opacity-10"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={isVisible ? { opacity: 0.1, x: 0, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,0 Q30,30 0,60 Q30,30 60,0 Z"
            fill="#d4af37"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 opacity-10"
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={isVisible ? { opacity: 0.1, x: 0, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,100 Q70,70 100,40 Q70,70 40,100 Z"
            fill="#d4af37"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 max-w-md mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Section title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <h2
            className="text-[#f2e5c6] mb-4"
            style={{
              fontSize: "32px",
              fontFamily: "Georgia, serif",
              letterSpacing: "1px",
            }}
          >
            Nikah Venue
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
        </motion.div>

        {/* Venue details */}
        <motion.div
          className="bg-[#560b18]/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-[#d4af37]/20 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <div className="flex items-start mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center mr-4">
              <MapPin className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div className="text-[#f2e5c6]">
              <h3
                className="mb-2"
                style={{
                  fontSize: "20px",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.5px",
                }}
              >
                Al-Noor Islamic Center
              </h3>
              <p
                className="opacity-90"
                style={{
                  fontSize: "15px",
                  lineHeight: "1.8",
                }}
              >
                123 Peace Boulevard
                <br />
                Madinah Gardens
                <br />
                City, State 12345
              </p>
            </div>
          </div>

          {/* Decorative line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent my-6" />

          {/* Additional info */}
          <div className="text-[#f2e5c6] opacity-80 text-center">
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.8",
              }}
            >
              Parking available on-site
              <br />
              Separate prayer areas for men and women
            </p>
          </div>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-2xl border border-[#d4af37]/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="relative w-full h-64 bg-[#560b18]/40 flex items-center justify-center">
            {/* Map placeholder - In a real app, this would be an embedded map */}
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
              title="Venue location map"
            />
            <div className="absolute inset-0 bg-[#3b010b]/10 pointer-events-none" />
          </div>
          <div className="bg-[#560b18]/60 backdrop-blur-sm p-4 text-center">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4af37] hover:text-[#f2e5c6] transition-colors"
              style={{
                fontSize: "14px",
                letterSpacing: "0.5px",
              }}
            >
              Open in Google Maps →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};