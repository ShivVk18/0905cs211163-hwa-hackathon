'use client';

import { Badge } from './Badge';

const CART_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="20" r="1.2" />
    <circle cx="18" cy="20" r="1.2" />
    <path d="M2.5 3h2.2l2.4 12.1a1.8 1.8 0 0 0 1.8 1.4h8.6a1.8 1.8 0 0 0 1.8-1.4L21 7H6" />
  </svg>
);

export function CartButton({ count = 0, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Cart, ${count} items`}
      className={`relative grid h-10 w-10 place-items-center rounded-full border-2 border-text bg-white text-text transition-colors duration-200 hover:bg-peach hover:text-teal ${className}`}
    >
      {CART_ICON}
      <Badge
        variant="coral"
        size="sm"
        className="absolute -right-0.5 -top-0.5 min-w-[20px] justify-center px-1 text-[10px] font-bold leading-4"
      >
        {count}
      </Badge>
    </button>
  );
}

export default CartButton;
