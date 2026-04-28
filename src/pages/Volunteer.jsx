// FILE: src/pages/Volunteer.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skills = ['CPR', 'First Aid', 'AED'];

export default function Volunteer() {
  const [selectedSkills, setSelectedSkills] = useState(['CPR', 'First Aid']);
  const [showToast, setShowToast] = useState(false);

  const toggleSkill = (skill) => {
    setSelectedSkills((current) =>
      current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill]
    );
  };

  const handleRegister = () => {
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <main className="section-shell min-h-screen pt-16">
      <section className="grid gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#bcc3cf]">Volunteer Network</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white lg:text-[68px]">
            Become a FlashAid Volunteer
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#98a2b3]">Be the nearest responder. Make the difference.</p>

          <div className="glass mt-12 rounded-[32px] p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#98a2b3]">Name</p>
                <p className="mt-3 text-base text-white">Anika Reddy</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#98a2b3]">Phone</p>
                <p className="mt-3 text-base text-white">+91 98XXX XXXXX</p>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[#98a2b3]">Area / Locality</p>
              <p className="mt-3 text-base text-white">Madhapur, Hyderabad</p>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#98a2b3]">Emergency Skills</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {skills.map((skill) => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`transition-default rounded-full px-5 py-3 text-sm font-medium ${
                        active
                          ? 'border border-[#4cc9f0]/25 bg-[rgba(76,201,240,0.12)] text-[#dff6ff]'
                          : 'border border-white/10 bg-white/[0.04] text-white'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleRegister}
              className="red-glow transition-default mt-8 rounded-full bg-[linear-gradient(135deg,#e63946,#c92f3e)] px-7 py-4 text-base font-semibold text-white hover:scale-[1.02]"
            >
              Register as Volunteer
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="glass rounded-[24px] px-5 py-5">
              <p className="text-3xl font-semibold tracking-[-0.03em] text-white">127</p>
              <p className="mt-2 text-sm text-[#98a2b3]">volunteers in your area</p>
            </div>
            <div className="glass rounded-[24px] px-5 py-5">
              <p className="text-3xl font-semibold tracking-[-0.03em] text-white">3.2 min</p>
              <p className="mt-2 text-sm text-[#98a2b3]">Average response</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-col justify-center"
        >
          <div className="glass rounded-[32px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-white">Local Volunteer Grid</h2>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#98a2b3]">Preview</span>
            </div>
            <div className="relative h-[520px] overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0f17]">
              <svg viewBox="0 0 600 520" className="absolute inset-0 h-full w-full">
                {Array.from({ length: 13 }).map((_, index) => (
                  <g key={`v-grid-${index}`}>
                    <line x1={index * 50} y1="0" x2={index * 50} y2="520" stroke="rgba(255,255,255,0.05)" />
                    <line x1="0" y1={index * 43} x2="600" y2={index * 43} stroke="rgba(255,255,255,0.05)" />
                  </g>
                ))}
                <path d="M10 460 C120 320, 220 340, 310 220 S520 120, 590 40" stroke="rgba(76,201,240,0.22)" strokeWidth="4" fill="none" />
                <path d="M0 170 C140 110, 220 160, 380 110 S560 70, 600 110" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
              </svg>

              {[
                [120, 110],
                [260, 180],
                [330, 300],
                [420, 160],
                [500, 260],
                [210, 390],
              ].map(([left, top], index) => (
                <motion.div
                  key={`dot-${left}-${top}`}
                  className="absolute h-3 w-3 rounded-full bg-[#4cc9f0] shadow-[0_0_18px_rgba(76,201,240,0.8)]"
                  style={{ left, top }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.2 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-8 right-8 z-50 rounded-[20px] border border-white/10 bg-[rgba(14,18,24,0.88)] px-5 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            Volunteer profile added to the FlashAid local response network.
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
