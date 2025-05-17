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
      {/* Hidden audio always mounted */}
      <audio ref={audioRef} src="/music/music.mp3" loop hidden />

      {/* Music Modal */}
      {currentStep === 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-8 shadow-2xl text-center space-y-4 max-w-sm"
          >
            <h2 className="text-2xl font-bold text-pink-600">Hey Love! 💖</h2>
            <p className="text-gray-700 text-lg">
              Shall we play a song while you explore your surprise?
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => handleMusicChoice(true)}
                className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
              >
                Yes, play it 🎶
              </button>
              <button
                onClick={() => handleMusicChoice(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        </div>
      )}

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
