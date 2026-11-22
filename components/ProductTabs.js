'use client';

import { useState } from 'react';

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

function StepItem({ number, text }) {
  return (
    <div className="flex gap-4">
      <span className="shrink-0 rounded-full border-2 border-text bg-background p-1 text-text font-bold text-sm leading-none">
        {number}
      </span>
      <p className="leading-relaxed text-text/70">{text}</p>
    </div>
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-text bg-white shadow-soft aspect-[900/687]">
            <img
              src={tab.image.src}
              alt={tab.image.alt}
              width={tab.image.width}
              height={tab.image.height}
              loading="lazy"
              decoding="async"
              className="block w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl">
              {tab.heading}
            </h2>
            <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
              {tab.steps.map((step, i) => (
                <StepItem key={i} number={i + 1} text={step} />
              ))}
            </div>
          </div>
        </div>
      );
    }
    case 'whats-inside': {
      return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div className="mx-auto w-full max-w-[420px] lg:mx-0">
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-text bg-white shadow-soft aspect-[687/1024]">
              <img
                src={tab.image.src}
                alt={tab.image.alt}
                width={tab.image.width}
                height={tab.image.height}
                loading="lazy"
                decoding="async"
                className="block w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {tab.components.map((component, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-text/15 bg-background p-4 shadow-soft"
              >
                <span className="shrink-0 rounded-full border-2 border-text bg-background px-2 text-text font-bold text-sm leading-none">
                  {i + 1}
                </span>
                <span className="text-text">{component}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case 'specs': {
      return (
        <div className="rounded-2xl border border-text/15 bg-background p-5 sm:p-6 lg:p-8">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {tab.cards.map((card, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-text/15 shadow-soft flex flex-col items-center gap-2 sm:gap-3 text-center"
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
    <div id="product-tabs" className="space-y-10 sm:space-y-12">
      {/* Tab navigation */}
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 overflow-x-auto snap-x pb-2 sm:pb-0">
          {tabs.map((t) => {
            const isActive = t.id === activeTabId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTabId(t.id)}
                aria-pressed={isActive}
                className={`relative whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 snap-start ${
                  isActive
                    ? 'border-teal bg-teal text-white shadow-card'
                    : 'border-text/20 bg-background text-text/60 hover:border-text/40'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-8 sm:mt-10">
        {renderTabContent(tab)}
      </div>
    </div>
  );
}

export default ProductTabs;
