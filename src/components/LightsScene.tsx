import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useWindowSize } from "@react-hook/window-size";

export default function LightsScene({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [lightsOn, setLightsOn] = useState(false);
  const [width] = useWindowSize();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Hanging Light Image */}
      <motion.img
        src="/hanginglight.png"
        alt="hanging light"
        className="absolute top-0 w-32 z-20"
        style={{ filter: lightsOn ? "drop-shadow(0 0 20px yellow)" : "none" }}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: lightsOn ? 0 : -100,
          opacity: 1,
          rotate: lightsOn ? [0, -5, 5, 0] : 0,
        }}
        transition={{
          duration: 1,
          rotate: { duration: 2, repeat: Infinity, delay: 1 },
        }}
      />

      {/* Initial Ambient Light */}
      <motion.div
        className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-yellow-200/20 to-transparent"
        animate={{ opacity: lightsOn ? 0 : [0.1, 0.3, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <AnimatePresence>
        {!lightsOn && showButton && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="z-30"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl
                text-xl font-bold shadow-2xl backdrop-blur-lg relative overflow-hidden"
              onClick={() => setLightsOn(true)}
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Click to Turn On Lights 💡
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light Beam Animation */}
      <AnimatePresence>
        {lightsOn && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-yellow-200/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />

            <motion.div
              className="absolute inset-0 bg-radial-gradient from-yellow-200/50 via-transparent to-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 2 }}
              transition={{ duration: 1.5 }}
            />

            {/* Light Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 30}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [1, 0],
                    scale: [1, 2],
                    y: [0, 100],
                  }}
                  transition={{
                    duration: 1 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-lg text-yellow-400 px-8 py-3 rounded-full
                  text-lg font-semibold hover:bg-white/30 transition-all shadow-xl
                  border-2 border-yellow-400/30"
                onClick={onComplete}
              >
                Continue to Celebration 🎉
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-yellow-200/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
