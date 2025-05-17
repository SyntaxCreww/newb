import { motion } from "framer-motion";

export default function LandingScene({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-600 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Floating Hearts Background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-100, window.innerHeight],
            opacity: [0, 1, 0],
            x: Math.random() * 100 - 50,
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          💖
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 z-10"
      >
        <motion.h1
          className="text-6xl font-bold text-white mb-4 drop-shadow-2xl relative"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Hello My Love! 💖
          <motion.div
            className="absolute -inset-4 bg-pink-500 blur-3xl opacity-50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.h1>

        <motion.p
          className="text-2xl text-pink-100 mb-8 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Ready for your birthday surprise?
          <motion.span
            className="ml-2 inline-block"
            animate={{ rotate: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🎁
          </motion.span>
        </motion.p>

        <motion.button
          whileHover={{
            scale: 1.05,
            background: "rgba(255,255,255,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/20 backdrop-blur-lg text-pink-100 px-8 py-4 rounded-2xl
            text-2xl font-bold hover:bg-white/30 transition-all shadow-2xl
            border-2 border-white/30 relative overflow-hidden"
          onClick={onStart}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: [-200, 200] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Let's Begin! 🎉
        </motion.button>
      </motion.div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-pink-400/20 to-transparent pointer-events-none" />
    </div>
  );
}
