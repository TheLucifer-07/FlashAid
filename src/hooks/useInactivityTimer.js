// FILE: src/hooks/useInactivityTimer.js
import { useEffect, useRef, useCallback } from 'react';

export function useInactivityTimer(timeoutMs, onTimeout, active) {
  const timerRef = useRef(null);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (active) {
      timerRef.current = setTimeout(onTimeout, timeoutMs);
    }
  }, [timeoutMs, onTimeout, active]);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'click', 'scroll'];
    events.forEach((eventName) => document.addEventListener(eventName, reset));
    reset();
    return () => {
      events.forEach((eventName) => document.removeEventListener(eventName, reset));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, reset]);

  return reset;
}
