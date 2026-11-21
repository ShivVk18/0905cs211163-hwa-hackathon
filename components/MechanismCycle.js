'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const CYCLE_STEPS = [
  { key: 'drawer', label: 'Drawer out' },
  { key: 'drop', label: 'Used cup drops into the bin' },
  { key: 'fresh', label: 'Fresh cup slides into the tray' },
  { key: 'flag', label: 'Day Report flag pops up' },
];

const STEP_DURATION = 1350;

function Cup({ color }) {
  return (
    <span
      className="block h-full w-full rounded-[45%_45%_38%_38%] border-2 border-text shadow-soft"
      style={{ backgroundColor: color }}
    />
  );
}

export function MechanismCycle({ isPlaying, onComplete }) {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!isPlaying) {
      setStep(-1);
      return;
    }

    const timers = CYCLE_STEPS.map((_, i) =>
      setTimeout(() => setStep(i), i * STEP_DURATION)
    );
    const finish = setTimeout(() => {
      setStep(-1);
      onComplete?.();
    }, CYCLE_STEPS.length * STEP_DURATION + 400);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finish);
    };
  }, [isPlaying, onComplete]);

  const active = step >= 0;

  return (
    <div>
      <div className="relative mx-auto aspect-[687/1024] w-full max-w-[300px] overflow-hidden rounded-[1.75rem] border-2 border-text bg-peach/30 shadow-card">
        <img
          src="/images/exploded.jpg"
          alt="Exploded view of the AwayStack showing the lid, six frozen lick cups, insulated body, drawer, lick tray and base"
          width={687}
          height={1024}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover"
        />

        <div aria-hidden="true" className="absolute inset-0">
          {/* Step 1 — the drawer moves out */}
          <motion.div
            className="absolute rounded-lg bg-teal/55 ring-2 ring-white/80"
            style={{ left: '36%', top: '71.5%', width: '30%', height: '5%' }}
            initial={false}
            animate={active ? { x: '-14%' } : { x: '0%' }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
          />

          {/* Step 2 — the used cup drops into the internal bin */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div
                key="drop"
                className="absolute h-[5.5%] w-[10%]"
                style={{ left: '37%', top: '76%' }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ left: '47%', top: '83.5%', opacity: 0, scale: 0.85 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.95, ease: 'easeIn' }}
              >
                <Cup color="#EFE3D2" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3 — a fresh cup slides into the tray */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                key="fresh"
                className="absolute h-[5.5%] w-[10%]"
                style={{ left: '55%', top: '69%' }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ left: '36%', top: '76%', opacity: 1, scale: 1 }}
                transition={{ duration: 0.95, ease: 'easeOut' }}
              >
                <Cup color="#F0955B" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4 — the Day Report flag pops up */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                key="flag"
                className="absolute flex origin-bottom flex-col items-center"
                style={{ left: '59%', top: '87%' }}
                initial={{ y: '0%', opacity: 0, scale: 0.6 }}
                animate={{ y: '-8%', opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 14 }}
              >
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                  <path
                    d="M0 0 L16 6 L0 12 Z"
                    fill="#F1785B"
                    stroke="#202B29"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="block h-[14%] w-[2px] bg-text" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Step indicator */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {CYCLE_STEPS.map((s, i) => (
            <span
              key={s.key}
              className={`h-2 w-2 rounded-full border border-text transition-colors duration-300 ${
                step === i ? 'bg-coral' : 'bg-white'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="min-h-[1.25rem] text-center text-xs font-semibold uppercase tracking-[0.14em] text-dark-teal">
          {active ? CYCLE_STEPS[step].label : 'Six cups, one clockwork cycle'}
        </p>
      </div>
    </div>
  );
}

export default MechanismCycle;
