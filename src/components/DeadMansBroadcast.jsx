// FILE: src/components/DeadMansBroadcast.jsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { playAlarmSound } from '../utils/audioContext';

export default function DeadMansBroadcast({ active, onCancel, headline = 'EMERGENCY ALERT', message, subMessage }) {
  const stopRef = useRef(null);

  useEffect(() => {
    if (active) {
      try {
        stopRef.current = playAlarmSound();
      } catch (_) {
        stopRef.current = null;
      }
    }

    return () => {
      if (stopRef.current) {
        stopRef.current();
        stopRef.current = null;
      }
    };
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
      animate={{ backgroundColor: ['#e63946', '#0a0a0f', '#e63946'] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
    >
      <div className="max-w-5xl text-center">
        <div className="text-[80px]">⚠️</div>
        <h2 className="mt-3 text-5xl font-extrabold tracking-[-0.03em] text-white lg:text-[72px]">{headline}</h2>
        <p className="mx-auto mt-6 max-w-4xl text-2xl leading-relaxed text-white lg:text-[28px]">
          {message || 'FlashAid has detected an unresponsive user at this location.'}
        </p>
        <div className="mx-auto mt-7 max-w-2xl rounded-[24px] border border-white/15 bg-white/10 px-5 py-4 text-base font-semibold tracking-[0.02em] text-white">
          Nearby people are being alerted
        </div>
        <p className="mt-6 text-3xl font-bold tracking-[0.04em] text-[#ffd166] lg:text-[34px]">
          {subMessage || 'CALL 112 IMMEDIATELY'}
        </p>
        <button
          type="button"
          onClick={onCancel}
          className="mt-12 rounded-full bg-white px-8 py-4 text-base font-bold text-[#0a0a0f] transition-default hover:scale-[1.03] active:scale-[0.98]"
        >
          I AM OKAY — STOP ALARM
        </button>
      </div>
    </motion.div>
  );
}
