// FILE: src/components/StepCard.jsx
import { motion } from 'framer-motion';

export default function StepCard({
  step,
  total,
  currentIndex,
  accentColor = '#e63946',
  reassurance,
  autoAdvanceLabel,
  rhythmMode = false,
  rhythmLabel,
  escalationSpeed = 1.5,
}) {
  return (
    <motion.div
      key={step.id}
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -12, opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="inline-flex rounded-full px-4 py-2 text-sm font-semibold tracking-[0.12em]"
          style={{ backgroundColor: `${accentColor}24`, color: accentColor }}
        >
          Step {currentIndex + 1} of {total}
        </div>
        <div className="text-xs font-medium uppercase tracking-[0.24em] text-[#7f8597]">Guided response</div>
      </div>
      <div className="mt-8 space-y-4">
        <h3 className="text-3xl font-bold tracking-tight text-white lg:text-[36px]">{step.title}</h3>
        <p className="max-w-4xl text-[26px] font-semibold leading-[1.45] tracking-[-0.02em] text-white lg:text-[32px]">
          {step.instruction}
        </p>
      </div>
      {rhythmMode ? (
        <div className="mt-8 rounded-[28px] border border-white/10 bg-[#0f1018] px-6 py-8">
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="flex h-36 w-36 items-center justify-center rounded-full text-center text-sm font-bold uppercase tracking-[0.2em] text-white"
              animate={{ scale: [1, 1.14, 1] }}
              transition={{ duration: escalationSpeed, repeat: Infinity, ease: 'easeInOut' }}
              style={{ backgroundColor: accentColor, boxShadow: `0 0 40px ${accentColor}66` }}
            >
              PUSH
            </motion.div>
            <p className="mt-5 text-sm font-medium tracking-[0.16em] text-[#d6d8e0]">
              {rhythmLabel || 'Keep the rhythm steady'}
            </p>
          </div>
        </div>
      ) : null}
      {reassurance ? (
        <div className="mt-8 rounded-[24px] border border-[#4cc9f0]/15 bg-[rgba(76,201,240,0.08)] px-5 py-4 text-base font-medium leading-7 text-[#e6f7ff]">
          {reassurance}
        </div>
      ) : null}
      <div className="mt-8 grid grid-cols-6 gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={`segment-${index + 1}`}
            className="h-2 rounded-full"
            style={{ backgroundColor: index <= currentIndex ? accentColor : 'rgba(255,255,255,0.1)' }}
          />
        ))}
      </div>
      {autoAdvanceLabel ? (
        <div className="mt-5 text-sm font-medium tracking-[0.01em] text-[#a0a0b0]">{autoAdvanceLabel}</div>
      ) : null}
    </motion.div>
  );
}
