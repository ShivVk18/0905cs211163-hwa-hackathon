'use client';

import { motion } from 'motion/react';

import { Container } from '@/components/Container';
import { HandUnderline } from '@/components/HandUnderline';

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="11" cy="12" r="7.5" />
      <path d="M11 8v4.2l2.8 1.8" />
      <path d="M18.5 12H21" />
      <path d="M20 9.2v5.6" />
    </svg>
  );
}

function SealedCupIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5.5 8.5h13l-1.1 10.2a2.2 2.2 0 0 1-2.2 2H8.8a2.2 2.2 0 0 1-2.2-2L5.5 8.5z" />
      <path d="M4.5 5.2h15v3.3h-15z" />
      <path d="M12 12v4.6M9.8 14.3h4.4" />
    </svg>
  );
}

function OneCupIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="M3 10h18" />
      <path d="M9.8 12.5h4.4v4h-4.4z" />
    </svg>
  );
}

function BinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5.2 7.5h13.6l-1.1 11.2a2.2 2.2 0 0 1-2.2 2H8.5a2.2 2.2 0 0 1-2.2-2L5.2 7.5z" />
      <path d="M9.2 7.5V5.4a1.4 1.4 0 0 1 1.4-1.4h2.8a1.4 1.4 0 0 1 1.4 1.4v2.1" />
      <path d="M9.8 12.2h4.4" />
    </svg>
  );
}

function ShieldPawIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3l7.4 3v6.1c0 4.3-3 7.9-7.4 9.2-4.4-1.3-7.4-4.9-7.4-9.2V6L12 3z" />
      <ellipse cx="12" cy="14.7" rx="2.5" ry="2" />
      <ellipse cx="8.5" cy="11.7" rx="1" ry="1.3" transform="rotate(-22 8.5 11.7)" />
      <ellipse cx="10.7" cy="10" rx="0.9" ry="1.2" transform="rotate(-8 10.7 10)" />
      <ellipse cx="13.3" cy="10" rx="0.9" ry="1.2" transform="rotate(8 13.3 10)" />
      <ellipse cx="15.5" cy="11.7" rx="1" ry="1.3" transform="rotate(22 15.5 11.7)" />
    </svg>
  );
}

function WeightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6.4 8.5h11.2l2.1 8.2a1.6 1.6 0 0 1-1.6 2H5.9a1.6 1.6 0 0 1-1.6-2l2.1-8.2z" />
      <path d="M8.6 18.7v1.8M15.4 18.7v1.8" />
      <path d="M10.6 11.6h2.8" />
    </svg>
  );
}

const FEATURES = [
  {
    title: 'No battery, no wires',
    description: 'A wind-up clock spring does the timing.',
    background: '#D9F0E4',
    wave: '#A9DCC4',
    Icon: ClockIcon,
  },
  {
    title: 'Sealed and cold',
    description: 'Cups stay sealed in an insulated tower until their turn.',
    background: '#E7DDF7',
    wave: '#C9B6EC',
    Icon: SealedCupIcon,
  },
  {
    title: 'One cup at a time',
    description: 'The drawer blocks the stack, so it never over-feeds.',
    background: '#FDEFC4',
    wave: '#F7DC8A',
    Icon: OneCupIcon,
  },
  {
    title: 'Nothing on the floor',
    description: 'Empty cups drop into a closed bin inside the base.',
    background: '#FBE0D4',
    wave: '#F5BFA6',
    Icon: BinIcon,
  },
  {
    title: 'Paw-proof shell',
    description: 'Locked, chew resistant body with no edges to grab.',
    background: '#FFFFFF',
    wave: '#C9B6EC',
    outlined: true,
    Icon: ShieldPawIcon,
  },
  {
    title: 'Heavy and grippy',
    description: 'Wide weighted base with no slip feet. Hard to tip.',
    background: '#E7DDF7',
    wave: '#C9B6EC',
    Icon: WeightIcon,
  },
];

function WaveTop({ color, background }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-6 rounded-t-[1.5rem]"
      style={{ backgroundColor: color }}
    >
      <svg
        viewBox="0 0 400 24"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0 12C66 2 133 22 200 12C266 2 333 22 400 12V24H0z"
          fill={background}
        />
      </svg>
    </div>
  );
}

export function SafeByDesign() {
  return (
    <section id="safe-by-design" className="bg-background pt-14 pb-16 sm:pt-16 sm:pb-20">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]">
            Safe by design,{' '}
            <span className="relative inline-block pb-2 text-teal">
              tidy by design
              <HandUnderline />
            </span>
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const { Icon } = feature;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, transition: { duration: 0.2, delay: 0 } }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] px-6 pt-10 pb-7 transition-shadow duration-200 hover:shadow-card sm:px-7 sm:pt-11 sm:pb-8 ${
                  feature.outlined ? 'border border-text/70' : ''
                }`}
                style={{ backgroundColor: feature.background }}
              >
                <WaveTop color={feature.wave} background={feature.background} />

                <Icon className="h-7 w-7 shrink-0 text-text" />

                <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-text">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text/65">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-text/50">
          Proposed design features for a concept product. Safety, durability and
          performance have not been independently tested or certified.
        </p>
      </Container>
    </section>
  );
}

export default SafeByDesign;
