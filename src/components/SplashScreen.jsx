// FILE: src/components/SplashScreen.jsx
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f]"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2.8, times: [0, 0.89, 1], ease: 'easeInOut' }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="flex flex-col items-center gap-5"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(230,57,70,0.35)] backdrop-blur-xl">
            <svg viewBox="0 0 64 64" className="h-11 w-11 text-[#e63946]" fill="currentColor" aria-hidden="true">
              <path d="M24 8h16v16h16v16H40v16H24V40H8V24h16z" />
            </svg>
          </div>
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white">FlashAid</h1>
            <p className="mt-2 text-base text-[#a0a0b0]">First 60 Seconds. Every Second Counts.</p>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-16 w-[min(560px,80vw)] overflow-hidden rounded-full border border-white/10 bg-white/5">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-[#e63946] to-[#4cc9f0]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.6, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
