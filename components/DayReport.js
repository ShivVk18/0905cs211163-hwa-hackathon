'use client';

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'motion/react';

import { Container } from '@/components/Container';

const FLAGS = [
  { id: 1, color: '#F9D6C8', label: 'Cup 1' },
  { id: 2, color: '#A78BDA', label: 'Cup 2' },
  { id: 3, color: '#FFC94A', label: 'Cup 3' },
  { id: 4, color: '#F1785B', label: 'Cup 4' },
  { id: 5, color: '#DDE3E1', label: 'Cup 5' },
  { id: 6, color: '#DDE3E1', label: 'Cup 6' },
];

const INITIAL_SERVED = [true, true, true, true, false, false];

function HeartDecoration() {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 }}
      className="pointer-events-none absolute -right-2 -top-3 z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-text bg-coral shadow-soft sm:-right-4 sm:-top-5 sm:h-16 sm:w-16"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="none">
        <path
          d="M12 20.4c-.5 0-1-.2-1.4-.5C8 17.8 3.6 14 3.6 9.6c0-2.8 2-4.9 4.6-4.9 1.7 0 3 .9 3.8 2.2.8-1.3 2.1-2.2 3.8-2.2 2.6 0 4.6 2.1 4.6 4.9 0 4.4-4.4 8.2-7 10.3-.4.3-.9.5-1.4.5z"
          fill="#FFF7ED"
          stroke="#202B29"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}

function FlagIndicator({ flag, served, index, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(index)}
      aria-pressed={served}
      aria-label={`${flag.label}: ${served ? 'served' : 'not served'}. Toggle.`}
      className="group flex flex-col items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
    >
      {/* Slot */}
      <span className="relative flex h-20 w-full items-end justify-center overflow-hidden rounded-xl border-2 border-text bg-dark-teal/85 p-1.5 transition-colors group-hover:bg-dark-teal sm:h-24 sm:p-2">
        <motion.span
          className="block h-14 w-full rounded-t-full rounded-b-md border-2 border-text sm:h-16"
          style={{ backgroundColor: flag.color }}
          initial={false}
          animate={
            served
              ? { y: 0, opacity: 1, scale: 1 }
              : { y: 30, opacity: 0.35, scale: 0.9 }
          }
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
        />
      </span>
      {/* Number */}
      <span
        className={`text-xs font-bold tabular-nums ${
          served ? 'text-text' : 'text-text/40'
        }`}
      >
        {flag.id}
      </span>
    </button>
  );
}

export function DayReport() {
  const [served, setServed] = useState(INITIAL_SERVED);

  const servedCount = useMemo(
    () => served.filter(Boolean).length,
    [served]
  );

  const handleToggle = useCallback((index) => {
    setServed((current) =>
      current.map((value, i) => (i === index ? !value : value))
    );
  }, []);

  return (
    <section id="day-report" className="relative scroll-mt-28 bg-background py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — close-up of the flag row */}
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-[560px] lg:mx-0"
          >
            <HeartDecoration />
            <div className="overflow-hidden rounded-[2rem] border-2 border-text bg-white p-2.5 shadow-soft">
              <img
                src="/images/flags.jpg"
                alt="Close-up of the AwayStack base showing six session flags in a row — peach, lavender, yellow, coral and two pale flags — beside the white dial"
                width={1024}
                height={687}
                loading="lazy"
                decoding="async"
                className="block aspect-[3/2] w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </motion.div>

          {/* Right — copy + interactive flag card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex rounded-full bg-teal px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
              The Day Report
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.12] tracking-tight text-text sm:text-4xl lg:text-[2.75rem]">
              How was their day?{' '}
              <span className="text-coral">The flags tell you.</span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text/70">
              A flag pops up each time a cup is served. No camera, no app, no
              subscription. Tap to try it.
            </p>

            {/* Interactive card */}
            <div className="mt-8 rounded-[2rem] border-2 border-text bg-white p-5 shadow-soft sm:p-7">
              {/* Flags */}
              <div className="rounded-[1.5rem] border-2 border-text bg-dark-teal p-3 sm:p-4">
                <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6 sm:gap-2.5">
                  {FLAGS.map((flag, i) => (
                    <FlagIndicator
                      key={flag.id}
                      flag={flag}
                      index={i}
                      served={served[i]}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              </div>

              {/* Count */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <p
                  aria-live="polite"
                  className="font-heading text-xl font-bold tabular-nums text-text sm:text-2xl"
                >
                  {`${servedCount} of 6 cups served`}
                </p>
                <span className="rounded-full border border-text/15 bg-background px-3 py-1 text-xs font-semibold text-text/70">
                  Flags up
                </span>
              </div>

              {/* Message */}
              <p className="mt-4 text-base leading-relaxed text-text/80">
                A good day. Busy in the morning, then a long nap is likely.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-text/50">
                Illustrative example only. A flag shows that a cup was served, not
                that your dog finished it, and the reading above is not a proven
                behavioural claim.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default DayReport;
