'use client';

import { product } from '@/data/product';

const { trust } = product;

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M2.5 6.5h10v8h-10z" />
    <path d="M12.5 9h3.6l3.4 3.4v2.1h-7z" />
    <circle cx="6" cy="17" r="1.6" />
    <circle cx="17" cy="17" r="1.6" />
  </svg>
);

const ReturnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M4 12a8 8 0 1 0 2.3-5.7" />
    <path d="M4 4v4h4" />
  </svg>
);

const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M20 8V6.5A2.5 2.5 0 0 0 17.5 4H5.5A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h12a2.5 2.5 0 0 0 2.5-2.5V16" />
    <path d="M21 8h-4.5a2 2 0 0 0 0 4H21z" />
  </svg>
);

const ICON_MAP = { truck: TruckIcon, undo: ReturnIcon, rupee: WalletIcon };

const TONES = ['#D6F1EE', '#ECE8FF', '#FFE1D6'];

export function TrustCards() {
  return (
    <section className="scroll-mt-24">
      <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {trust.map((item, i) => {
          const Icon = ICON_MAP[item.icon] ?? TruckIcon;
          const tone = TONES[i % TONES.length];
          return (
            <div
              key={item.title}
              className="relative flex flex-col overflow-hidden rounded-[20px] border-2 border-line bg-white px-4 pb-4 pt-9 transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_10px_24px_-6px_rgba(43,33,24,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 w-full">
                <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="h-full w-full">
                  <path
                    d="M0 0H400V10C366 10 350 22 300 22C250 22 234 10 200 10C166 10 150 22 100 22C50 22 34 10 0 10Z"
                    fill={tone}
                  />
                </svg>
              </span>

              <div className="relative flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink"
                  style={{ backgroundColor: tone }}
                >
                  <Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-pretty font-fredoka text-[18px] font-semibold leading-tight text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-pretty font-nunito text-[14px] leading-snug text-ink-soft">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TrustCards;
