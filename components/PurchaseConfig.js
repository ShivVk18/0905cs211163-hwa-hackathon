'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/Button';

const FORMAT = new Intl.NumberFormat('en-IN');

function formatPrice(price) {
  return FORMAT.format(price);
}

function toggleHandler(setSelectedAddOns, selectedAddOns, id) {
  return () => {
    const next = new Set(selectedAddOns);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedAddOns(next);
  };
}

function quantityHandler(setQuantities, quantities, id, delta) {
  return () => {
    const current = quantities[id] ?? 1;
    const value = Math.max(1, current + delta);
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };
}

export function PurchaseConfig({ packs, addOns }) {
  const [selectedPackId, setSelectedPackId] = useState(packs[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState(new Set());
  const [quantities, setQuantities] = useState({});

  const selectedPack = packs.find((pack) => pack.id === selectedPackId) ?? packs[0];

  const total = useMemo(() => {
    let sum = selectedPack.price;
    selectedAddOns.forEach((id) => {
      const addOn = addOns.find((a) => a.id === id);
      if (addOn) {
        sum += addOn.price * (quantities[id] ?? 1);
      }
    });
    return sum;
  }, [selectedPack, selectedAddOns, quantities, addOns]);

  const cardClasses = (isSelected) =>
    `relative flex items-start gap-4 rounded-2xl border-2 p-5 sm:px-6 sm:py-5 text-left transition-all duration-200 ${
      isSelected ? 'border-teal bg-teal/5 shadow-[0_4px_0_#126D68]' : 'border-text/30 bg-white shadow-soft hover:border-text/50 hover:bg-background/50'
    }`;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Pack selection */}
      <div>
        <h3 className="font-heading text-lg font-bold text-text">Choose your pack</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5">
          {packs.map((pack) => {
            const isSelected = pack.id === selectedPackId;
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => setSelectedPackId(pack.id)}
                aria-pressed={isSelected}
                className={cardClasses(isSelected)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-lg font-bold text-text">{pack.name}</span>
                    <span className="font-heading text-lg font-bold text-teal shrink-0">
                      ₹{formatPrice(pack.price)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-text/70">
                    {pack.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <h3 className="font-heading text-lg font-bold text-text">Add-ons</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5">
          {addOns.map((addOn) => {
            const isSelected = selectedAddOns.has(addOn.id);
            const qty = quantities[addOn.id] ?? 1;
            return (
              <div
                key={addOn.id}
                role="button"
                tabIndex={0}
                onClick={toggleHandler(setSelectedAddOns, selectedAddOns, addOn.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleHandler(setSelectedAddOns, selectedAddOns, addOn.id)();
                  }
                }}
                className={cardClasses(isSelected)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-lg font-bold text-text">{addOn.name}</span>
                    <span className="font-heading text-lg font-bold text-teal shrink-0">
                      ₹{formatPrice(addOn.price)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-text/70">
                    {addOn.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleHandler(setSelectedAddOns, selectedAddOns, addOn.id)();
                    }}
                    aria-pressed={isSelected}
                    className={`inline-flex items-center justify-center rounded-full border-2 w-8 h-8 shrink-0 transition-all duration-200 ${
                      isSelected ? 'border-teal bg-teal' : 'border-text/40 bg-transparent'
                    }`}
                  >
                    {isSelected ? (
                      <span className="text-[10px] font-bold text-white">✓</span>
                    ) : null}
                  </button>
                  {isSelected && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          quantityHandler(setQuantities, quantities, addOn.id, -1)();
                        }}
                        disabled={qty <= 1}
                        className="inline-flex items-center justify-center rounded-md border border-text/30 bg-white w-8 h-8 text-xs font-medium text-text transition-colors hover:bg-peach disabled:opacity-50 disabled:pointer-events-none"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-text">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          quantityHandler(setQuantities, quantities, addOn.id, 1)();
                        }}
                        className="inline-flex items-center justify-center rounded-md border border-text/30 bg-white w-8 h-8 text-xs font-medium text-text transition-colors hover:bg-peach"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {selectedAddOns.size === 0 && (
          <p className="mt-3 text-xs leading-relaxed text-text/50">
            No add-ons selected
          </p>
        )}
      </div>

      {/* Price summary */}
      <div className="relative flex items-baseline justify-between gap-3 rounded-2xl border border-text/15 bg-background p-5 sm:p-6">
        <span className="text-sm font-medium text-text/70 sm:text-base">Total</span>
        <span className="font-heading text-2xl font-bold text-teal sm:text-3xl">
          ₹{formatPrice(total)}
        </span>
      </div>

      {/* Purchase buttons */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        <Button variant="primary" size="lg" shape="pill" onClick={() => {}}>
          Add to cart
        </Button>
        <Button variant="outlineDark" size="lg" shape="pill" onClick={() => {}}>
          Buy now
        </Button>
      </div>
    </div>
  );
}

export default PurchaseConfig;
