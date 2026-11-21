'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
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

const CLOCK_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14" />
  </svg>
);

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

function IndicatorDots({ filled, total = 6, size = 'md' }) {
  const dotSize = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2';

  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`${dotSize} rounded-full ${i < filled ? '' : 'opacity-25'}`}
          style={i < filled ? { backgroundColor: INDICATOR_COLORS[i] } : undefined}
        />
      ))}
    </span>
  );
}

function SessionCard({ className = '' }) {
  return (
    <div
      className={`rounded-card border border-peach/60 bg-white/95 p-3 shadow-soft backdrop-blur-sm ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal/70">
        Session
      </p>
      <p className="mt-0.5 font-heading text-sm font-bold text-text">3 of 6</p>
      <div className="mt-2">
        <IndicatorDots filled={3} size="sm" />
      </div>
    </div>
  );
}

function NextCupCard({ className = '' }) {
  return (
    <div
      className={`rounded-card border border-peach/60 bg-white/95 p-3 shadow-soft backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-peach text-dark-teal">
          {CLOCK_ICON}
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal/70">
            Next cup
          </p>
          <p className="mt-0.5 font-heading text-sm font-bold text-text">in 42 min</p>
        </div>
      </div>
    </div>
  );
}

function DayReportCard({ className = '' }) {
  return (
    <div
      className={`rounded-card border border-peach/60 bg-white/95 p-4 shadow-soft backdrop-blur-sm lg:w-[172px] ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal/70">
          Day Report
        </p>
        <IndicatorDots filled={4} size="sm" />
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
        <div className="absolute -right-24 -top-28 h-[26rem] w-[26rem] rounded-full bg-peach/40 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-[22rem] w-[22rem] rounded-full bg-yellow/25 blur-3xl" />
        <div className="absolute right-[28%] top-24 h-56 w-56 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 pt-10 pb-14 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:pt-20 lg:pb-20">
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="peach" size="md" className="mb-6">
              No battery · No app · Made for homes
            </Badge>

            <h1 className="font-heading text-[2rem] font-bold leading-[1.08] tracking-tight text-text [text-wrap:balance] sm:text-5xl lg:text-[2.75rem] xl:text-[3.15rem]">
              One Preparation.
              <br className="hidden sm:block" />{' '}
              <span className="text-teal">Six lick moments</span>
              <br className="hidden sm:block" /> across your day.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-text/70 sm:text-lg">
              Stack six frozen cups in the morning and turn the dial. AwayStack
              serves one at a time while you&rsquo;re out, then tells you how
              their day went.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button variant="coral" size="lg" asChild className="w-full sm:w-auto">
                <Link href={PRODUCT_HREF}>Get AwayStack · ₹1,499</Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleHowItWorks}
                className="w-full sm:w-auto"
              >
                See how it works
              </Button>
            </div>

            <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
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

          {/* Right — product visual */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="relative"
          >
            <div className="relative rounded-card bg-peach/20 p-2 sm:p-3">
              <div className="overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)] border border-peach/50 bg-white shadow-soft">
                <img
                  src="/images/hero.jpg"
                  alt="AwayStack frozen lick enrichment tower with teal lid, peach base and lick tray"
                  width={1024}
                  height={1024}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="block aspect-square w-full object-cover"
                />
              </div>
            </div>

            {/* Floating product UI — stacked below the image on mobile, floating on desktop */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:absolute lg:inset-0 lg:mt-0 lg:block">
              <SessionCard className="lg:absolute lg:-left-6 lg:top-10" />

              <NextCupCard className="lg:absolute lg:-bottom-6 lg:-left-2" />

              <DayReportCard className="col-span-2 lg:absolute lg:-right-6 lg:top-12 lg:col-span-1" />
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
