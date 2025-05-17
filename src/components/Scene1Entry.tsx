// Scene1Entry.tsx
import { motion } from "framer-motion";
import { useState } from "react";

export default function Scene1Entry({ onYes }: { onYes: () => void }) {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-pink-200 mb-8"
      >
        Hey Anjali, can I play a little something for you?
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onAnimationComplete={() => setShowButtons(true)}
        className="flex gap-4"
      >
        {showButtons && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-pink-500 text-white px-6 py-3 rounded-full text-xl"
              onClick={onYes}
            >
              Yes, play it
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-500 text-white px-6 py-3 rounded-full text-xl"
            >
              Maybe later
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}
