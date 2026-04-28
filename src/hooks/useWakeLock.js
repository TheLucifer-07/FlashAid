// FILE: src/hooks/useWakeLock.js
import { useEffect, useRef } from 'react';

export function useWakeLock(active) {
  const lockRef = useRef(null);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !active || !('wakeLock' in navigator)) {
      return undefined;
    }

    let released = false;

    navigator.wakeLock
      .request('screen')
      .then((lock) => {
        if (released) {
          lock.release().catch(() => {});
          return;
        }
        lockRef.current = lock;
      })
      .catch(() => {});

    return () => {
      released = true;
      if (lockRef.current) {
        lockRef.current.release().catch(() => {});
        lockRef.current = null;
      }
    };
  }, [active]);
}
