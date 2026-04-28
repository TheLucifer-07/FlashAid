// FILE: src/hooks/useAudioQueue.js
import { useRef, useCallback } from 'react';

export function useAudioQueue() {
  const queue = useRef([]);
  const playing = useRef(false);
  const currentUtterance = useRef(null);
  const selectedVoice = useRef(null);

  const canSpeak = () =>
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof window.SpeechSynthesisUtterance !== 'undefined';

  const pickVoice = () => {
    if (!canSpeak()) {
      return null;
    }

    if (selectedVoice.current) {
      return selectedVoice.current;
    }

    try {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) {
        return null;
      }

      const preferredVoice =
        voices.find((voice) => /female|woman|zira|samantha|victoria|karen|moira/i.test(voice.name)) ||
        voices.find((voice) => /en(-|_)?(us|gb|in)/i.test(voice.lang)) ||
        voices[0];

      selectedVoice.current = preferredVoice || null;
      return selectedVoice.current;
    } catch (_) {
      return null;
    }
  };

  const cancelSpeech = () => {
    if (!canSpeak()) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
    } catch (_) {}
  };

  const playNext = useCallback(() => {
    if (!queue.current.length) {
      playing.current = false;
      currentUtterance.current = null;
      return;
    }

    if (!canSpeak()) {
      queue.current = [];
      playing.current = false;
      currentUtterance.current = null;
      return;
    }

    playing.current = true;
    const text = queue.current.shift();
    const utterance = new window.SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    utterance.onend = () => {
      currentUtterance.current = null;
      playNext();
    };
    utterance.onerror = () => {
      currentUtterance.current = null;
      playing.current = false;
      queue.current = [];
    };
    currentUtterance.current = utterance;

    try {
      if (!selectedVoice.current && 'onvoiceschanged' in window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          pickVoice();
        };
      }
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (_) {
      currentUtterance.current = null;
      playing.current = false;
      queue.current = [];
    }
  }, []);

  const enqueue = useCallback(
    (text) => {
      if (!text || typeof text !== 'string') {
        return;
      }
      queue.current.push(text);
      if (!playing.current) playNext();
    },
    [playNext]
  );

  const speak = useCallback(
    (text) => {
      queue.current = [];
      playing.current = false;
      currentUtterance.current = null;
      cancelSpeech();
      enqueue(text);
    },
    [enqueue]
  );

  const stop = useCallback(() => {
    queue.current = [];
    playing.current = false;
    currentUtterance.current = null;
    cancelSpeech();
  }, []);

  return { speak, enqueue, stop };
}
