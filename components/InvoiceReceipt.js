'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import jsPDF from 'jspdf';

import { Button } from '@/components/Button';
import { PawCertifiedSeal } from '@/components/PawCertifiedSeal';
import { Container } from '@/components/Container';
import { product } from '@/data/product';

const { packs, addOns } = product;

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

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function InvoiceReceipt({ order }) {
  const receiptRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setIsPrinting(false);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // Header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(16, 109, 104); // teal
      pdf.text('AwayStack', margin, y);
      y += 10;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Frozen lick enrichment tower for dogs', margin, y);
      y += 15;

      // Invoice title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(32, 43, 41); // text-text
      pdf.text('INVOICE', margin, y);
      y += 10;

      // Invoice number badge
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(16, 109, 104);
      pdf.text(`Invoice #${order.id}`, margin, y);
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Date: ${formatDate(order.date)}`, margin + 50, y);
      pdf.text(`Time: ${formatTime(order.date)}`, margin + 100, y);
      y += 15;

      // Customer info and order details side by side
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(16, 109, 104);
      pdf.text('Bill To', margin, y);
      pdf.text('Order Details', margin + contentWidth / 2, y);
      y += 7;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(32, 43, 41);
      pdf.text(order.customerName, margin, y);
      pdf.text(`#${order.id}`, margin + contentWidth / 2, y);
      y += 6;

      pdf.text(order.email, margin, y);
      pdf.text(formatDate(order.date), margin + contentWidth / 2, y);
      y += 6;

      pdf.text(order.phone, margin, y);
      pdf.text(formatTime(order.date), margin + contentWidth / 2, y);
      y += 6;

      pdf.text(order.address, margin, y);
      pdf.text(order.paymentMethod, margin + contentWidth / 2, y);
      y += 15;

      // Items table header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Item', margin, y);
      pdf.text('Qty', margin + contentWidth - 40, y);
      pdf.text('Price', margin + contentWidth - 25, y);
      pdf.text('Total', margin + contentWidth - 10, y);
      y += 7;

      // Items
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(32, 43, 41);
      order.items.forEach((item) => {
        pdf.text(item.name, margin, y);
        pdf.text(item.quantity.toString(), margin + contentWidth - 40, y);
        pdf.text(`₹${formatPrice(item.price)}`, margin + contentWidth - 25, y);
        pdf.text(`₹${formatPrice(item.price * item.quantity)}`, margin + contentWidth - 10, y);
        y += 7;
      });

      y += 5;

      // Totals
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Subtotal', margin, y);
      pdf.text(`₹${formatPrice(order.subtotal)}`, margin + contentWidth - 10, y);
      y += 6;

      pdf.text('Delivery', margin, y);
      pdf.text(`₹${formatPrice(order.deliveryCharge)}`, margin + contentWidth - 10, y);
      y += 6;

      if (order.discount > 0) {
        pdf.setTextColor(16, 109, 104);
        pdf.text('Discount', margin, y);
        pdf.text(`-₹${formatPrice(order.discount)}`, margin + contentWidth - 10, y);
        y += 6;
      }

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(32, 43, 41);
      pdf.text('Total', margin, y);
      pdf.text(`₹${formatPrice(order.total)}`, margin + contentWidth - 10, y);
      y += 15;

      // Payment info
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(32, 43, 41);
      pdf.text('Payment Status: Paid via ' + order.paymentMethod, margin, y);
      y += 15;

      // Thank you
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(32, 43, 41);
      pdf.text('Thank you for choosing AwayStack.', margin, y);
      y += 8;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Made with love & care for the voiceless', margin, y);
      y += 20;

      // PAW CERTIFIED seal
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(16, 109, 104);
      pdf.text('PAW CERTIFIED', margin + contentWidth / 2 - 15, y);
      pdf.setFontSize(8);
      pdf.setTextColor(16, 109, 104);
      pdf.text('Approved with love for happier paws.', margin + contentWidth / 2 - 20, y + 5);

      pdf.save(`invoice-${order.id}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Container>
        <section className="max-w-2xl mx-auto">
          {/* Invoice Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-teal text-white shadow-soft">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M12 3.5c2.8 0 4.8 2.8 4.8 5.6s-1.9 5.4-4.8 5.4-4.8-2.6-4.8-5.4S9.2 3.5 12 3.5Z" />
                  <circle cx="7.6" cy="6.6" r="1.35" fill="currentColor" />
                  <circle cx="11.6" cy="4.4" r="1.35" fill="currentColor" />
                  <circle cx="15.6" cy="5.6" r="1.35" fill="currentColor" />
                  <circle cx="17.4" cy="9.4" r="1.25" fill="currentColor" />
                  <circle cx="6.2" cy="10.4" r="1.25" fill="currentColor" />
                </svg>
              </span>
              <span className="font-heading text-2xl font-bold text-text tracking-tight">AwayStack</span>
            </div>
            <p className="text-sm text-text/60 mt-1">Frozen lick enrichment tower for dogs</p>
          </div>

          {/* Invoice Title */}
          <div className="text-center mb-6">
            <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight text-text">INVOICE</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal/10 text-teal text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-teal"></span>
              Invoice #{order.id}
            </span>
          </div>

          {/* Animated Receipt */}
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                ease: 'easeOut',
              }}
              className="relative overflow-hidden rounded-[2rem] border-2 border-text bg-white shadow-[0_20px_50px_-10px_rgba(16,59,56,0.15)]"
              ref={receiptRef}
            >
              <div className="p-6 sm:p-8">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h2 className="font-heading text-sm font-bold text-text/60 uppercase tracking-wider">
                      Bill To
                    </h2>
                    <p className="mt-1 text-sm text-text">{order.customerName}</p>
                    <p className="text-sm text-text/60">{order.email}</p>
                    <p className="text-sm text-text/60">{order.phone}</p>
                    <p className="text-sm text-text/60">{order.address}</p>
                  </div>
                  <div className="text-right">
                    <h2 className="font-heading text-sm font-bold text-text/60 uppercase tracking-wider">
                      Order Details
                    </h2>
                    <p className="mt-1 text-sm text-text">Order ID: #{order.id}</p>
                    <p className="text-sm text-text/60">{formatDate(order.date)}</p>
                    <p className="text-sm text-text/60">{formatTime(order.date)}</p>
                    <p className="text-sm text-text/60">{order.paymentMethod}</p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-6">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-text/20 pb-2">
                        <th className="text-xs font-bold text-text/60 uppercase">
                          Item
                        </th>
                        <th className="text-xs font-bold text-text/60 uppercase text-right">
                          Qty
                        </th>
                        <th className="text-xs font-bold text-text/60 uppercase text-right">
                          Price
                        </th>
                        <th className="text-xs font-bold text-text/60 uppercase text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-text/10">
                      {order.items.map((item) => (
                        <tr key={item.id} className="text-sm">
                          <td className="py-3 text-text">{item.name}</td>
                          <td className="py-3 text-text font-medium text-right">
                            {item.quantity}
                          </td>
                          <td className="py-3 text-text font-medium text-right">
                            ₹{formatPrice(item.price)}
                          </td>
                          <td className="py-3 text-text font-bold text-right">
                            ₹{formatPrice(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-text/70">Subtotal</span>
                    <span className="text-text font-medium">
                      ₹{formatPrice(order.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text/70">Delivery</span>
                    <span className="text-text font-medium">
                      ₹{formatPrice(order.deliveryCharge)}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text/70">Discount</span>
                      <span className="text-text font-bold text-teal">
                        -₹{formatPrice(order.discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-text/20 pt-3">
                    <span className="font-heading text-lg font-bold text-text">
                      Total
                    </span>
                    <span className="font-heading text-2xl font-bold text-teal">
                      ₹{formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Payment */}
                <div className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-teal/5 border border-teal/10">
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal text-xs font-bold">
                    ✓
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-text">Payment Status</span>
                    <span className="block text-sm text-text/60 mt-0.5">
                      Paid via {order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Thank You */}
                <div className="text-center mt-8">
                  <p className="font-heading text-lg font-bold text-text">
                    Thank you for choosing AwayStack.
                  </p>
                  <p className="text-sm text-text/60 mt-1">
                    Made with love &amp; care for the voiceless
                  </p>
                </div>

                {/* PAW CERTIFIED Seal */}
                <div className="mt-8 flex justify-center">
                  <PawCertifiedSeal />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8 sm:mt-10">
            <Button
              variant="outlineDark"
              size="lg"
              shape="pill"
              onClick={handlePrint}
              disabled={isPrinting}
              className="w-full sm:w-auto"
            >
              {isPrinting ? 'Printing...' : 'Print Invoice'}
            </Button>
            <Button
              variant="raised"
              size="lg"
              shape="pill"
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full sm:w-auto"
            >
              {isDownloading ? 'Downloading...' : 'Download Invoice'}
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default InvoiceReceipt;
