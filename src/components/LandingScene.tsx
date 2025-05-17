import { motion } from "framer-motion";

export default function LandingScene({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-600 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
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
          onClick={onStart}
        >
          Let's Begin! 🎉
        </motion.button>
      </motion.div>

      {/* Optional animated background */}
    </div>
  );
}
