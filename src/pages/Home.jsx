// FILE: src/pages/Home.jsx
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const fadeUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const howItWorks = [
  {
    title: 'One Tap',
    icon: '☝️',
    description: 'Press the emergency button. FlashAid takes immediate control.',
  },
  {
    title: 'Select Type',
    icon: '≡',
    description: 'Choose Cardiac, Choking, or Injury. System loads your protocol instantly.',
  },
  {
    title: 'Follow Commands',
    icon: '〰️',
    description: 'Voice and visual instructions guide you step by step.',
  },
  {
    title: 'Auto-Alert',
    icon: '🔔',
    description: 'If you go silent, FlashAid broadcasts an emergency alarm automatically.',
  },
];

const emergencyTypes = [
  {
    title: 'Cardiac Arrest',
    icon: '♥',
    accent: '#e63946',
    bullets: ['Immediate CPR guidance', 'Hands-only compression pacing', 'Escalates if user becomes unresponsive'],
  },
  {
    title: 'Choking',
    icon: '◔',
    accent: '#f4a261',
    bullets: ['Back-blow and thrust sequence', 'Fast visual confirmation prompts', 'Transitions to CPR guidance if needed'],
  },
  {
    title: 'Injury / Bleeding',
    icon: '✚',
    accent: '#e9c46a',
    bullets: ['Direct pressure instructions', 'Positioning and elevation help', 'Keeps the helper focused while waiting'],
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="overflow-hidden pt-16">
      <section className="section-shell grid min-h-screen items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div {...fadeUp} className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium tracking-[0.12em] text-[#d9dce3]">
            ⚡ First 60 Seconds System
          </div>
          <h1 className="mt-10 text-5xl font-semibold leading-[0.94] tracking-[-0.04em] text-white lg:text-[76px]">
            Don&apos;t Wait For Help.
            <br />
            Start Helping Now.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#98a2b3]">
            FlashAid takes control the moment emergency strikes. Voice guidance. Automatic alerts. Zero delay.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/emergency"
              className="red-glow transition-default rounded-full bg-[linear-gradient(135deg,#e63946,#c92f3e)] px-7 py-4 text-center text-base font-semibold text-white hover:scale-[1.02]"
            >
              Start Emergency
            </Link>
            <button
              type="button"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="transition-default rounded-full border border-white/10 bg-white/[0.04] px-7 py-4 text-base font-medium text-white hover:border-white/20 hover:bg-white/[0.07]"
            >
              See How It Works
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -10 }}
          animate={{ y: [ -10, 10, -10 ] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative h-[700px] w-[375px] rounded-[44px] border border-white/10 bg-[linear-gradient(180deg,#151922,#0c1016)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
            <div className="h-full rounded-[34px] border border-white/10 bg-gradient-to-b from-[#141921] to-[#0c1118] p-5">
              <div className="rounded-[18px] bg-[linear-gradient(135deg,#e63946,#c92f3e)] px-4 py-3 text-center text-sm font-semibold tracking-[0.24em] text-white">
                EMERGENCY ACTIVE
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#98a2b3]">Dispatch Clock</p>
                  <p className="mt-2 text-5xl font-semibold tracking-[-0.03em] text-white">00:47</p>
                </div>
                <div className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-right">
                  <p className="text-xs text-[#98a2b3]">Status</p>
                  <p className="mt-1 text-sm font-medium text-[#dce8f3]">Voice Guidance Active</p>
                </div>
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <div className="inline-flex rounded-full bg-[#e63946]/12 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-[#ffd6db]">
                  Step 2 of 6
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">Call for Help</h3>
                <p className="mt-3 text-base leading-7 text-[#c8ced8]">
                  Tell someone nearby to call 112 immediately while you stay with the patient.
                </p>
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-[#101520] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Nearby volunteer response</p>
                  <span className="text-xs text-[#98a2b3]">ETA 3.4 min</span>
                </div>
                <div className="relative h-56 overflow-hidden rounded-[20px] border border-white/10 bg-[#0d1218]">
                  <div className="grid-bg absolute inset-0 opacity-60" />
                  <motion.div
                    className="absolute left-[14%] top-[18%] h-3 w-3 rounded-full bg-[#4cc9f0]"
                    animate={{ x: 22, y: 18 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute bottom-[18%] right-[20%] h-3 w-3 rounded-full bg-[#4cc9f0]"
                    animate={{ x: -16, y: -10 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e63946]"
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section-shell py-10">
        <div className="grid gap-4 lg:grid-cols-4">
          {[
            ['< 60s', 'Response'],
            ['3', 'Emergency Types'],
            ['Offline', 'Works Offline'],
            ['Zero', 'Setup'],
          ].map(([value, label]) => (
            <div key={label} className="glass rounded-[24px] px-6 py-5">
              <div className="text-3xl font-semibold tracking-[-0.03em] text-white">{value}</div>
              <div className="mt-2 text-sm text-[#98a2b3]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="section-shell py-28">
        <motion.div {...fadeUp}>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white lg:text-[52px]">How FlashAid Works</h2>
        </motion.div>
        <div className="mt-14 grid gap-6 xl:grid-cols-4">
          {howItWorks.map((item) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass rounded-[28px] p-6"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[rgba(230,57,70,0.1)] text-2xl text-[#ffd6db]">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#98a2b3]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-shell py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#bcc3cf]">The Dead Man&apos;s Broadcast</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white lg:text-[52px]">If you go silent, FlashAid takes over.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#98a2b3]">
              If you trigger FlashAid and go silent for 20 seconds, the app takes over. It broadcasts an alarm, flashes the screen, and alerts everyone nearby. No touch required.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="flex justify-center lg:justify-end">
            <div className="glass w-full max-w-[460px] rounded-[32px] p-8">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-[#bcc3cf]">Broadcast Trigger</p>
                <motion.div
                  className="mt-6 text-7xl font-semibold tracking-[-0.04em] text-white"
                  animate={{ opacity: [1, 0.75, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  20 → 0
                </motion.div>
                <motion.div
                  className="mt-6 rounded-[20px] border border-[#e63946]/20 px-5 py-5 text-center text-xl font-semibold tracking-[0.04em] text-white"
                  animate={{ backgroundColor: ['rgba(230,57,70,0.12)', 'rgba(230,57,70,0.8)', 'rgba(230,57,70,0.12)'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  BROADCAST ACTIVE
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-28">
        <motion.div {...fadeUp}>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white lg:text-[52px]">Emergency Types</h2>
        </motion.div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {emergencyTypes.map((type) => (
            <motion.div
              key={type.title}
              {...fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass rounded-[28px] p-7 transition-default"
              style={{ boxShadow: `0 0 0 rgba(0,0,0,0)`, borderColor: 'rgba(255,255,255,0.08)' }}
              onHoverStart={(event) => {
                event.currentTarget.style.borderColor = type.accent;
                event.currentTarget.style.boxShadow = `0 18px 42px ${type.accent}14`;
              }}
              onHoverEnd={(event) => {
                event.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                event.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
              }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] text-3xl" style={{ backgroundColor: `${type.accent}14`, color: type.accent }}>
                {type.icon}
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">{type.title}</h3>
              <div className="mt-5 space-y-3">
                {type.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 text-sm leading-7 text-[#98a2b3]">
                    <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: type.accent }} />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-shell pb-28 pt-8">
        <motion.div
          {...fadeUp}
          className="glass rounded-[36px] px-8 py-16 text-center"
        >
          <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-white lg:text-[56px]">
            Every Second You Wait Is A Second Lost.
          </h2>
          <button
            type="button"
            onClick={() => navigate('/emergency')}
            className="red-glow transition-default mt-8 rounded-full bg-[linear-gradient(135deg,#e63946,#c92f3e)] px-10 py-5 text-lg font-semibold text-white hover:scale-[1.02]"
          >
            Activate FlashAid Now
          </button>
          <p className="mt-5 text-sm text-[#98a2b3]">Works in your browser. No download. No account.</p>
        </motion.div>
      </section>
    </main>
  );
}
