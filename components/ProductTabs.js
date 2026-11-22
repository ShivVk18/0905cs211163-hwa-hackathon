'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

import { Container } from '@/components/Container';
import { product } from '@/data/product';

const { tabs } = product;

function WaveTop({ color, background }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-6 w-full"
    >
      <path
        d="M0 12C66 2 133 22 200 12C266 2 333 22 400 12V24H0z"
        fill={background}
      />
    </svg>
  );
}

const STEP_BADGE_COLORS = [
  { background: '#FFC94D', color: '#2B2118' },
  { background: '#9C8FE6', color: '#FFFFFF' },
  { background: '#1C8C88', color: '#FFFFFF' },
];

function StepItem({ number, text }) {
  const badge = STEP_BADGE_COLORS[number - 1] ?? STEP_BADGE_COLORS[0];
  return (
    <li className="flex items-start gap-4">
      <span
        style={{ backgroundColor: badge.background, color: badge.color }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] border-ink font-fredoka text-base font-bold leading-none"
      >
        {number}
      </span>
      <p className="min-w-0 flex-1 leading-relaxed text-text/70">{text}</p>
    </li>
  );
}

function SpecItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-text/10 pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-text/60">{label}</span>
      <span className="text-base font-bold text-text">{value}</span>
    </div>
  );
}

function renderTabContent(tab) {
  switch (tab.id) {
    case 'how-it-works': {
      return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-12">
          <div className="w-full min-w-0 max-w-full overflow-hidden rounded-[2rem] border-[3px] border-ink bg-sand shadow-soft aspect-[16/9]">
            <video
              src="/video/video.mp4"
              aria-label={tab.image.alt}
              width={tab.image.width}
              height={tab.image.height}
              loading="lazy"
              autoPlay
              muted
              loop
              playsInline
              className="block h-full w-full max-w-full object-contain"
            />
          </div>
          <div className="flex min-w-0 flex-col justify-center">
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl lg:text-[44px]">
              {tab.heading}
            </h2>
            <p className="mt-3 font-body text-base font-medium text-brand-teal sm:text-lg">
              Wound by the dial. No battery, no app.
            </p>
            <ol className="mt-7 flex list-none flex-col gap-5 p-0">
              {tab.steps.map((step, i) => (
                <StepItem key={i} number={i + 1} text={step} />
              ))}
            </ol>
          </div>
        </div>
      );
    }
    case 'whats-inside': {
      return (
        <div className="grid w-full max-w-full grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div className="mx-auto w-full min-w-0 max-w-[420px] lg:mx-0">
            <div className="relative w-full max-w-full overflow-hidden rounded-[2rem] border-2 border-text bg-white shadow-soft aspect-[687/1024]">
              <img
                src={tab.image.src}
                alt={tab.image.alt}
                width={tab.image.width}
                height={tab.image.height}
                loading="lazy"
                decoding="async"
                className="block h-full w-full max-w-full object-cover"
              />
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {tab.components.map((component, i) => (
              <div
                key={i}
                className="flex min-w-0 items-center gap-3 rounded-2xl border border-text/15 bg-background p-4 shadow-soft"
              >
                <span className="shrink-0 rounded-full border-2 border-text bg-background px-2 text-text font-bold text-sm leading-none">
                  {i + 1}
                </span>
                <span className="min-w-0 text-text">{component}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case 'specs': {
      return (
        <div className="w-full max-w-full rounded-[2rem] border border-text/15 bg-white p-5 sm:p-6 lg:p-8 shadow-soft">
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {tab.specs.map((spec) => (
              <SpecItem key={spec.label} label={spec.label} value={spec.value} />
            ))}
          </div>
        </div>
      );
    }
    case 'care-safety': {
      return (
        <div className="grid w-full max-w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {tab.cards.map((card, i) => (
            <div
              key={i}
              className="relative flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-text/15 shadow-sm flex flex-col items-center gap-2 sm:gap-3 text-center"
              style={{ backgroundColor: card.background }}
            >
              <WaveTop color={card.wave} background={card.background} />
              <div className="p-4 sm:p-6 flex flex-col items-center gap-2 sm:gap-3">
                <h4 className="font-heading text-base font-bold leading-snug text-text sm:text-lg">
                  {card.title}
                </h4>
                <p className="text-sm font-medium text-text/70">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    default:
      return null;
  }
}

export function ProductTabs() {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  return (
    <section id="product-tabs" className="scroll-mt-24 bg-background pt-20 sm:pt-28">
      <Container>
        {/* Tab navigation */}
        <div className="flex w-full max-w-full flex-wrap gap-2.5">
          {tabs.map((t) => {
            const isActive = t.id === activeTabId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTabId(t.id)}
                aria-pressed={isActive}
                className={`h-12 max-w-full whitespace-nowrap rounded-full border-2 px-6 text-sm font-medium leading-none transition-colors duration-200 ${
                  isActive
                    ? 'border-brand-teal bg-brand-teal text-white shadow-card'
                    : 'border-ink bg-white text-ink hover:bg-sand'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="mt-7 w-full max-w-full">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            {renderTabContent(tab)}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default ProductTabs;
