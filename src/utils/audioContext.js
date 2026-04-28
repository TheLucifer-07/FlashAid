// FILE: src/utils/audioContext.js
let ctx = null;

export function getAudioContext() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!ctx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return null;
    }
    ctx = new AudioContextClass();
  }
  return ctx;
}

export function unlockAudio() {
  const context = getAudioContext();
  if (!context) {
    return Promise.resolve(false);
  }

  try {
    return context.resume().then(() => true).catch(() => false);
  } catch (_) {
    return Promise.resolve(false);
  }
}

export function playAlarmSound() {
  const context = getAudioContext();
  if (!context) {
    return () => {};
  }

  let active = true;
  let timeoutId = null;

  function beep() {
    if (!active) {
      return;
    }

    let oscillator;
    let gainNode;

    try {
      oscillator = context.createOscillator();
      gainNode = context.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(880, context.currentTime);
      oscillator.frequency.setValueAtTime(440, context.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.8, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.6);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.6);
    } catch (_) {
      active = false;
      return;
    }

    timeoutId = window.setTimeout(beep, 700);
  }

  beep();

  return () => {
    active = false;
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  };
}
