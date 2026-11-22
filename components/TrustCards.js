'use client';

import { product } from '@/data/product';

const { trust } = product;

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3h18v15H3z" />
    <path d="M7 20h6m3-3h-6" />
    <circle cx="5.5" cy="20.5" r="1.5" />
    <circle cx="18.5" cy="20.5" r="1.5" />
  </svg>
);

const ReturnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v12a9 9 0 0 0 9 9m0 0h12a9 9 0 0 0-9-9m0 0l-5-5m0 0l5-5" />
  </svg>
);

const RupeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 3h-5l3 3m0 0l-3 3m3-3V9m3 3h3" />
  </svg>
);

const ICON_MAP = { truck: TruckIcon, undo: ReturnIcon, rupee: RupeeIcon };

export function TrustCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {trust.map((item) => {
        const Icon = ICON_MAP[item.icon];
        return (
          <div className="rounded-2xl border border-text/15 bg-white p-4 sm:p-5 shadow-soft flex flex-col items-center gap-2 sm:gap-3 text-center">
            <div className="rounded-full bg-teal/10 p-2 sm:p-2.5 text-teal flex items-center justify-center">
              <Icon />
            </div>
            <h4 className="font-heading text-base font-bold leading-snug text-text sm:text-lg">{item.title}</h4>
            <p className="text-xs font-medium text-text/60 sm:text-sm">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default TrustCards;
