'use client';

import { useCallback, useState } from 'react';
import { motion } from 'motion/react';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { HandUnderline } from '@/components/HandUnderline';
import { MechanismCycle } from '@/components/MechanismCycle';

const EXPLANATION_CARDS = [
  {
    number: '1',
    tone: 'bg-yellow text-dark-teal',
    title: 'Six cups, stacked and sealed',
    body: 'Each cup seals the one below it. The insulated tower keeps them cold.',
  },
  {
    number: '2',
    tone: 'bg-lavender text-dark-teal',
    title: 'The old cup drops into the bin',
    body: 'A trapdoor in the tray lets the licked cup fall inside the base. Never onto your floor.',
  },
  {
    number: '3',
    tone: 'bg-teal text-white',
    title: 'A fresh cup slides into the tray',
    body: 'A wind-up clock spring moves the drawer. One cup at a time, nothing else can fall.',
  },
  {
    number: '4',
    tone: 'bg-coral text-dark-teal',
    title: 'A Day Report flag pops up',
    body: 'Only when a cup is served. Count the flags when you get home.',
  },
];

const TOP_WAVE =
  'M0,0 H1440 V46 C1300,80 1180,26 1010,40 C830,55 720,104 560,90 C390,76 210,30 0,58 Z';

const BOTTOM_WAVE =
  'M0,120 H1440 V74 C1280,44 1150,96 980,80 C800,64 690,16 530,30 C360,45 180,90 0,62 Z';

export function HowItWorks() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleComplete = useCallback(() => setIsPlaying(false), []);
  const handlePlay = useCallback(() => setIsPlaying(true), []);

  return (
    <section id="how-it-works" className="relative scroll-mt-28 overflow-x-clip bg-peach">
      {/* Organic wave into the previous cream section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-[56px] w-full text-background sm:h-[92px]"
        >
          <path d={TOP_WAVE} fill="currentColor" />
        </svg>
      </div>

      {/* Organic wave into the next section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-[56px] w-full text-background sm:h-[92px]"
        >
          <path d={BOTTOM_WAVE} fill="currentColor" />
        </svg>
      </div>

      <Container>
        <div className="relative z-10 pb-20 pt-24 sm:pb-28 sm:pt-32">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex rounded-full border-2 border-text bg-white px-4 py-1.5 text-sm font-bold uppercase tracking-[0.14em] text-coral shadow-card">
              How it works
            </span>
            <h2 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]">
              A little clockwork kitchen,{' '}
              <span className="relative inline-block pb-2 text-teal">
                inside a tower
                <HandUnderline />
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text/70 sm:text-lg">
              Six sealed frozen cups stack inside the insulated tower. Turn the
              dial in the morning and the clockwork mechanism does the rest,
              one cup at a time.
            </p>
          </motion.div>

          {/* Two column: cutaway image + explanation cards */}
          <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-14">
            {/* Left — cutaway */}
            <motion.div
              initial={{ opacity: 0, x: -26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto w-full max-w-[540px] lg:mx-0"
            >
              <div className="relative -rotate-[1.5deg]">
                <div className="overflow-hidden rounded-[2rem] border-2 border-text bg-white p-2.5 shadow-soft">
                  <img
                    src="/images/cutaway.jpg"
                    alt="Cutaway of the AwayStack showing six sealed frozen lick cups stacked in the insulated tower, the lick tray and the internal bin"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    className="block w-full rounded-[1.5rem] object-cover"
                  />
                </div>
                <span className="absolute -left-2 -top-3 rounded-full border-2 border-text bg-dark-teal px-4 py-2 font-heading text-sm font-bold text-white shadow-soft sm:-left-3">
                  Inside view
                </span>
              </div>
            </motion.div>

            {/* Right — four explanation cards */}
            <div className="space-y-3.5">
              {EXPLANATION_CARDS.map((card, i) => (
                <motion.div
                  key={card.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border-2 border-text bg-white p-5 shadow-card"
                >
                  <div className="flex gap-4">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-text font-heading text-lg font-bold shadow-soft ${card.tone}`}
                    >
                      {card.number}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold leading-snug text-text">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-text/70">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mechanism demonstration */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-14 rounded-[2rem] border-2 border-text bg-white p-5 shadow-soft sm:p-8 lg:mt-20"
          >
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              {/* Left — mechanism image + cycle animation */}
              <MechanismCycle isPlaying={isPlaying} onComplete={handleComplete} />

              {/* Right — copy */}
              <div>
                <span className="inline-flex rounded-full bg-teal px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  Watch one cycle
                </span>
                <h3 className="mt-5 font-heading text-3xl font-bold leading-[1.15] tracking-tight text-text sm:text-4xl">
                  Drawer out, cup in, flag up, next cup ready.
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-text/70">
                  Wound by the dial each morning. No battery, no motor noise, no
                  app.
                </p>
                <Button
                  variant="raised"
                  size="lg"
                  shape="pill"
                  onClick={handlePlay}
                  disabled={isPlaying}
                  className="mt-8"
                >
                  {isPlaying ? 'Playing cycle…' : 'Watch one cycle'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;
