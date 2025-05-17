import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function LandingScene({ onStart }: { onStart: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
        onStart();
      }
    } catch (err) {
      console.error("Audio playback failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-600 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      <audio ref={audioRef} src="/music/music.mp3" loop controls />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 z-10"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Hello My Love! 💖
        </h1>

        <motion.p
          className="text-xl text-pink-100 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Ready for your birthday surprise?
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/20 backdrop-blur-lg text-pink-100 px-8 py-3 rounded-full
            text-lg font-semibold hover:bg-white/30 transition-all shadow-xl"
          onClick={handlePlay}
        >
          {isPlaying ? (
            <span className="flex items-center gap-2">
              <span className="animate-pulse">🎶 Playing...</span>
            </span>
          ) : (
            "Yes, Let's Begin! 🎉"
          )}
        </motion.button>
      </motion.div>

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  );
}
