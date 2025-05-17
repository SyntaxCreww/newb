import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LandingScene from "./components/LandingScene";
import LightsScene from "./components/LightsScene";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="relative overflow-hidden">
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
