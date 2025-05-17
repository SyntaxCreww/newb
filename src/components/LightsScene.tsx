import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";

export default function LightsScene({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [lightsOn, setLightsOn] = useState(false);
  const [decorate, setDecorate] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [width, height] = useWindowSize();

  // Name configuration for ANJALI
  const nameLetters = [
    { letter: "A", image: "/images/A.png" },
    { letter: "N", image: "/images/N.png" },
    { letter: "J", image: "/images/J.png" },
    { letter: "A", image: "/images/A.png" },
    { letter: "L", image: "/images/L.png" },
    { letter: "I", image: "/images/I.png" },
  ];

  // Balloon types configuration
  const balloonImages = ["/images/ballon.png", "/images/ballon2.png"];

  useEffect(() => {
    if (decorate) {
      const timer = setTimeout(() => setShowFinalButton(true), 8000);
      return () => clearTimeout(timer);
    }
  }, [decorate]);

  const playBalloonSound = () => {
    new Audio("/images/ballonburst.mp3").play();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Light Switch Section */}
      <AnimatePresence>
        {!lightsOn && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="z-30"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLightsOn(true)}
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 rounded-2xl
                text-2xl font-bold shadow-2xl backdrop-blur-lg border-2 border-white/20
                hover:shadow-3xl transition-all duration-300"
            >
              💡 Turn On the Lights
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Decoration Section */}
      <AnimatePresence>
        {lightsOn && (
          <div className="absolute inset-0">
            {/* Ambient Light */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-pink-200/20 to-purple-300/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Decoration Trigger Button */}
            {!decorate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDecorate(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl
                    text-2xl font-bold shadow-2xl backdrop-blur-lg border-2 border-white/30
                    hover:shadow-3xl transition-all duration-300"
                >
                  Let's Decorate! 🎀
                </motion.button>
              </motion.div>
            )}

            {/* Decoration Elements */}
            {decorate && (
              <>
                {/* ANJALI Name Letters */}
                <div className="absolute top-20 w-full flex justify-center gap-4 z-30">
                  {nameLetters.map((letter, index) => (
                    <motion.img
                      key={letter.letter + index}
                      src={letter.image}
                      alt={letter.letter}
                      className="w-24 h-24 object-contain drop-shadow-2xl"
                      initial={{ y: -100, opacity: 0, rotate: -30 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      transition={{
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 120,
                        damping: 12,
                      }}
                    />
                  ))}
                </div>

                {/* Happy Birthday Image */}
                <motion.img
                  src="/images/happybirthday.png"
                  alt="Happy Birthday"
                  className="absolute top-44 w-96 z-30 mx-auto left-0 right-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 1.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                />

                {/* Floating Balloons */}
                {[...Array(12)].map((_, i) => (
                  <motion.img
                    key={`balloon-${i}`}
                    src={balloonImages[i % 2]}
                    alt="Balloon"
                    className="absolute w-28 h-28 z-20 drop-shadow-xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: "-100px",
                    }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: -height - 200,
                      opacity: [0, 1, 0],
                      x: Math.random() * 40 - 20,
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                      duration: 8 + Math.random() * 4,
                      delay: Math.random() * 1,
                      ease: "linear",
                    }}
                  />
                ))}

                {/* Decorative Table */}
                <motion.img
                  src="/images/table.png"
                  alt="Decorative Table"
                  className="absolute bottom-0 w-full max-w-3xl mx-auto z-20"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                />

                {/* Final Surprise Button */}
                {showFinalButton && (
                  <motion.div
                    className="absolute bottom-24 w-full z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-6 rounded-2xl
                        text-3xl font-bold shadow-2xl backdrop-blur-2xl border-2 border-white/30
                        hover:shadow-3xl transition-all duration-300 mx-auto"
                      onClick={() => {
                        playBalloonSound();
                        onComplete();
                      }}
                    >
                      Ready for Your Surprise! 🌟
                    </motion.button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [1, 0],
              scale: [1, 0.5],
              rotate: 360,
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
