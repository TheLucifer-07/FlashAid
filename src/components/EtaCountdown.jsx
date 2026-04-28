// FILE: src/components/EtaCountdown.jsx
import { useEffect, useMemo, useState } from 'react';

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function EtaCountdown({ startSeconds = 240 }) {
  const [remaining, setRemaining] = useState(startSeconds);

  useEffect(() => {
    setRemaining(startSeconds);
  }, [startSeconds]);

  useEffect(() => {
    if (remaining <= 0) return undefined;
    const interval = window.setInterval(() => {
      setRemaining((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [remaining]);

  const progressWidth = useMemo(() => `${(remaining / startSeconds) * 100}%`, [remaining, startSeconds]);

  return (
    <div className="glass rounded-[28px] p-6">
      <h3 className="text-lg font-semibold tracking-[0.01em] text-white">Emergency Services ETA</h3>
      <div className="mt-6 text-5xl font-bold tracking-[-0.03em] text-white">
        {remaining > 0 ? formatTime(remaining) : 'Arriving Now'}
      </div>
      <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#e9646f] to-[#e63946] transition-[width] duration-1000"
          style={{ width: progressWidth }}
        />
      </div>
      <p className="mt-5 text-sm text-[#98a2b3]">112 has been notified</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-[#4cc9f0]" />
        <span className="text-sm font-medium text-[#dce8f3]">Signal active</span>
      </div>
    </div>
  );
}
