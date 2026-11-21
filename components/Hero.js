'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { HandUnderline } from '@/components/HandUnderline';
import { scrollToSection } from '@/lib/scroll';

const PRODUCT_HREF = '/shop/awaystack';

const INDICATOR_COLORS = [
  '#F9D6C8',
  '#A78BDA',
  '#FFC94A',
  '#F1785B',
  '#126D68',
  '#8ED0CB',
];

const SCROLL_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FEATURES = [
  { label: '6 frozen cups', color: INDICATOR_COLORS[3] },
  { label: 'Wind-up clockwork', color: INDICATOR_COLORS[2] },
  { label: 'No app required', color: INDICATOR_COLORS[4] },
];

function CupIndicators({ filled, total = 6 }) {
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i < filled ? '' : 'opacity-25'}`}
          style={i < filled ? { backgroundColor: INDICATOR_COLORS[i] } : undefined}
        />
      ))}
    </span>
  );
}

function SessionCard({ className = '' }) {
  return (
    <div
      className={`rounded-2xl bg-teal px-4 py-3 text-white shadow-soft ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
        Session 3 of 6
      </p>
      <p className="mt-1 font-heading text-base font-bold">Next cup in 42 min</p>
    </div>
  );
}

function DayReportCard({ className = '' }) {
  return (
    <div
      className={`rounded-2xl border-2 border-text bg-white px-4 py-3 shadow-soft ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal">
          Day Report
        </p>
        <CupIndicators filled={4} />
      </div>
      <p className="mt-1.5 font-heading text-sm font-bold text-text">
        4 of 6 cups served
      </p>
    </div>
  );
}

export function Hero() {
  const handleHowItWorks = () => {
    if (!scrollToSection('how-it-works')) {
      window.location.hash = 'how-it-works';
    }
  };

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Warm ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-28 h-[28rem] w-[28rem] rounded-full bg-peach/40 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-[22rem] w-[22rem] rounded-full bg-yellow/25 blur-3xl" />
        <div className="absolute right-[30%] top-32 h-56 w-56 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-14 pt-10 pb-14 sm:pt-16 lg:grid-cols-[52fr_48fr] lg:gap-8 lg:pt-16 lg:pb-24">
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              variant="peach"
              size="lg"
              className="mb-7 px-4 py-2 text-sm font-bold text-dark-teal sm:text-base"
            >
              🐾 No battery · No app · Made for Indian homes
            </Badge>

            <h1 className="font-heading text-[2.1rem] font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-[2.9rem] xl:text-[3.4rem]">
              <span className="block text-text">One Prepartion</span>
              <span className="relative mt-1 inline-block pb-2 text-teal">
                Six lick moments
                <HandUnderline />
              </span>
              <span className="block text-text">across your day.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-text/70 sm:text-lg">
              Stack six frozen cups in the morning and turn the dial. AwayStack
              serves one at a time while you&rsquo;re out, then tells you how
              their day went.
            </p>

            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Button variant="raised" size="lg" shape="pill" asChild className="w-full sm:w-auto">
                <Link href={PRODUCT_HREF}>Get AwayStack · ₹1,499</Link>
              </Button>
              <Button
                variant="outlineDark"
                size="lg"
                shape="pill"
                onClick={handleHowItWorks}
                className="w-full sm:w-auto"
              >
                See how it works
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              {FEATURES.map((feature) => (
                <li
                  key={feature.label}
                  className="flex items-center gap-2 text-sm font-medium text-text/70"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: feature.color }}
                    aria-hidden="true"
                  />
                  {feature.label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — product visual in an arch frame */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:max-w-none"
          >
            {/* Arch frame */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[2.5rem] border-2 border-text bg-peach/25 shadow-soft">
              <img
                src="/images/hero.jpg"
                alt="AwayStack frozen lick enrichment tower with teal lid, peach base and lick tray"
                width={1024}
                height={1024}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </div>

            {/* Floating product UI — stacked below the frame on mobile, floating on desktop */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block">
              <SessionCard className="lg:absolute lg:-right-4 lg:top-7" />

              <DayReportCard className="lg:absolute lg:-bottom-6 lg:-left-6" />
            </div>
          </motion.div>
        </div>

        {/* Bottom detail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-2 pb-10 text-center lg:pb-14"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-teal/60"
          >
            {SCROLL_ICON}
          </motion.span>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-text/45 sm:text-sm">
            Six moments. One happier routine.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
