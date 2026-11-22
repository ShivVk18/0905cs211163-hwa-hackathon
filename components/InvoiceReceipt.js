'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import jsPDF from 'jspdf';

import { Button } from '@/components/Button';
import { PawCertifiedSeal } from '@/components/PawCertifiedSeal';
import { Container } from '@/components/Container';

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

// AwayStack brand colours
const COLOURS = {
  teal: [18, 109, 104],      // #126D68
  darkTeal: [16, 59, 56],    // #103B38
  coral: [241, 120, 91],     // #F1785B
  yellow: [255, 201, 74],    // #FFC94A
  cream: [255, 247, 237],    // #FFF7ED
  textDark: [32, 43, 41],    // #202B29
  textMuted: [100, 100, 100],
};

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

      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const margin = 15;
      const contentWidth = pageWidth - margin * 2; // 180mm
      let y = margin;

      // Helper: add section separator line
      const addSectionLine = () => {
        pdf.setDrawColor(16, 109, 104); // teal
        pdf.setLineWidth(0.5);
        pdf.line(margin, y, margin + contentWidth, y);
        y += 8;
      };

      // ── Brand header ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(...COLOURS.teal);
      pdf.text('AwayStack', margin, y);
      y += 7;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(...COLOURS.textMuted);
      pdf.text('Frozen lick enrichment tower for dogs', margin, y);
      y += 6;

      pdf.setDrawColor(...COLOURS.teal);
      pdf.setLineWidth(0.7);
      pdf.line(margin, y, margin + contentWidth, y);
      y += 10;

      // ── Invoice title block ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(...COLOURS.textDark);
      pdf.text('INVOICE', margin, y);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(...COLOURS.teal);
      pdf.text(`INV-${order.id}`, margin, y + 8);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(...COLOURS.textMuted);
      pdf.text(`Date: ${formatDate(order.date)}`, margin + contentWidth - 50, y);
      y += 8;

      pdf.setTextColor(...COLOURS.textMuted);
      pdf.text(`Time: ${formatTime(order.date)}`, margin + contentWidth - 50, y);
      y += 12;

      // ── Bill To & Order Details (two columns) ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(...COLOURS.teal);
      pdf.text('Bill To', margin, y);
      pdf.text('Order Details', margin + contentWidth / 2, y);
      y += 6;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(...COLOURS.textDark);

      // Left column - Bill To
      pdf.text(order.customerName, margin, y);
      y += 5;
      pdf.text(order.email, margin, y);
      y += 5;
      pdf.text(order.phone, margin, y);
      y += 5;

      // Right column - Order Details
      pdf.text(`Order #${order.id}`, margin + contentWidth / 2, y - 21);
      pdf.text(formatDate(order.date), margin + contentWidth / 2, y - 14);
      pdf.text(formatTime(order.date), margin + contentWidth / 2, y - 7);
      y += 14;

      pdf.text(order.address, margin, y);
      pdf.text(order.paymentMethod, margin + contentWidth / 2, y);
      y += 14;

      addSectionLine();

      // ── Items table ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(...COLOURS.textMuted);
      pdf.text('Item', margin, y);
      pdf.text('Qty', margin + contentWidth - 45, y);
      pdf.text('Unit Price', margin + contentWidth - 25, y);
      pdf.text('Line Total', margin + contentWidth - 12, y);
      y += 6;

      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...COLOURS.textDark);
      order.items.forEach((item) => {
        pdf.text(item.name, margin, y);
        pdf.text(item.quantity.toString(), margin + contentWidth - 45, y);
        pdf.text(`₹${formatPrice(item.price)}`, margin + contentWidth - 25, y);
        pdf.text(`₹${formatPrice(item.price * item.quantity)}`, margin + contentWidth - 12, y);
        y += 6.5;
      });

      y += 6;

      // ── Totals block ──
      const totals = [
        { label: 'Subtotal', value: order.subtotal, color: COLOURS.textMuted },
        { label: 'Delivery', value: order.deliveryCharge, color: COLOURS.textMuted },
      ];

      if (order.discount > 0) {
        totals.push({ label: 'Discount', value: -order.discount, color: COLOURS.teal });
      }

      totals.forEach(({ label, value, color }) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...color);
        pdf.text(label, margin, y);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`₹${formatPrice(Math.abs(value))}`, margin + contentWidth - 12, y);
        y += 6;
      });

      // Final total
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...COLOURS.textDark);
      pdf.text('Total', margin, y);
      pdf.setTextColor(...COLOURS.teal);
      pdf.text(`₹${formatPrice(order.total)}`, margin + contentWidth - 12, y);
      y += 16;

      // ── Payment info ──
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(...COLOURS.textDark);
      pdf.text(`Payment Method: ${order.paymentMethod}`, margin, y);
      y += 7;
      pdf.text(`Payment Status: Paid`, margin, y);
      y += 14;

      // ── Thank you message ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(...COLOURS.textDark);
      pdf.text('Thank you for choosing AwayStack.', margin, y);
      y += 8;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(...COLOURS.textMuted);
      pdf.text('Made with love & care for the voiceless', margin, y);
      y += 18;

      // ── PAW CERTIFIED seal ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(...COLOURS.teal);
      pdf.text('PAW CERTIFIED', margin + contentWidth / 2 - 18, y);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(...COLOURS.textMuted);
      pdf.text('Approved with love for happier paws.', margin + contentWidth / 2 - 24, y + 5);
      y += 18;

      // Draw a subtle separator line above seal
      pdf.setDrawColor(...COLOURS.teal);
      pdf.setLineWidth(0.3);
      pdf.line(margin + contentWidth / 2 - 30, y - 14, margin + contentWidth / 2 + 30, y - 14);

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
          <div className="flex justify-center gap-4 mt-8 sm:mt-10 no-print">
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
