'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/Button';
import { useCart } from '@/components/CartProvider';

import { product } from '@/data/product';

const { packs, addOns } = product;

function formatPrice(price) {
  return price.toLocaleString('en-IN');
}

function PackCard({ pack, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(pack.id)}
      aria-pressed={isSelected}
      className={`relative flex items-start justify-between gap-3 rounded-2xl border p-5 text-left transition-all duration-200 ${
        isSelected
          ? 'border-teal bg-teal/5 shadow-card'
          : 'border-text/15 bg-background/40 hover:border-text/40 hover:bg-background/70'
      }`}
    >
      <div>
        <span className="block font-heading text-lg font-bold leading-snug text-text">
          {pack.name}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-text/70">
          {pack.description}
        </span>
      </div>
      <span className="shrink-0 font-heading text-xl font-bold text-teal">
        ₹{formatPrice(pack.price)}
      </span>
    </button>
  );
}

function QtyControl({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (value > 1) onChange(-1);
        }}
        disabled={value <= 1}
        aria-label="Decrease quantity"
        className="relative flex h-7 w-7 items-center justify-center rounded-button border border-text text-text disabled:text-text/30 disabled:cursor-not-allowed transition-colors duration-200"
      >
        −
      </button>
      <span className="shrink-0 w-5 text-center text-sm font-bold text-text tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onChange(1);
        }}
        aria-label="Increase quantity"
        className="relative flex h-7 w-7 items-center justify-center rounded-button border border-text text-text transition-colors duration-200"
      >
        +
      </button>
    </div>
  );
}

function AddOnCard({ addOn, isSelected, qty, onToggle, onChangeQty }) {
  return (
    <div
      className={`relative flex w-full flex-col gap-3 rounded-2xl border p-5 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
        isSelected
          ? 'border-teal bg-teal/5 shadow-card'
          : 'border-text/15 bg-background/40 hover:border-text/40 hover:bg-background/70'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isSelected}
        className="flex min-w-0 flex-1 items-start gap-3 text-left"
      >
        <span
          aria-hidden="true"
          className={`relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${
            isSelected
              ? 'border-teal bg-teal text-white'
              : 'border-text/30 bg-background text-text/40'
          }`}
        >
          {isSelected ? '✓' : ''}
        </span>
        <span className="block min-w-0 flex-1">
          <span className="block font-heading text-base font-bold leading-snug text-text">
            {addOn.name}
          </span>
          <span className="mt-0.5 block text-sm leading-relaxed text-text/70">
            {addOn.description}
          </span>
        </span>
        <span className="shrink-0 font-heading text-base font-bold text-teal">
          ₹{formatPrice(addOn.price)}
        </span>
      </button>
      <div className="flex justify-end sm:justify-start">
        <QtyControl value={qty} onChange={(next) => onChangeQty(addOn.id, next)} />
      </div>
    </div>
  );
}

export function ProductPurchase({ onAddToCart, onBuyNow }) {
  const [selectedPackId, setSelectedPackId] = useState(packs[0].id);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState(new Set());
  const [quantities, setQuantities] = useState({});

  const pack = packs.find((p) => p.id === selectedPackId) ?? packs[0];

  const togglePack = (id) => setSelectedPackId(id);

  const toggleAddOn = (id) => {
    setSelectedAddOnIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setQuantities({ ...quantities, [id]: quantities[id] ?? 1 });
  };

  const changeQty = (id, delta) => {
    const isSelected = selectedAddOnIds.has(id);
    if (!isSelected && delta > 0) {
      setSelectedAddOnIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setQuantities({ ...quantities, [id]: 1 });
      return;
    }
    const next = Math.max(1, (quantities[id] ?? 1) + delta);
    setQuantities({ ...quantities, [id]: next });
    setSelectedAddOnIds((prev) => {
      const nextSet = new Set(prev);
      nextSet.add(id);
      return nextSet;
    });
  };

  const addOnsTotal = useMemo(
    () =>
      [...selectedAddOnIds].reduce(
        (sum, id) => {
          const a = addOns.find((x) => x.id === id);
          return sum + a.price * (quantities[id] ?? 1);
        },
        0
      ),
    [selectedAddOnIds, quantities]
  );

  const total = pack.price + addOnsTotal;

  const { cartCount, addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id: pack.id, name: pack.name, price: pack.price, quantity: 1 });
    [...selectedAddOnIds].forEach((id) => {
      const a = addOns.find((x) => x.id === id);
      addToCart({ id: a.id, name: a.name, price: a.price, quantity: quantities[id] ?? 1 });
    });
  };

  const handleBuyNow = () => {
    const lineItems = [
      { id: pack.id, name: pack.name, price: pack.price, quantity: 1 },
      ...[...selectedAddOnIds].map((id) => {
        const a = addOns.find((x) => x.id === id);
        return { id: a.id, name: a.name, price: a.price, quantity: quantities[id] ?? 1 };
      }),
    ];
    if (onBuyNow) onBuyNow(lineItems, total);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Pack selection */}
      <div>
        <h3 className="font-heading text-lg font-bold leading-snug text-text sm:text-xl">
          Choose your pack
        </h3>
        <div className="mt-3 sm:mt-4 grid grid-cols-1 gap-3 sm:gap-4">
          {packs.map((p) => (
            <PackCard
              key={p.id}
              pack={p}
              isSelected={p.id === selectedPackId}
              onSelect={togglePack}
            />
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="font-heading text-lg font-bold leading-snug text-text sm:text-xl">
            Add-ons
          </h3>
          <span className="text-sm font-medium text-text/70">
            Optional extras
          </span>
        </div>
        <div className="mt-3 sm:mt-4 grid grid-cols-1 gap-3 sm:gap-4">
          {addOns.map((a) => {
            const isSelected = selectedAddOnIds.has(a.id);
            return (
              <AddOnCard
                key={a.id}
                addOn={a}
                isSelected={isSelected}
                qty={quantities[a.id] ?? 1}
                onToggle={() => toggleAddOn(a.id)}
                onChangeQty={changeQty}
              />
            );
          })}
        </div>
      </div>

      {/* Price summary */}
      <div className="rounded-2xl border border-text/15 bg-background p-5 sm:p-6 shadow-soft">
        <div className="flex items-baseline justify-between text-sm sm:text-base">
          <span className="text-text/70">Pack</span>
          <span className="font-heading text-teal font-bold">₹{formatPrice(pack.price)}</span>
        </div>
        {addOnsTotal > 0 && (
          <div className="mt-2 sm:mt-3 flex items-baseline justify-between text-sm sm:text-base">
            <span className="text-text/70">Add-ons</span>
            <span className="font-heading text-teal font-bold">₹{formatPrice(addOnsTotal)}</span>
          </div>
        )}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-text/15 flex items-baseline justify-between">
          <span className="font-heading text-lg font-bold text-text">
            Total
          </span>
          <span className="font-heading text-xl font-bold text-teal sm:text-2xl">
            ₹{formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Purchase buttons */}
      <div className="mt-1 sm:mt-2 grid grid-cols-2 gap-3 sm:gap-4">
        <Button
          variant="raised"
          size="lg"
          shape="pill"
          onClick={handleAddToCart}
          className="w-full"
        >
          Add to cart
        </Button>
        <Button
          variant="outlineDark"
          size="lg"
          shape="pill"
          onClick={handleBuyNow}
          className="w-full"
        >
          Buy now
        </Button>
      </div>
    </div>
  );
}

export default ProductPurchase;
