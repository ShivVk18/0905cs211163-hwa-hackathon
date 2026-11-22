'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { product } from '@/data/product';

const { packs, addOns } = product;

function formatPrice(price) {
  return price.toLocaleString('en-IN');
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const saved = sessionStorage.getItem('awaystack_checkout');
    if (saved) {
      const data = JSON.parse(saved);
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      id: 'AW-' + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      customerName: formData.customerName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      items: cartItems,
      subtotal: total - (cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0) - total > 0 ? 0 : total - cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)),
      deliveryCharge: 0,
      discount: 0,
      total: total,
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Paid',
    };

    sessionStorage.setItem('awaystack_order', JSON.stringify(order));
    sessionStorage.removeItem('awaystack_checkout');
    window.location.href = '/shop/awaystack/order-confirmed';
  };

  return (
    <main className="bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Container>
        <section className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-text sm:text-3xl">
              Checkout
            </h1>
            <p className="text-sm text-text/60 mt-1">
              Complete your purchase to receive your AwayStack tower
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Details */}
            <div className="rounded-2xl border border-text/15 bg-white shadow-soft p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold text-text mb-6">
                Your Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="rounded-button border border-text px-3 py-2 text-text focus:outline-2 focus:outline-offset-2 focus:outline-teal disabled:bg-background/50"
                    placeholder="e.g. Aarav Sharma"
                  />
                  {errors.customerName && (
                    <p className="text-xs text-coral mt-1">{errors.customerName}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-button border border-text px-3 py-2 text-text focus:outline-2 focus:outline-offset-2 focus:outline-teal disabled:bg-background/50"
                    placeholder="e.g. aarav@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-coral mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="rounded-button border border-text px-3 py-2 text-text focus:outline-2 focus:outline-offset-2 focus:outline-teal disabled:bg-background/50"
                    placeholder="e.g. +91 98765 43210"
                  />
                  {errors.phone && (
                    <p className="text-xs text-coral mt-1">{errors.phone}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-text">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="rounded-button border border-text px-3 py-2 text-text focus:outline-2 focus:outline-offset-2 focus:outline-teal disabled:bg-background/50"
                    placeholder="e.g. 123, MG Road, Bangalore"
                  />
                  {errors.address && (
                    <p className="text-xs text-coral mt-1">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border border-text/15 bg-background shadow-soft p-6 sm:p-8">
              <h2 className="font-heading text-lg font-bold text-text mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <span className="font-heading text-sm font-bold text-text">
                        {item.name}
                      </span>
                      <span className="text-xs text-text/60 block">
                        {item.description || ''}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-sm font-bold text-text">
                        x{item.quantity}
                      </span>
                      <span className="font-heading text-sm font-bold text-text">
                        ₹{formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between border-t border-text/20 pt-4 mt-4">
                  <span className="font-heading text-lg font-bold text-text">Total</span>
                  <span className="font-heading text-2xl font-bold text-teal">
                    ₹{formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className="w-full raised-btn bg-teal text-white font-bold py-3 sm:py-4 rounded-2xl text-lg hover:bg-dark-teal transition-colors duration-200 disabled:bg-teal/50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order & Get Invoice'}
            </button>
          </form>
        </section>
      </Container>
    </main>
  );
}
