import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

export default function LightsScene({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [showButton, setShowButton] = useState(false);
  const [width, height] = useWindowSize();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Confetti */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={isAnimating ? 200 : 0}
        recycle={false}
        colors={["#FF69B4", "#FFD700", "#FF1493", "#FFF"]}
      />

      <AnimatePresence>
        {/* Main content */}
        <motion.div
          key="lights-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8 z-10"
        >
          {/* First text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl text-pink-200 font-semibold"
          >
            Turning on the lights... ✨
          </motion.div>

          {/* Light animation */}
          <motion.div
            className="absolute inset-0 bg-yellow-100 opacity-0"
            animate={{
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Second text */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
            className="text-4xl text-white font-bold mt-8"
          >
            Let's decorate! 🎀
          </motion.div>

          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.img
                key={i}
                src="/images/sparkle.png"
                alt="sparkle"
                className="absolute w-4 h-4"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40],
                  x: [0, (Math.random() - 0.5) * 50],
                  rotate: [0, 360],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          {/* Continue button */}
          {showButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-lg text-pink-100 px-8 py-3 rounded-full
                text-lg font-semibold hover:bg-white/30 transition-all shadow-xl mt-8"
              onClick={() => {
                setIsAnimating(false);
                onComplete();
              }}
            >
              Make it Sparkle! 🌟
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
