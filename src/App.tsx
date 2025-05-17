import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingScene from "./components/LandingScene";
import LightsScene from "./components/LightsScene";

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [musicAllowed, setMusicAllowed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMusicChoice = (playMusic: boolean) => {
    if (playMusic && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Failed to autoplay music:", err);
      });
      setMusicAllowed(true);
    }
    setCurrentStep(1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <audio ref={audioRef} src="/music/music.mp3" loop hidden />

      {/* Music Modal */}
      <AnimatePresence>
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 shadow-2xl text-center space-y-4 max-w-sm relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 border-2 border-white/20 rounded-2xl"
                animate={{
                  borderColor: [
                    "rgba(255,255,255,0.2)",
                    "rgba(255,255,255,0.5)",
                    "rgba(255,255,255,0.2)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.h2
                className="text-3xl font-bold text-white mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Hey Love! 💖
              </motion.h2>

              <p className="text-white/90 text-lg mb-6">
                Shall we play a song while you explore your surprise? 🎵
              </p>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-xl
                    font-semibold hover:bg-white/30 transition-all"
                  onClick={() => handleMusicChoice(true)}
                >
                  Yes, play music 🎶
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-black/20 backdrop-blur-lg text-white/80 rounded-xl
                    font-semibold hover:bg-black/30 transition-all"
                  onClick={() => handleMusicChoice(false)}
                >
                  Continue quietly 🤫
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenes */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <LandingScene key="landing" onStart={() => setCurrentStep(2)} />
        )}
        {currentStep === 2 && (
          <LightsScene key="lights" onComplete={() => setCurrentStep(3)} />
        )}
      </AnimatePresence>
    </div>
  );
}
