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
  const [width, height] = useWindowSize();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Modern Room Structure */}
      <div className="absolute inset-0">
        <motion.div
          className="h-full w-full bg-gradient-to-b from-gray-900/80 to-black"
          animate={{ opacity: lightsOn ? 0.4 : 1 }}
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
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-8 py-4 rounded-xl
                text-xl font-bold shadow-2xl backdrop-blur-lg relative overflow-hidden
                border-2 border-white/20 transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30"
                animate={{ x: [-200, 200] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              💡 Turn On Lights
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lighting Effects */}
      <AnimatePresence>
        {lightsOn && (
          <>
            {/* Modern Ambient Light */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-blue-200/20 to-purple-300/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />

            {/* Holographic Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(80)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -height],
                    x: [0, (Math.random() - 0.5) * 100],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>

            {/* Decoration Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-xl text-purple-300 px-8 py-4 rounded-xl
                  text-xl font-bold shadow-2xl border-2 border-white/30
                  hover:bg-white/20 transition-all duration-300"
                onClick={() => setDecorate(true)}
              >
                Let's Decorate the Room 🎀
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Decoration Elements */}
      <AnimatePresence>
        {decorate && (
          <>
            {/* Floating Balloons */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: "-50px",
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: -height - 100,
                  opacity: [0, 1, 0],
                  x: Math.random() * 40 - 20,
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  delay: Math.random() * 0.5,
                  ease: "linear",
                }}
              >
                🎈
              </motion.div>
            ))}

            {/* Glitter Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -50],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 z-30"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl
                  text-xl font-bold shadow-2xl backdrop-blur-lg border-2 border-white/30
                  hover:shadow-3xl transition-all duration-300"
                onClick={onComplete}
              >
                Ready for the Surprise! 🎉
              </motion.button>
            </motion.div>

            {/* Modern Chandelier Effect */}
            <motion.div
              className="absolute top-0 w-full flex justify-center"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: "spring" }}
            >
              <div className="w-48 h-48 bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-3xl rounded-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Shadows */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"
        animate={{ opacity: decorate ? 0.2 : 0.4 }}
      />
    </div>
  );
}
