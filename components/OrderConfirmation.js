'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';

import { InvoiceReceipt } from '@/components/InvoiceReceipt';
import { product } from '@/data/product';

function formatPrice(price) {
  return price.toLocaleString('en-IN');
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function OrderConfirmation({ order }) {
  const [viewInvoice, setViewInvoice] = useState(false);

  return (
    <section className="bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Container>
        {!viewInvoice ? (
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center gap-2 w-full">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M22 11c0 4.13-4.89 7.5-11 7.5S0 15.13 0 11c0-4.13 4.89-7.5 11-7.5s11 3.37 11 7.5Z" />
                    <polyline points="22 7 13.5 15.5 8.5 10.5" />
                    <polyline points="16 14 20 14 22 12" />
                  </svg>
                </div>
              </div>
              <h1 className="font-heading text-3xl font-bold text-text mt-4 sm:text-4xl">
                Your order is confirmed!
              </h1>
              <p className="text-lg text-text/60 mt-2 sm:text-xl">
                Thank you for your order. Your AwayStack will be on its way soon.
              </p>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border border-text/15 bg-white shadow-soft p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold text-text mb-6">
                Order Summary
              </h2>
              <div className="space-y-5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-text/60 block">Order ID</span>
                    <span className="font-heading text-base font-bold text-text">#{order.id}</span>
                  </div>
                  <span className="font-heading text-base font-bold text-teal">
                    {formatDate(order.date)}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-text/60 block">Pack</span>
                  <span className="font-heading text-base font-bold text-text">
                    {order.items.find((i) => i.id === 'awaystack')?.name || order.items[0]?.name}
                  </span>
                </div>
                {order.items
                  .filter((i) => i.id !== 'awaystack')
                  .map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <span className="text-sm text-text/60 block">{item.name}</span>
                      <span className="font-heading text-base font-bold text-text">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                <div className="flex justify-between border-t border-text/20 pt-4">
                  <span className="font-heading text-lg font-bold text-text">Total</span>
                  <span className="font-heading text-2xl font-bold text-teal">
                    ₹{formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="raised"
                size="lg"
                shape="pill"
                onClick={() => setViewInvoice(true)}
                className="w-full sm:w-auto"
              >
                View Invoice
              </Button>
              <Button
                variant="outlineDark"
                size="lg"
                shape="pill"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="/shop/awaystack">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button
              type="button"
              onClick={() => setViewInvoice(false)}
              className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-teal hover:text-dark-teal transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Order Summary
            </button>
            <InvoiceReceipt order={order} />
          </div>
        )}
      </Container>
    </section>
  );
}

export default OrderConfirmation;
