import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useWindowSize } from "@react-hook/window-size";

export default function LightsScene({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [lightsOn, setLightsOn] = useState(false);
  const [width, height] = useWindowSize();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Room Structure */}
      <div className="absolute inset-0">
        {/* Ceiling Shadow */}
        <motion.div
          className="h-1/3 w-full bg-black"
          animate={{ opacity: lightsOn ? 0.3 : 1 }}
        />
        {/* Floor */}
        <div className="h-2/3 w-full bg-gradient-to-t from-gray-900 to-black" />
      </div>

      {/* Light Switch Button */}
      <AnimatePresence>
        {showButton && !lightsOn && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="z-30"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLightsOn(true)}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-8 py-4 rounded-xl
                text-xl font-bold shadow-lg backdrop-blur-md relative overflow-hidden
                border-2 border-yellow-300/50 transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="relative z-10 flex items-center gap-2">
                💡 Turn On Lights
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lighting Effects */}
      <AnimatePresence>
        {lightsOn && (
          <>
            {/* Main Light Beam */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-yellow-200/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Radial Light Spread */}
            <motion.div
              className="absolute inset-0 bg-radial-gradient(from 50% 0%, rgba(255,240,180,0.4), transparent 70%)"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            />

            {/* Light Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(80)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 30}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [1, 0],
                    scale: [1, 2],
                    y: [0, height * 0.7],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Light Rays */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-1/3 bg-gradient-to-b from-yellow-300/30 to-transparent"
                  style={{
                    left: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 30 - 15}deg)`,
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    height: ["0%", "40%", "40%"],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-lg text-yellow-300 px-8 py-4 rounded-xl
                  text-lg font-bold shadow-lg border-2 border-yellow-300/30
                  hover:bg-white/20 transition-all duration-300"
                onClick={onComplete}
              >
                Continue to Celebration 🌟
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Ambient Light Transition */}
      <motion.div
        className="absolute inset-0 bg-yellow-100/10"
        animate={{ opacity: lightsOn ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Hanging Light Animation */}
      <motion.div
        className="absolute top-0 z-20 flex flex-col items-center"
        initial={{ y: -100 }}
        animate={{ y: lightsOn ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
      >
        <div className="w-0.5 h-24 bg-gray-700" />
        <motion.div
          className="w-12 h-12 rounded-full bg-yellow-300 relative shadow-xl"
          animate={{
            scale: lightsOn ? [1, 1.1, 1] : 1,
            opacity: lightsOn ? 1 : 0.3,
            boxShadow: lightsOn
              ? [
                  "0 0 20px 5px rgba(255,230,150,0.3)",
                  "0 0 30px 10px rgba(255,230,150,0.4)",
                  "0 0 20px 5px rgba(255,230,150,0.3)",
                ]
              : "none",
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-radial-gradient from-yellow-300/80 to-transparent rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
