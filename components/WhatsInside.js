'use client';

import { motion } from 'motion/react';

import { Container } from '@/components/Container';

const PARTS = [
  '01 Twist-lock lid',
  '02 Six sealed frozen cups',
  '03 Insulated frosted tower',
  '04 Clockwork slide drawer',
  '05 Lick tray with trapdoor',
  '06 Base:dial, flags, cup bin',
];

function PawPrint() {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none absolute -bottom-10 -right-8 h-48 w-48 text-text/12 sm:-bottom-14 sm:-right-12 sm:h-64 sm:w-64 lg:-right-16 lg:h-80 lg:w-80"
      fill="currentColor"
    >
      <ellipse cx="50" cy="63" rx="23" ry="18.5" />
      <ellipse cx="19" cy="35" rx="8.5" ry="11.5" transform="rotate(-22 19 35)" />
      <ellipse cx="39" cy="23" rx="8" ry="11.5" transform="rotate(-9 39 23)" />
      <ellipse cx="61" cy="23" rx="8" ry="11.5" transform="rotate(9 61 23)" />
      <ellipse cx="81" cy="35" rx="8.5" ry="11.5" transform="rotate(22 81 35)" />
    </motion.svg>
  );
}

export function WhatsInside() {
  return (
    <section className="relative overflow-hidden bg-yellow py-20 sm:py-28">
      <PawPrint />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — exploded product image */}
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-[480px] lg:mx-0"
          >
            <div className="-rotate-[2deg] lg:-rotate-[3deg]">
              <div className="overflow-hidden rounded-[2rem] border-2 border-text bg-white p-2.5 shadow-soft">
                <img
                  src="/images/exploded.jpg"
                  alt="Exploded view of the AwayStack showing the twist-lock lid, six frozen lick cups, frosted insulated tower, slide drawer, lick tray and the base with dial, flags and cup bin"
                  width={687}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[2/3] w-full rounded-[1.5rem] bg-background object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right — heading, component labels, dishwasher line */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]">
              What&rsquo;s inside
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
              {PARTS.map((part, i) => (
                <motion.div
                  key={part}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="rounded-2xl border-2 border-text/15 bg-background px-3 py-3 text-center text-xs font-bold leading-snug text-text shadow-card sm:px-4 sm:py-3.5 sm:text-sm"
                >
                  {part}
                </motion.div>
              ))}
            </div>

            <p className="mt-8 max-w-lg font-heading text-xl font-bold leading-snug text-text sm:text-2xl">
              Every food part comes out for the dishwasher.
            </p>
            <p className="mt-3 max-w-lg text-xs leading-relaxed text-text/55">
              A proposed product feature. Dishwasher compatibility and food-contact
              safety have not been physically tested.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default WhatsInside;
