import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";

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
            <div className="text-[#f2e5c6]">
              <h3
                className="mb-2"
                style={{
                  fontSize: "20px",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.5px",
                }}
              >
                Glass House Beachfront
              </h3>
              <p
                className="opacity-90"
                style={{
                  fontSize: "15px",
                  lineHeight: "1.8",
                }}
              >
                10 Changi Coast Walk,
                <br />
                National Service Resort & Country Club,
                <br />
                Singapore 499739
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
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d31909.82991981746!2d103.96835074999997!3d1.3390617000000056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x31da23797fa342ef%3A0x13b8593768d2913e!2sGlass%20House%20Beachfront%2C%2010%20Changi%20Coast%20Walk%2C%20National%20Service%20Resort%20%26%20Country%20Club%2C%20Singapore%20499739!3m2!1d1.318536!2d103.97401359999999!5e0!3m2!1sen!2ssg!4v1770222823178!5m2!1sen!2ssg" 
              width="600" 
              height="450" 
              loading="lazy">
            </iframe>
            <div className="absolute inset-0 bg-[#3b010b]/10 pointer-events-none" />
          </div>
          <div className="bg-[#560b18]/60 backdrop-blur-sm p-4 text-center">
            <a
              href="https://share.google/byNWJn36rWgWxOdxV"
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