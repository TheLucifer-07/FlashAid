// FILE: src/components/EmergencyButton.jsx
import { motion } from 'framer-motion';

export default function EmergencyButton({ onActivate }) {
  return (
    <div className="relative flex items-center justify-center">
      <span className="absolute h-[280px] w-[280px] rounded-full border border-[#e63946]/50 animate-pulse-ring" />
      <span className="absolute h-[240px] w-[240px] rounded-full border border-[#e63946]/30 animate-pulse-ring [animation-delay:250ms]" />
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={onActivate}
        className="red-glow transition-default relative flex h-[200px] w-[200px] items-center justify-center rounded-full border border-white/10 bg-[#e63946] px-10 text-center text-xl font-semibold tracking-[0.12em] text-white"
      >
        TAP TO ACTIVATE
      </motion.button>
    </div>
  );
}
