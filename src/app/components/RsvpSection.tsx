import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Check, Send } from "lucide-react";
import backgroundImage from "figma:asset/d408225078b16f1b9a92b2142a16ad00cc8254f2.png";

export const RsvpSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [attending, setAttending] = useState<
    "yes" | "no" | null
  >(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section
      id="rsvp-section"
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
      <div className="absolute inset-0 z-0 bg-[#2a060699] scale-[1.5] origin-center" />

      {/* Subtle floating background lily */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-40 h-40 opacity-5 -translate-x-1/2"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1730201623449-20af3b14a99a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGxpbHklMjBmbG93ZXIlMjBpc29sYXRlZHxlbnwxfHx8fDE3NzAyMTE5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "blur(2px)" }}
        />
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
            RSVP
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-4" />
          <p
            className="text-[#f2e5c6] opacity-80"
            style={{
              fontSize: "14px",
              letterSpacing: "0.5px",
            }}
          >
            Kindly respond by March 1st, 2026
          </p>
        </motion.div>

        {/* RSVP Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="backdrop-blur-sm rounded-2xl p-8 border border-[#d4af37]/20 shadow-xl bg-[#560b1899]"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1 }}
        >
          {/* Attendance question */}
          <div className="mb-8">
            <label
              className="block text-[#f2e5c6] mb-4"
              style={{
                fontSize: "16px",
                letterSpacing: "0.5px",
              }}
            >
              Will you be attending the Nikah?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setAttending("yes")}
                className={`flex-1 py-3 px-6 rounded-xl transition-all ${
                  attending === "yes"
                    ? "bg-[#d4af37] text-[#3b010b] shadow-lg"
                    : "bg-[#3b010b]/40 text-[#f2e5c6] border border-[#d4af37]/30 hover:border-[#d4af37]/60"
                }`}
                style={{
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                }}
              >
                {attending === "yes" && (
                  <Check className="inline-block w-4 h-4 mr-2" />
                )}
                Yes
              </button>
              <button
                type="button"
                onClick={() => setAttending("no")}
                className={`flex-1 py-3 px-6 rounded-xl transition-all ${
                  attending === "no"
                    ? "bg-[#d4af37] text-[#3b010b] shadow-lg"
                    : "bg-[#3b010b]/40 text-[#f2e5c6] border border-[#d4af37]/30 hover:border-[#d4af37]/60"
                }`}
                style={{
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                }}
              >
                {attending === "no" && (
                  <Check className="inline-block w-4 h-4 mr-2" />
                )}
                No
              </button>
            </div>
          </div>

          {/* Guest count (only if attending) */}
          {attending === "yes" && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <label
                htmlFor="guest-count"
                className="block text-[#f2e5c6] mb-4"
                style={{
                  fontSize: "16px",
                  letterSpacing: "0.5px",
                }}
              >
                Number of guests attending
              </label>
              <select
                id="guest-count"
                value={guestCount}
                onChange={(e) =>
                  setGuestCount(parseInt(e.target.value))
                }
                className="w-full py-3 px-4 rounded-xl bg-[#3b010b]/60 text-[#f2e5c6] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none transition-all"
                style={{
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </motion.div>
          )}

          {/* Optional notes */}
          <div className="mb-8">
            <label
              htmlFor="notes"
              className="block text-[#f2e5c6] mb-4"
              style={{
                fontSize: "16px",
                letterSpacing: "0.5px",
              }}
            >
              Additional notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Dietary restrictions, special requests, etc."
              rows={4}
              className="w-full py-3 px-4 rounded-xl bg-[#3b010b]/60 text-[#f2e5c6] border border-[#d4af37]/30 focus:border-[#d4af37] focus:outline-none transition-all placeholder-[#f2e5c6]/40 resize-none"
              style={{
                fontSize: "15px",
                letterSpacing: "0.5px",
                lineHeight: "1.6",
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={attending === null || submitted}
            className={`w-full py-4 px-6 rounded-xl transition-all flex items-center justify-center ${
              attending === null || submitted
                ? "bg-[#3b010b]/40 text-[#f2e5c6]/40 cursor-not-allowed"
                : "bg-[#d4af37] text-[#3b010b] hover:bg-[#f2e5c6] hover:shadow-lg"
            }`}
            style={{
              fontSize: "16px",
              letterSpacing: "1px",
              fontWeight: "600",
            }}
          >
            {submitted ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                RSVP Submitted
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit RSVP
              </>
            )}
          </button>

          {submitted && (
            <motion.p
              className="text-center text-[#d4af37] mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: "14px",
                letterSpacing: "0.5px",
              }}
            >
              Thank you! We look forward to celebrating with
              you.
            </motion.p>
          )}
        </motion.form>

        {/* Closing message */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />
          <p
            className="text-[#f2e5c6] opacity-70 italic"
            style={{
              fontSize: "15px",
              fontFamily: "Georgia, serif",
              lineHeight: "1.8",
            }}
          >
            May Allah bless this union
            <br />
            with love, peace, and endless barakah
          </p>
          <p
            className="text-[#d4af37] mt-6"
            style={{
              fontSize: "12px",
              letterSpacing: "2px",
            }}
          >
            ✦ ✦ ✦
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};