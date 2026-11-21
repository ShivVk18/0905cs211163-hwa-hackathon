'use client';

import { motion } from 'motion/react';

import { Container } from '@/components/Container';
import { HandUnderline } from '@/components/HandUnderline';
import { FLAVOURS } from '@/lib/schedule';

const FLAVOUR_STYLES = [
  { color: '#F6E7CF', text: '#202B29' },
  { color: '#F08A3C', text: '#FFFFFF' },
  { color: '#FFFFFF', text: '#202B29' },
  { color: '#FFC94A', text: '#103B38' },
  { color: '#E8D5B7', text: '#202B29' },
  { color: '#F9C2D4', text: '#103B38' },
];

export function FlavourCups() {
  return (
    <section id="flavour-cups" className="relative scroll-mt-28 bg-background py-20 sm:py-28">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border-2 border-text bg-coral px-4 py-1.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-card">
            Flavour Cups
          </span>
          <h2 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]">
            A flavour for{' '}
            <span className="relative inline-block pb-2 text-teal">
              every moment
              <HandUnderline />
            </span>
          </h2>
        </motion.div>

        {/* Wide image with flavour labels overlapping the bottom edge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative mt-14 sm:mt-16"
        >
          <div className="overflow-hidden rounded-[2rem] border-2 border-text bg-white shadow-soft">
            <img
              src="/images/flavours.jpg"
              alt="Six bowls of AwayStack lick cup fillings in different colours — white curd rice, orange pumpkin, crumbly paneer, golden broth, beige banana oats and a pink welcome home recipe"
              width={1024}
              height={687}
              loading="lazy"
              decoding="async"
              className="block aspect-[3/2] w-full object-cover"
            />
          </div>

          <ul className="relative z-10 -mt-4 grid grid-cols-3 justify-items-center gap-2 px-3 sm:-mt-5 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 sm:px-6">
            {FLAVOURS.map((flavour, i) => {
              const style = FLAVOUR_STYLES[i % FLAVOUR_STYLES.length];
              return (
                <li key={flavour}>
                  <span
                    className="inline-flex items-center whitespace-nowrap rounded-full border-2 border-text px-3 py-1.5 text-xs font-bold shadow-soft sm:px-4 sm:text-sm"
                    style={{ backgroundColor: style.color, color: style.text }}
                  >
                    {flavour}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Food safety note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-text/60"
        >
          Dog-safe only: no onion, garlic, grapes, chocolate or xylitol.
        </motion.p>
      </Container>
    </section>
  );
}

export default FlavourCups;
