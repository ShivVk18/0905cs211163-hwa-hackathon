'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';

import { product } from '@/data/product';

const { delivery } = product;

const PIN_REGEX = /^\d{6}$/;

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

const ICONS = { truck: TruckIcon, undo: ReturnIcon, rupee: RupeeIcon };

export function DeliveryChecker() {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('idle'); // idle | invalid | available | unavailable

  const handleInput = (event) => {
    setPin(event.target.value);
    setStatus('idle');
  };

  const handleCheck = () => {
    if (!PIN_REGEX.test(pin)) {
      setStatus('invalid');
      return;
    }
    // No real delivery database exists for this concept product, so we do not
    // invent delivery estimates. Treat any valid six-digit PIN as serviceable.
    setStatus('available');
  };

  return (
    <section className="scroll-mt-24 rounded-[2rem] border-2 border-text bg-white shadow-soft p-5 sm:p-6">
      <h3 className="font-heading text-lg font-bold leading-snug text-text sm:text-xl">
        {delivery.heading}
      </h3>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        <input
          type="text"
          maxLength="6"
          value={pin}
          onChange={(event) => {
            setPin(event.target.value);
            setStatus('idle');
          }}
          placeholder={delivery.inputPlaceholder}
          className="flex-1 rounded-button border border-text px-4 py-3 text-text sm:py-2.5 transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-teal"
        />
        <Button variant="primary" size="sm" onClick={handleCheck}>
          {delivery.buttonLabel}
        </Button>
      </div>

      {status === 'invalid' && (
        <p className="mt-3 text-sm text-coral">
          {delivery.invalidMessage}
        </p>
      )}
      {status === 'available' && (
        <p className="mt-3 text-sm text-teal">
          {delivery.availableMessage}
        </p>
      )}
      {status === 'unavailable' && (
        <p className="mt-3 text-sm text-text/60">
          {delivery.unavailableMessage}
        </p>
      )}
    </section>
  );
}

export default DeliveryChecker;
