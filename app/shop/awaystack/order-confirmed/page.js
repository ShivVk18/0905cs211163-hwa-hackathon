'use client';

import { useEffect, useState } from 'react';

import { OrderConfirmation } from '@/components/OrderConfirmation';

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem('awaystack_order');
    if (saved) {
      try {
        setOrder(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse order:', e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <div className="flex h-8 w-8 flex-col items-center rounded-full border-4 border-teal/20 border-t-teal animate-spin mb-4" />
          <p className="text-text/60">Placing your order...</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h1 className="font-heading text-2xl font-bold text-text">Order Not Found</h1>
          <p className="mt-4 text-text/60">
            No order found. Please place an order first.
          </p>
        </div>
      </main>
    );
  }

  return <OrderConfirmation order={order} />;
}
