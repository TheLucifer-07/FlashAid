// FILE: src/pages/Emergency.jsx
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { protocols } from '../data/emergencyProtocols';
import { unlockAudio } from '../utils/audioContext';
import { useInactivityTimer } from '../hooks/useInactivityTimer';
import { useWakeLock } from '../hooks/useWakeLock';
import { useAudioQueue } from '../hooks/useAudioQueue';
import DeadMansBroadcast from '../components/DeadMansBroadcast';
import StepCard from '../components/StepCard';
import FakeVolunteerMap from '../components/FakeVolunteerMap';
import EtaCountdown from '../components/EtaCountdown';
import EmergencyButton from '../components/EmergencyButton';
import InactivityGuard from '../components/InactivityGuard';
import AudioManager from '../components/AudioManager';

const INACTIVITY_TIMEOUT = 20000;
const WARNING_THRESHOLD = 15000;
const STEP_ADVANCE_DEMO_MS = 9000;
const STEP_ADVANCE_REAL_MS = 15000;
const SHOCK_MODE_MS = 2400;

const escalationLevels = [
  {
    threshold: 0,
    label: 'Stabilizing',
    accent: '#4cc9f0',
    shell: 'from-[#09111a] via-[#0a0a0f] to-[#0f1118]',
    pulse: 'rgba(76,201,240,0.16)',
    voiceLead: 'Stay calm.',
    animationSpeed: 1.8,
  },
  {
    threshold: 20000,
    label: 'Escalated',
    accent: '#f4a261',
    shell: 'from-[#1b1008] via-[#0a0a0f] to-[#170e11]',
    pulse: 'rgba(244,162,97,0.16)',
    voiceLead: 'Move faster now.',
    animationSpeed: 1.2,
  },
  {
    threshold: 40000,
    label: 'Critical',
    accent: '#e63946',
    shell: 'from-[#24090f] via-[#0a0a0f] to-[#18090f]',
    pulse: 'rgba(230,57,70,0.22)',
    voiceLead: 'This is critical.',
    animationSpeed: 0.78,
  },
];

const emergencyCards = [
  {
    key: 'cardiac',
    icon: '❤️',
    title: 'Cardiac Arrest',
    description: 'Hands-only CPR prompts, compression guidance, and urgent escalation.',
  },
  {
    key: 'choking',
    icon: '🫁',
    title: 'Choking',
    description: 'Fast back-blow and abdominal thrust guidance for airway obstruction.',
  },
  {
    key: 'injury',
    icon: '🩸',
    title: 'Injury / Bleeding',
    description: 'Direct pressure, positioning, and calm visual instruction for trauma response.',
  },
];

export default function Emergency() {
  const [phase, setPhase] = useState('idle');
  const [shockActive, setShockActive] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [broadcastActive, setBroadcastActive] = useState(false);
  const [broadcastPreparing, setBroadcastPreparing] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [secondsToBroadcast, setSecondsToBroadcast] = useState(20);
  const [lastActivityAt, setLastActivityAt] = useState(Date.now());
  const [flowMode, setFlowMode] = useState('demo');
  const [emergencyStartedAt, setEmergencyStartedAt] = useState(null);
  const [elapsedEmergencyMs, setElapsedEmergencyMs] = useState(0);
  const [systemMessageIndex, setSystemMessageIndex] = useState(0);
  const [resolutionMessage, setResolutionMessage] = useState(false);
  const shockTimeoutRef = useRef(null);
  const broadcastTimeoutRef = useRef(null);
  const { speak, stop } = useAudioQueue();

  useWakeLock(phase === 'active');

  const selectedProtocol = useMemo(
    () => (selectedType ? protocols[selectedType] : null),
    [selectedType]
  );

  const escalation = useMemo(() => {
    const matching = [...escalationLevels]
      .reverse()
      .find((level) => elapsedEmergencyMs >= level.threshold);
    return matching || escalationLevels[0];
  }, [elapsedEmergencyMs]);

  const activeReassurance = selectedProtocol
    ? selectedProtocol.reassurance[currentStep % selectedProtocol.reassurance.length]
    : '';

  const activeSystemMessage = selectedProtocol
    ? selectedProtocol.systemMessages[systemMessageIndex % selectedProtocol.systemMessages.length]
    : '';

  const activeStep = selectedProtocol?.steps[currentStep] || null;
  const autoAdvanceSeconds = flowMode === 'demo' ? 9 : 15;

  const handleBroadcast = useCallback(() => {
    setShowWarning(false);
    setSecondsToBroadcast(0);
    stop();
    setBroadcastPreparing(true);
    if (broadcastTimeoutRef.current) {
      window.clearTimeout(broadcastTimeoutRef.current);
    }
    broadcastTimeoutRef.current = window.setTimeout(() => {
      setBroadcastPreparing(false);
      setBroadcastActive(true);
      setPhase('broadcast');
    }, 1000);
  }, [stop]);

  const resetTimerBase = useInactivityTimer(INACTIVITY_TIMEOUT, handleBroadcast, phase === 'active');

  const resetInactivity = useCallback(() => {
    setLastActivityAt(Date.now());
    setShowWarning(false);
    setSecondsToBroadcast(20);
    resetTimerBase();
  }, [resetTimerBase]);

  useEffect(() => {
    if (phase !== 'active') {
      setShowWarning(false);
      setSecondsToBroadcast(20);
      return undefined;
    }

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - lastActivityAt;
      const warning = elapsed >= WARNING_THRESHOLD;
      setShowWarning(warning);
      if (warning) {
        setSecondsToBroadcast(Math.max(0, Math.ceil((INACTIVITY_TIMEOUT - elapsed) / 1000)));
      }
    }, 250);

    return () => window.clearInterval(interval);
  }, [lastActivityAt, phase]);

  useEffect(() => {
    if (phase === 'active') {
      setLastActivityAt(Date.now());
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'active' || !emergencyStartedAt) {
      setElapsedEmergencyMs(0);
      return undefined;
    }

    setElapsedEmergencyMs(Date.now() - emergencyStartedAt);
    const interval = window.setInterval(() => {
      setElapsedEmergencyMs(Date.now() - emergencyStartedAt);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [emergencyStartedAt, phase]);

  useEffect(() => {
    if (phase !== 'active' || !selectedProtocol) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setSystemMessageIndex((current) => current + 1);
    }, flowMode === 'demo' ? 3200 : 5200);

    return () => window.clearInterval(interval);
  }, [flowMode, phase, selectedProtocol]);

  useEffect(() => {
    if (phase !== 'active' || !selectedProtocol) {
      return undefined;
    }

    if (currentStep >= selectedProtocol.steps.length - 1) {
      return undefined;
    }

    const duration = flowMode === 'demo' ? STEP_ADVANCE_DEMO_MS : STEP_ADVANCE_REAL_MS;
    const timeout = window.setTimeout(() => {
      setCurrentStep((prev) => {
        const next = Math.min(prev + 1, selectedProtocol.steps.length - 1);
        if (next !== prev) {
          const encouragement = selectedProtocol.reassurance[next % selectedProtocol.reassurance.length];
          const instruction = selectedProtocol.steps[next].instruction;
          speak(`${escalation.voiceLead} ${encouragement} ${instruction}`);
          setLastActivityAt(Date.now());
          setShowWarning(false);
          setSecondsToBroadcast(20);
          resetTimerBase();
        }
        return next;
      });
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [currentStep, escalation.voiceLead, flowMode, phase, resetTimerBase, selectedProtocol, speak]);

  useEffect(() => {
    if (!resolutionMessage) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setResolutionMessage(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [resolutionMessage]);

  useEffect(() => {
    return () => {
      if (shockTimeoutRef.current) {
        window.clearTimeout(shockTimeoutRef.current);
      }
      if (broadcastTimeoutRef.current) {
        window.clearTimeout(broadcastTimeoutRef.current);
      }
      stop();
    };
  }, [stop]);

  const handleActivate = async () => {
    try {
      await unlockAudio();
    } catch (_) {}

    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
      try {
        await navigator.wakeLock.request('screen');
      } catch (_) {}
    }

    setPhase('type-select');
  };

  const handleTypeSelect = (type) => {
    const protocol = protocols[type];
    if (!protocol) {
      setPhase('type-select');
      return;
    }

    setSelectedType(type);
    setCurrentStep(0);
    setShockActive(true);
    setBroadcastActive(false);
    setBroadcastPreparing(false);
    setEmergencyStartedAt(Date.now());
    setElapsedEmergencyMs(0);
    setLastActivityAt(Date.now());
    setShowWarning(false);
    setSecondsToBroadcast(20);
    setSystemMessageIndex(0);
    stop();
    if (shockTimeoutRef.current) {
      window.clearTimeout(shockTimeoutRef.current);
    }
    shockTimeoutRef.current = window.setTimeout(() => {
      setShockActive(false);
      setPhase('active');
      speak(`You are not alone. Stay with me. ${protocol.reassurance[0]} ${protocol.steps[0].instruction}`);
    }, SHOCK_MODE_MS);
  };

  const handleCancelBroadcast = () => {
    if (broadcastTimeoutRef.current) {
      window.clearTimeout(broadcastTimeoutRef.current);
      broadcastTimeoutRef.current = null;
    }
    setBroadcastActive(false);
    setBroadcastPreparing(false);
    setPhase('active');
    setResolutionMessage(true);
    resetInactivity();
    if (selectedProtocol) {
      speak(`You acted. That matters. ${selectedProtocol.reassurance[currentStep % selectedProtocol.reassurance.length]} ${selectedProtocol.steps[currentStep].instruction}`);
    }
  };

  const handleCancelEmergency = () => {
    if (shockTimeoutRef.current) {
      window.clearTimeout(shockTimeoutRef.current);
      shockTimeoutRef.current = null;
    }
    if (broadcastTimeoutRef.current) {
      window.clearTimeout(broadcastTimeoutRef.current);
      broadcastTimeoutRef.current = null;
    }
    stop();
    setPhase('idle');
    setShockActive(false);
    setSelectedType(null);
    setCurrentStep(0);
    setBroadcastActive(false);
    setBroadcastPreparing(false);
    setShowWarning(false);
    setSecondsToBroadcast(20);
    setEmergencyStartedAt(null);
    setElapsedEmergencyMs(0);
    setSystemMessageIndex(0);
    setResolutionMessage(false);
  };

  return (
    <main
      className={`min-h-screen bg-gradient-to-br ${phase === 'active' ? escalation.shell : 'from-[#0b0d12] via-[#0b0d12] to-[#090b10]'} pt-16 text-white transition-all duration-700`}
    >
      <AudioManager />
      <AnimatePresence>
        {shockActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-[rgba(7,9,12,0.96)] px-6"
          >
            <div className="text-center">
              <motion.div
                className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,#1a1f28,#11161d)]"
                animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 0 rgba(230,57,70,0.25)', '0 0 60px rgba(230,57,70,0.7)', '0 0 0 rgba(230,57,70,0.25)'] }}
                transition={{ duration: 0.95, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-6xl">♥</span>
              </motion.div>
              <p className="mt-10 text-sm font-semibold uppercase tracking-[0.32em] text-[#bcc3cf]">Reality Shock Mode</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white lg:text-6xl">A real emergency is happening.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#b9c0cb]">
                Stay with me. Breathe once. Then move exactly as instructed.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {broadcastPreparing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#07090d] px-6"
          >
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#bcc3cf]">Signal Lost</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white lg:text-6xl">Silence detected.</h2>
              <p className="mt-5 text-lg text-[#b9c0cb]">Escalating to public emergency alarm...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <DeadMansBroadcast
        active={broadcastActive}
        onCancel={handleCancelBroadcast}
        headline={selectedProtocol?.broadcastLabel || 'EMERGENCY ALERT'}
        message={`FlashAid detected an unresponsive user. ${selectedProtocol?.escalationSummary || 'Immediate local help required.'}`}
        subMessage="CALL 112 IMMEDIATELY"
      />

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.section
            key="idle"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="section-shell flex min-h-[calc(100vh-72px)] flex-col items-center justify-center py-20"
          >
            <div className="max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#bcc3cf]">Emergency Response Mode</p>
              <h1 className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-white lg:text-7xl">
                Tap once. FlashAid takes over immediately.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#98a2b3]">
                Use this mode when a real emergency starts. You&apos;ll get voice guidance, visual steps, and automatic broadcast escalation if you stop responding.
              </p>
            </div>
            <div className="mt-10 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
              {['demo', 'real'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFlowMode(mode)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-default ${
                    flowMode === mode ? 'bg-white text-[#0a0a0f]' : 'text-[#c7c8d3]'
                  }`}
                >
                  {mode === 'demo' ? 'Demo Mode' : 'Minimal Real Mode'}
                </button>
              ))}
            </div>
            <div className="mt-16">
              <EmergencyButton onActivate={handleActivate} />
            </div>
          </motion.section>
        )}

        {phase === 'type-select' && (
          <motion.section
            key="type-select"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="section-shell min-h-[calc(100vh-72px)] py-20"
          >
            <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
              <div className="max-w-3xl space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#bcc3cf]">Step 1</p>
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">What is the emergency?</h1>
                <p className="text-lg leading-8 text-[#a0a0b0]">
                  Choose the situation so FlashAid can guide you clearly, speak calmly, and escalate only when needed.
                </p>
              </div>
              <div className="glass rounded-[28px] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7f8597]">System status</p>
                <div className="mt-5 space-y-4 text-sm text-[#d6d8e0]">
                  <p>Voice guidance ready</p>
                  <p>Emergency signal standby</p>
                  <p>Broadcast escalation available</p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 xl:grid-cols-3">
              {emergencyCards.map((card) => (
                <motion.button
                  key={card.key}
                  type="button"
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleTypeSelect(card.key)}
                  className="glass rounded-[28px] p-8 text-left transition-default hover:border-[#e63946]/18 hover:bg-white/[0.06]"
                >
                  <div className="text-5xl">{card.icon}</div>
                  <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white">{card.title}</h2>
                  <p className="mt-4 text-base leading-8 text-[#98a2b3]">{card.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {phase === 'active' && selectedProtocol && activeStep && (
          <motion.section
            key="active"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="section-shell min-h-[calc(100vh-72px)] py-12 lg:py-14"
            onClick={resetInactivity}
            onKeyDown={resetInactivity}
          >
            <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <motion.div
                  animate={{ boxShadow: [`0 0 0 ${escalation.pulse}`, `0 0 44px ${escalation.pulse}`, `0 0 0 ${escalation.pulse}`] }}
                  transition={{ duration: escalation.animationSpeed, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-[30px] border border-white/10 px-6 py-5 backdrop-blur-xl"
                  style={{ backgroundColor: selectedProtocol.color }}
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/75">Emergency Active</p>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">{selectedProtocol.name}</h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                      {escalation.label}
                    </div>
                    <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                      {flowMode === 'demo' ? 'Demo Mode' : 'Minimal Real Mode'}
                    </div>
                  </div>
                </motion.div>

                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="glass rounded-[24px] px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#a0a0b0]">System</p>
                    <p className="mt-3 text-base font-medium text-white">{activeSystemMessage}</p>
                  </div>
                  <div className="glass rounded-[24px] px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#a0a0b0]">Signal</p>
                    <p className="mt-3 text-base font-medium text-white">Emergency signal active. Nearby help is being alerted.</p>
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#4cc9f0]/15 bg-[rgba(76,201,240,0.06)] px-6 py-5 backdrop-blur-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#91e6ff]">Guidance</p>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-white lg:text-2xl">
                    You are not alone. Stay with me.
                  </p>
                  <p className="mt-2 text-base leading-7 text-[#d9eef6]">{activeReassurance || 'You’re doing the right thing. Keep going.'}</p>
                </div>

                <AnimatePresence mode="wait">
                  <StepCard
                    key={activeStep.id}
                    step={activeStep}
                    total={selectedProtocol.steps.length}
                    currentIndex={currentStep}
                    accentColor={selectedProtocol.color}
                    reassurance={activeReassurance}
                    rhythmMode={selectedType === 'cardiac' && currentStep >= 4}
                    rhythmLabel="Hands locked. Push with the rhythm."
                    escalationSpeed={escalation.animationSpeed}
                    autoAdvanceLabel={
                      currentStep < selectedProtocol.steps.length - 1
                        ? `System will advance automatically in ${autoAdvanceSeconds} seconds unless the situation changes.`
                        : 'Final guidance locked. Stay on this step and continue until help arrives.'
                    }
                  />
                </AnimatePresence>

                {resolutionMessage ? (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="rounded-[24px] border border-white/10 bg-[rgba(13,18,24,0.88)] px-6 py-5 text-lg font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl"
                  >
                    You acted. That matters.
                  </motion.div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={resetInactivity}
                    className="transition-default rounded-full border border-[#4cc9f0]/30 bg-[rgba(76,201,240,0.08)] px-6 py-4 text-base font-semibold text-[#a9ebff] hover:bg-[rgba(76,201,240,0.14)]"
                  >
                    I&apos;m Still Here
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleCancelEmergency}
                    className="transition-default rounded-full border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white hover:bg-white/10"
                  >
                    Cancel Emergency
                  </motion.button>
                </div>
              </div>

              <div className="space-y-6">
                <EtaCountdown startSeconds={240} />
                <FakeVolunteerMap />
                <div className="glass rounded-[24px] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#a0a0b0]">Autonomous Response</p>
                  <div className="mt-4 space-y-3 text-sm text-[#d9dae4]">
                    <p>Alerting nearby help...</p>
                    <p>Emergency signal active...</p>
                    <p>Context prepared for public broadcast.</p>
                    <p>User activity monitoring enabled.</p>
                  </div>
                </div>
                <InactivityGuard visible={showWarning} secondsLeft={secondsToBroadcast} />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
