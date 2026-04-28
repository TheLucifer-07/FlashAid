// FILE: src/components/FakeVolunteerMap.jsx
import { motion } from 'framer-motion';

export default function FakeVolunteerMap() {
  return (
    <div className="glass rounded-[28px] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-[0.01em] text-white">Nearest Responders</h3>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#98a2b3]">Live local mesh</span>
      </div>

      <div className="relative h-[280px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0f1218]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {Array.from({ length: 11 }).map((_, index) => (
            <g key={`grid-${index}`}>
              <line x1={index * 10} y1="0" x2={index * 10} y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.25" />
              <line x1="0" y1={index * 10} x2="100" y2={index * 10} stroke="rgba(255,255,255,0.08)" strokeWidth="0.25" />
            </g>
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
          <motion.div
            className="absolute h-8 w-8 rounded-full border border-[#e63946]/50"
            animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
          <div className="relative h-4 w-4 rounded-full bg-[#e63946] shadow-[0_0_18px_rgba(230,57,70,0.9)]" />
          <span className="rounded-full border border-[#e63946]/10 bg-[#e63946]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ffd6db]">
            You Are Here
          </span>
        </div>

        <motion.div
          className="absolute left-[16%] top-[20%]"
          animate={{ x: 34, y: 24 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <div className="h-3 w-3 rounded-full bg-[#4cc9f0] shadow-[0_0_18px_rgba(76,201,240,0.8)]" />
          <div className="mt-2 rounded-xl border border-white/10 bg-[rgba(13,18,27,0.9)] px-3 py-2 text-xs text-white">
            Priya R. — CPR Certified
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[16%] right-[18%]"
          animate={{ x: -28, y: -18 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <div className="h-3 w-3 rounded-full bg-[#4cc9f0] shadow-[0_0_18px_rgba(76,201,240,0.8)]" />
          <div className="mt-2 rounded-xl border border-white/10 bg-[rgba(13,18,27,0.9)] px-3 py-2 text-xs text-white">
            Ravi M. — First Aid
          </div>
        </motion.div>
      </div>

      <p className="mt-5 text-sm text-[#98a2b3]">2 volunteers responding · Avg ETA 3.4 min</p>
    </div>
  );
}
