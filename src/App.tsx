import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScene from "./components/LandingScene";
import LightsScene from "./components/LightsScene";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsMusicPlaying(true);
      }
    } catch (err) {
      console.error("Audio playback failed:", err);
    }
    setCurrentStep(2);
  };

  return (
    <div className="relative overflow-hidden">
      <audio
        ref={audioRef}
        src="/music/music.mp3"
        loop
        autoPlay={false}
        style={{ display: "none" }}
      />

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <LandingScene key="landing" onStart={handleStart} />
        )}

        {currentStep === 2 && (
          <LightsScene key="lights" onComplete={() => setCurrentStep(3)} />
        )}
      </AnimatePresence>
    </div>
  );
}
