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
          animate={{ opacity: lightsOn ? 0.2 : 1 }}
        />
        {/* Floor */}
        <motion.div
          className="h-2/3 w-full bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700"
          animate={{ opacity: lightsOn ? 0.6 : 0.2 }}
        />
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
                text-xl font-bold shadow-2xl backdrop-blur-lg relative overflow-hidden
                border-2 border-yellow-300/50 transition-all duration-300 hover:shadow-3xl"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="relative z-10 flex items-center gap-2">
                💡 Illuminate the Room
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-room Lighting Effects */}
      <AnimatePresence>
        {lightsOn && (
          <>
            {/* Base Room Lighting */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-yellow-200/20 to-yellow-100/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />

            {/* Central Light Beam */}
            <motion.div
              className="absolute inset-0 bg-radial-gradient(at 50% 30%, rgba(255,240,180,0.4), transparent 60%)"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            />

            {/* Floor Reflection */}
            <motion.div
              className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-yellow-200/15 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />

            {/* Light Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(120)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
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
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-1/2 bg-gradient-to-b from-yellow-300/30 to-transparent"
                  style={{
                    left: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 30 - 15}deg)`,
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    height: ["0%", "60%", "60%"],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Ambient Light Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(80)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-200/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -50],
                    opacity: [0.3, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 3,
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
                className="bg-white/15 backdrop-blur-xl text-yellow-300 px-8 py-4 rounded-xl
                  text-xl font-bold shadow-2xl border-2 border-yellow-300/40
                  hover:bg-white/25 transition-all duration-300"
                onClick={onComplete}
              >
                Enter the Celebration 🌟
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hanging Light Animation */}
      <motion.div
        className="absolute top-0 z-20 flex flex-col items-center"
        initial={{ y: -100 }}
        animate={{ y: lightsOn ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
      >
        <div className="w-0.5 h-24 bg-gray-700/80" />
        <motion.div
          className="w-14 h-14 rounded-full bg-yellow-300 relative shadow-2xl"
          animate={{
            scale: lightsOn ? [1, 1.1, 1] : 1,
            opacity: lightsOn ? 1 : 0.3,
            boxShadow: lightsOn
              ? [
                  "0 0 30px 10px rgba(255,230,150,0.4)",
                  "0 0 50px 20px rgba(255,230,150,0.5)",
                  "0 0 30px 10px rgba(255,230,150,0.4)",
                ]
              : "none",
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-radial-gradient(from at center, rgba(255,255,255,0.5), transparent 60%)" />
          <div className="absolute inset-0 bg-radial-gradient(from at 30% 30%, rgba(255,255,255,0.3), transparent 70%)" />
        </motion.div>
      </motion.div>

      {/* Subtle Ambient Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-yellow-200/10 to-transparent"
        animate={{ opacity: lightsOn ? 0.4 : 0 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
