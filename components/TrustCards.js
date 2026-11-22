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
    <section className="scroll-mt-24 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {trust.map((item, i) => {
            const Icon = ICON_MAP[item.icon];
            const style =
              i === 0
                ? { background: '#FBE0D4', wave: '#F5BFA6' }
                : i === 1
                ? { background: '#E7DDF7', wave: '#C9B6EC' }
                : { background: '#D9F0E4', wave: '#A9DCC4' };
            return (
              <div
                key={item.title}
                className="relative flex flex-col overflow-hidden rounded-[2rem] border border-text/15 bg-white shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-[36px] w-full">
                  <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                    <path d="M0 12C66 2 133 22 200 12C266 2 333 22 400 12V24H0z" fill={style.background} />
                  </svg>
                </div>
                <div className="relative flex items-center gap-4 p-4 sm:p-6">
                  <div className="rounded-full bg-white/80 border border-text/10 p-2 sm:p-2.5 text-teal flex items-center justify-center">
                    <Icon />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading text-base font-bold leading-snug text-text">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-sm text-text/70">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
